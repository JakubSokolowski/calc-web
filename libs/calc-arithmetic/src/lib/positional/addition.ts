import { BaseDigits } from './base-digits';
import { PositionalNumber } from './positional-number';
import { fromNumber, fromStringDirect } from './base-converter';
import { AdditionOperand, AdditionPositionResult, AdditionResult, Digit, PositionResult } from '../models';
import { getComplementExtension, hasInfiniteExtension } from './complement-extension';
import { complementStrToBaseStr } from './complement-converter';
import { buildLookup, findPositionRange, NUM_ADDITIONAL_EXTENSIONS } from './operation-utils';
import { OperationType } from '../models/operation';
import { AdditionType } from '../models/operation-algorithm';

export function addPositionalNumbers(numbers: PositionalNumber[]): AdditionResult {
    if (!areSameBaseNumbers(numbers)) {
        throw Error('Numbers to add must have same base');
    }
    const numbersAsDigits = numbers.map((number) => number.complement.asDigits());
    const result = addDigitsArrays(numbersAsDigits);
    return { ...result, numberOperands: numbers };
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
        stepResults: result,
        resultDigits,
        numberResult,
        operands: digits,
        operation: OperationType.Addition,
        algorithmType: AdditionType.Default,
        numberOperands: []
    };
}

export function extractResultDigitsFromAddition(positionResults: AdditionPositionResult[]): AdditionOperand[] {
    const digitsFromPositions: AdditionOperand[] = positionResults.map((res) => {
        return { ...res.valueAtPosition };
    });
    const carryDigitsNotConsideredInResult: AdditionOperand[] = [];

    positionResults.forEach((result) => {
        const missingCarryDigits = result.carry.filter((dgt) => {
            return !digitsFromPositions.find((posDgt) => dgt.position === posDgt.position);
        });

        carryDigitsNotConsideredInResult.push(...missingCarryDigits);
    });

    const withExtension: AdditionOperand[] = [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()];

    return mergeAdditionExtensionDigit(withExtension, positionResults);
}

export function mergeAdditionExtensionDigit<T extends Digit>(resultDigits: T[], positionResults: PositionResult<T>[]): AdditionOperand[] {
    const [, extensionDigit, ...rest] = resultDigits;
    const firstDifferentIndex = findFirstNonRepeatingDigitIndex(resultDigits);

    let startPositionIndex = firstDifferentIndex === -1
        ? rest.length - 1
        : firstDifferentIndex;

    const positionIndexBeforeStart = startPositionIndex - 1;

    const shouldStartFromPreviousPosition = startPositionIndex >= 1
        && prevPositionGeneratedFromInitialDigits(startPositionIndex, rest, positionResults);

    if (shouldStartFromPreviousPosition) startPositionIndex = positionIndexBeforeStart;

    const startPosition = rest[startPositionIndex].position;
    const mergedExtension = getComplementExtension(extensionDigit, startPosition + 1);
    const nonExtensionDigits = rest.slice(startPositionIndex);

    return [mergedExtension, ...nonExtensionDigits];
}

function prevPositionGeneratedFromInitialDigits<T extends Digit>(index: number, digits: AdditionOperand[], positionResults: PositionResult<T>[]): boolean {
    const prevPosition = digits[index - 1].position;
    const prevPositionResult = positionResults.find((res) => res.valueAtPosition.position === prevPosition);

    return positionGeneratedFromInitialDigits(prevPositionResult);
}

function positionGeneratedFromInitialDigits<T extends Digit>(positionResult: PositionResult<T>): boolean {
    return positionResult.operands.every((op) => !op.isComplementExtension);
}

export function findFirstNonRepeatingDigitIndex<T extends Digit>(resultDigits: T[]): number {
    const [, extensionDigit, ...rest] = resultDigits;
    return rest.findIndex((digit) => {
        return digit.valueInDecimal != extensionDigit.valueInDecimal;
    });
}

export function buildPositionalNumberFromDigits(resultDigits: AdditionOperand[]): PositionalNumber {
    let complementStr = '';
    const base = resultDigits[0].base;

    resultDigits.forEach((digit) => {
        const firstFractionalPartDigitIndex = -1;
        if (digit.position === firstFractionalPartDigitIndex) {
            if( base > 36)
                complementStr = complementStr.slice(0, -1);
            complementStr += '.'
        }
        complementStr += base > 36 ? digit.representationInBase + ' ' : digit.representationInBase;
    });

    const representationStr = complementStrToBaseStr(complementStr.trimRight(), base);
    return fromStringDirect(representationStr, base).result;
}


export function addDigitsAtPosition(digits: AdditionOperand[], position: number, globalBase: number): AdditionPositionResult {
    const base = digits[0] ? digits[0].base : globalBase;

    if (!digits.length) {
        return {
            carry: [],
            valueAtPosition: {
                representationInBase: BaseDigits.getRepresentation(0, base),
                valueInDecimal: 0,
                position: position,
                base: globalBase
            },
            decimalSum: 0,
            operands: []
        };
    }

    const decimalSum = digits.reduce((sum, digit) => {
        return sum + digit.valueInDecimal;
    }, 0);

    const decimalPositionValue = decimalSum % base;
    const valueInBase = BaseDigits.getRepresentation(decimalPositionValue, base);
    const decimalCarry = (decimalSum - decimalPositionValue) / base;

    const valueAtPosition: AdditionOperand = {
        base,
        representationInBase: valueInBase,
        valueInDecimal: decimalPositionValue,
        position: position
    };

    if (!decimalCarry) return { valueAtPosition, carry: [], operands: digits, decimalSum };

    return {
        valueAtPosition,
        carry: carryToDigits(decimalCarry, base, position),
        operands: digits,
        decimalSum
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
