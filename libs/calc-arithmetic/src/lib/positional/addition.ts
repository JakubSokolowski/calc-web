
import { BaseDigits } from './base-digits';
import { PositionalNumber } from './representations';
import { fromNumber, fromString } from './base-converter';
import { AdditionResult, Digit, Operand, PositionResult } from '../models';

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

export function addDigitsArrays(digits: Operand[][]): AdditionResult {
    const carryLookup: Record<number, Operand[]> = {};
    const digitsPositionLookup: Record<number, Operand>[] = digits.map(toDigitMap);
    const { mostSignificantPosition, leastSignificantPosition } = findPositionRange(digits);
    const result: PositionResult[] = [];

    let currentPosition = leastSignificantPosition;
    let mostSignificant = mostSignificantPosition;

    while(currentPosition <= mostSignificant) {
        const allDigitsAtCurrentPosition: Operand[] = digitsPositionLookup
            .map((digits) => digits[currentPosition])
            .filter((digit) => !!digit);

        const allCarriesAtCurrentPosition = carryLookup[currentPosition] || [];
        const digitsToAdd = [
            ...allDigitsAtCurrentPosition,
            ...allCarriesAtCurrentPosition.map((carry) => ({...carry, isCarry: true }))
        ];

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
        numberResult,
        operands: digits
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
            },
            operands: []
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

    if (!decimalCarry) return { valueAtPosition, carry: [], operands: digits };

    return {
        valueAtPosition,
        carry: carryToDigits(decimalCarry, base, position + 1),
        operands: digits
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
