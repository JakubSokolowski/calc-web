import { BaseDigits } from './base-digits';
import { PositionalNumber } from './representations';
import { fromNumber, fromStringDirect } from './base-converter';
import { AdditionOperand, AdditionPositionResult, AdditionResult } from '../models';
import { hasInfiniteExtension } from './complement-extension';
import { ComplementConverter } from './complement-converter';
import {
    buildLookup,
    extractResultDigitsFromAddition,
    findPositionRange,
    NUM_ADDITIONAL_EXTENSIONS
} from './operation-utils';
import { OperationType } from '../models/operation';
import { AdditionType } from '../models/operation-algorithm';

export function addPositionalNumbers(numbers: PositionalNumber[]): AdditionResult {
    if (!areSameBaseNumbers(numbers)) {
        throw Error('Numbers to add must have same base');
    }
    const numbersAsDigits = numbers.map((number) => number.complement.toDigitsList());
    const result = addDigitsArrays(numbersAsDigits);
    return {...result, numberOperands: numbers};
}

export function areSameBaseNumbers(numbers: PositionalNumber[]): boolean {
    const base = numbers[0].base;
    return numbers.map((num) => num.base).every((numBase) => numBase === base);
}

export function addDigitsArrays(digits: AdditionOperand[][]): AdditionResult {
    const carryLookup: Record<number, AdditionOperand[]> = {};
    const { mostSignificantPosition, leastSignificantPosition } = findPositionRange(digits);
    const digitsPositionLookup: Record<number, AdditionOperand>[] = buildLookup(digits, mostSignificantPosition);
    const result: AdditionPositionResult[] = [];
    const base = digits[0][0].base;

    let currentPosition = leastSignificantPosition;
    let mostSignificant = mostSignificantPosition;

    let prev: AdditionPositionResult;

    while (currentPosition <= mostSignificant + NUM_ADDITIONAL_EXTENSIONS - 1) {
        const allDigitsAtCurrentPosition: AdditionOperand[] = digitsPositionLookup
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

    const resultDigits = extractResultDigitsFromAddition(result);
    const numberResult = buildPositionalNumberFromDigits(resultDigits);

    return {
        positionResults: result,
        resultDigits,
        numberResult,
        operands: digits,
        operation: OperationType.Addition,
        algorithmType: AdditionType.Default,
        numberOperands: []
    };
}

export function buildPositionalNumberFromDigits(resultDigits: AdditionOperand[]): PositionalNumber {
    let complementStr = '';
    const base = resultDigits[0].base;

    resultDigits.forEach((digit) => {
        const firstFractionalPartDigitIndex = -1;
        if (digit.position === firstFractionalPartDigitIndex) complementStr += '.';
        complementStr += base > 36 ? digit.representationInBase + ' ' : digit.representationInBase;
    });

    const representationStr = ComplementConverter.complementStrToBaseStr(complementStr.trimRight(), base);
    return fromStringDirect(representationStr, base).result;
}


export function addDigitsAtPosition(digits: AdditionOperand[], position: number, globalBase: number): AdditionPositionResult {
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

    const valueAtPosition: AdditionOperand = {
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

function carryToDigits(decimalValue: number, base: number, startingPosition: number): AdditionOperand[] {
    const { result } = fromNumber(decimalValue, base);

    return result.toDigitsList()
        .filter(isNonZeroDigit)
        .map((digit) => ({
            ...digit,
            position: digit.position + startingPosition + 1,
            carrySourcePosition: startingPosition
        }));
}

function isNonZeroDigit(digit: AdditionOperand): boolean {
    return digit.valueInDecimal != 0;
}
