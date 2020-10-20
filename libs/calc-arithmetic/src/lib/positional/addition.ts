import { BaseDigits } from './base-digits';
import { PositionalNumber } from './representations';
import { fromNumber, fromStringDirect } from './base-converter';
import { AdditionResult, Operand, PositionResult } from '../models';
import { hasInfiniteExtension, mergeExtensionDigits } from './complement-extension';
import { ComplementConverter } from './complement-converter';

export const numAdditionalComplementExtensions = 3;

export function addPositionalNumbers(numbers: PositionalNumber[]): AdditionResult {
    if (!areSameBaseNumbers(numbers)) {
        throw Error('Numbers to add must have same base');
    }
    const numbersAsDigits = numbers.map((number) => number.complement.toDigitsList());
    return addDigitsArrays(numbersAsDigits);
}

export function areSameBaseNumbers(numbers: PositionalNumber[]): boolean {
    const base = numbers[0].base;
    return numbers.map((num) => num.base).every((numBase) => numBase === base);
}

export function addDigitsArrays(digits: Operand[][]): AdditionResult {
    const carryLookup: Record<number, Operand[]> = {};
    const { mostSignificantPosition, leastSignificantPosition } = findPositionRange(digits);
    const digitsPositionLookup: Record<number, Operand>[] = buildLookup(digits, mostSignificantPosition);
    const result: PositionResult[] = [];
    const base = digits[0][0].base;

    let currentPosition = leastSignificantPosition;
    let mostSignificant = mostSignificantPosition;

    let prev: PositionResult;

    while (currentPosition <= mostSignificant + numAdditionalComplementExtensions - 1) {
        const allDigitsAtCurrentPosition: Operand[] = digitsPositionLookup
            .map((digits) => digits[currentPosition])
            .filter((digit) => !!digit);

        const allCarriesAtCurrentPosition = carryLookup[currentPosition] || [];
        const digitsToAdd = [
            ...allCarriesAtCurrentPosition.map((carry) => ({ ...carry, isCarry: true })),
            ...allDigitsAtCurrentPosition
        ];

        const positionResult = addDigitsAtPosition(digitsToAdd, currentPosition, base);

        positionResult.carry.forEach((carry) => {
            if (carryLookup[carry.position]) {
                carryLookup[carry.position].push(carry);
            } else {
                carryLookup[carry.position] = [carry];
            }
        });

        const mostSignificantCarryPosition = positionResult.carry[0]
            ? positionResult.carry[0].position
            : undefined;

        if (mostSignificantCarryPosition && mostSignificantCarryPosition > mostSignificantPosition) {
            mostSignificant = mostSignificantCarryPosition;
        }
        result.push(positionResult);
        currentPosition += 1;

        if (prev) {
            const infiniteExtensionBegun = hasInfiniteExtension(prev, positionResult, mostSignificantPosition);
            if (infiniteExtensionBegun) {
                break;
            }
        }
        prev = positionResult;
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

export function findPositionRange(allDigits: Operand[][]): { mostSignificantPosition: number; leastSignificantPosition: number } {
    const allMostSignificant = allDigits.map((digits) => digits[0].position);
    const allLeastSignificant = allDigits.map((digits) => digits[digits.length - 1].position);

    return {
        mostSignificantPosition: Math.max(...allMostSignificant),
        leastSignificantPosition: Math.min(...allLeastSignificant)
    };
}

export function buildPositionalNumberFromDigits(resultDigits: Operand[]): PositionalNumber {
    let complementStr = '';
    const base = resultDigits[0].base;

    resultDigits.forEach((digit) => {
        const firstFractionalPartDigitIndex = -1;
        if (digit.position === firstFractionalPartDigitIndex) complementStr += '.';
        complementStr += digit.representationInBase;
    });

    const representationStr = ComplementConverter.complementStrToBaseStr(complementStr, base);
    return fromStringDirect(representationStr, base).result;
}

export function extractResultDigitsFromPositionResults(positionResults: PositionResult[]): Operand[] {
    const digitsFromPositions = positionResults.map((res) => res.valueAtPosition);
    const carryDigitsNotConsideredInResult: Operand[] = [];

    positionResults.forEach((result) => {
        const missingCarryDigits = result.carry.filter((dgt) => {
            return !digitsFromPositions.find((posDgt) => dgt.position === posDgt.position);
        });

        carryDigitsNotConsideredInResult.push(...missingCarryDigits);
    });

    const withExtension = [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()];

    return mergeExtensionDigits(withExtension);
}


function buildLookup(digits: Operand[][], globalMostSignificantPosition: number): Record<number, Operand>[] {
    return digits.map((numberDigits) => toPositionDigitMap(numberDigits, globalMostSignificantPosition));
}

function toPositionDigitMap(digits: Operand[], globalMostSignificantPosition: number): Record<number, Operand> {
    const mostSignificantDigit = digits[0];
    const numExtensions = getNumOfComplementExtensions(mostSignificantDigit, globalMostSignificantPosition);
    const extensions = generateComplementExtension(mostSignificantDigit, numExtensions);
    const digitsToMap = [...extensions, ...digits];

    return digitsToMap.reduce((digitMap, digit) => {
        digitMap[digit.position] = digit;
        return digitMap;
    }, {});
}


function getNumOfComplementExtensions(digit: Operand, mostSignificantPosition: number): number {
    const numMandatoryComplementExtensions = mostSignificantPosition - digit.position;

    return numAdditionalComplementExtensions + numMandatoryComplementExtensions;
}

function generateComplementExtension(digit: Operand, numExtensions: number): Operand[] {
    return new Array<Operand>(numExtensions)
        .fill({ ...digit })
        .map((digit, index) => ({ ...digit, position: digit.position + index + 1 }))
        .reverse();
}


export function addDigitsAtPosition(digits: Operand[], position: number, globalBase: number): PositionResult {
    const base = digits[0] ? digits[0].base : globalBase;

    if (!digits.length) {
        return {
            carry: [],
            valueAtPosition: {
                representationInBase: BaseDigits.getDigit(0, base),
                valueInDecimal: 0,
                position: position,
                base: globalBase
            },
            operands: []
        };
    }

    const decimalSum = digits.reduce((sum, digit) => {
        return sum + digit.valueInDecimal;
    }, 0);

    const decimalPositionValue = decimalSum % base;
    const valueInBase = BaseDigits.getDigit(decimalPositionValue, base);
    const decimalCarry = (decimalSum - decimalPositionValue) / base;

    const valueAtPosition: Operand = {
        base,
        representationInBase: valueInBase,
        valueInDecimal: decimalPositionValue,
        position: position
    };

    if (!decimalCarry) return { valueAtPosition, carry: [], operands: digits };

    return {
        valueAtPosition,
        carry: carryToDigits(decimalCarry, base, position),
        operands: digits
    };
}

function carryToDigits(decimalValue: number, base: number, startingPosition: number): Operand[] {
    const { result } = fromNumber(decimalValue, base);

    return result.toDigitsList()
        .filter(isNonZeroDigit)
        .map((digit) => ({
            ...digit,
            position: digit.position + startingPosition + 1,
            carrySourcePosition: startingPosition
        }));
}

function isNonZeroDigit(digit: Operand): boolean {
    return digit.valueInDecimal != 0;
}
