import { fromNumber, fromString, PositionalNumber } from '@calc/calc-arithmetic';
import { BaseDigits } from './base-digits';

export interface Digit {
    valueInDecimal: number;
    valueInBase: string;
    base: number;
    position: number;
}

export interface PositionResult {
    valueAtPosition: Digit;
    carry: Digit[];
}

export interface AdditionResult {
    positionResults: PositionResult[];
    resultDigits: Digit[];
    numberResult?: PositionalNumber;
}

export function addPositionalNumbers(numbers: PositionalNumber[]): AdditionResult {
    if(!areSameBaseNumbers(numbers)) {
        throw Error('Numbers to add must have same base');
    }
    const numbersAsDigits = numbers.map((number) => number.toDigitsList());
    return addDigitsArrays(numbersAsDigits);
}

export function areSameBaseNumbers(numbers: PositionalNumber[]): boolean {
    const base = numbers[0].base;
    return numbers.map((num) => num.base).every((numBase) => numBase === base);
}

export function addDigitsArrays(digits: Digit[][]): AdditionResult {
    const carryLookup: Record<number, Digit[]> = {};
    const digitsPositionLookup: Record<number, Digit>[] = digits.map(toDigitMap);
    const { mostSignificantPosition, leastSignificantPosition } = findPositionRange(digits);
    const result: PositionResult[] = [];

    let currentPosition = leastSignificantPosition;
    let mostSignificant = mostSignificantPosition;

    while(currentPosition <= mostSignificant) {
        const allDigitsAtCurrentPosition = digitsPositionLookup
            .map((digits) => digits[currentPosition])
            .filter((digit) => !!digit);

        const allCarriesAtCurrentPosition = carryLookup[currentPosition] || [];
        const digitsToAdd = [...allDigitsAtCurrentPosition, ...allCarriesAtCurrentPosition];

        const positionResult = addDigitsAtPosition(digitsToAdd, currentPosition);

        positionResult.carry.forEach((carry) => {
            if(carryLookup[carry.position]) {
                carryLookup[carry.position].push(carry);
            } else {
                carryLookup[carry.position] = [carry]
            }
        });

        const mostSignificantCarryPosition = positionResult.carry[0]
            ? positionResult.carry[0].position
            : undefined;

        if(mostSignificantCarryPosition && mostSignificantCarryPosition > mostSignificantPosition) {
            mostSignificant = mostSignificantCarryPosition;
        }
        result.push(positionResult);
        currentPosition += 1;
    }

    const resultDigits = extractResultDigitsFromPositionResults(result);
    const numberResult = buildPositionalNumberFromDigits(resultDigits);

    return {
        positionResults: result,
        resultDigits,
        numberResult
    };
}

export function findPositionRange(allDigits: Digit[][]): { mostSignificantPosition: number; leastSignificantPosition: number } {
    const allMostSignificant = allDigits.map((digits) => digits[0].position);
    const allLeastSignificant = allDigits.map((digits) => digits[digits.length - 1].position);

    return {
        mostSignificantPosition: Math.max(...allMostSignificant),
        leastSignificantPosition: Math.min(...allLeastSignificant)
    };
}

export function buildPositionalNumberFromDigits(resultDigits: Digit[]): PositionalNumber {
    let representationStr = '';
    const base = resultDigits[0].base;

    resultDigits.forEach((digit) => {
        const firstFractionalPartDigitIndex = -1;
        if(digit.position === firstFractionalPartDigitIndex) representationStr += '.';
        representationStr += digit.valueInBase;
    });

    return fromString(representationStr, base, base).result;
}

export function extractResultDigitsFromPositionResults(positionResults: PositionResult[]): Digit[] {
    const digitsFromPositions = positionResults.map((res) => res.valueAtPosition);
    const carryDigitsNotConsideredInResult: Digit[] = [];

    positionResults.forEach((result) => {
        const missingCarryDigits = result.carry.filter((dgt) => {
            return !digitsFromPositions.find((posDgt) => dgt.position === posDgt.position);
        });

        carryDigitsNotConsideredInResult.push(...missingCarryDigits)
    });

    return [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()]
}

function toDigitMap(digits: Digit[]): Record<number, Digit> {
    return digits.reduce((digitMap, digit) => {
        digitMap[digit.position] = digit;
        return digitMap;
    }, {});
}

export function addDigitsAtPosition(digits: Digit[], position: number): PositionResult {
    const base = digits[0].base;

    if(!digits.length) {
        return {
            carry: [],
            valueAtPosition: {
                valueInBase: BaseDigits.getDigit(0, base),
                valueInDecimal: 0,
                position: position,
                base
            }
        }
    }

    const decimalSum = digits.reduce((sum, digit) => {
        return sum + digit.valueInDecimal;
    }, 0);

    const decimalPositionValue = decimalSum % base;
    const valueInBase = BaseDigits.getDigit(decimalPositionValue, base);
    const decimalCarry = (decimalSum - decimalPositionValue) / base;

    const valueAtPosition: Digit = {
        base,
        valueInBase: valueInBase,
        valueInDecimal: decimalPositionValue,
        position: position
    };

    if (!decimalCarry) return { valueAtPosition, carry: [] };

    return {
        valueAtPosition,
        carry: carryToDigits(decimalCarry, base, position + 1)
    };
}

function carryToDigits(decimalValue: number, base: number, startingPosition: number): Digit[] {
    const { result } = fromNumber(decimalValue, base);

    return result.toDigitsList()
        .filter(isNonZeroDigit)
        .map((digit) => ({ ...digit, position: digit.position + startingPosition }));
}

function isNonZeroDigit(digit: Digit): boolean {
    return digit.valueInDecimal != 0;
}
