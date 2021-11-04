import { BaseDigits } from './base-digits';
import { PositionalNumber } from './positional-number';
import { fromDigits, fromNumber } from './base-converter';
import { AdditionOperand, AdditionPositionResult, AdditionResult } from '../models';
import { hasInfiniteExtension, mergeComplementExtension } from './complement-extension';
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

export function addDigitsArrays(digits: AdditionOperand[][], positionCap?: number): AdditionResult {
    const carryLookup: Record<number, AdditionOperand[]> = {};
    const { msp, lsp } = findPositionRange(digits);
    const digitsPositionLookup: Record<number, AdditionOperand>[] = buildLookup(digits, msp);
    const result: AdditionPositionResult[] = [];
    const base = digits[0][0].base;

    let currentPosition = lsp;
    let mostSignificant = msp;

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

        if (mostSignificantCarryPosition && mostSignificantCarryPosition > msp) {
            mostSignificant = mostSignificantCarryPosition;
        }
        result.push(positionResult);
        currentPosition += 1;

        if (prev) {
            const infiniteExtensionBegun = hasInfiniteExtension(prev, positionResult, msp);
            if (infiniteExtensionBegun) {
                break;
            }
        }
        prev = positionResult;
    }

    const resultDigits = extractResultDigitsFromAddition(result, positionCap);
    const numberResult = fromDigits(resultDigits);

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

export function extractResultDigitsFromAddition(positionResults: AdditionPositionResult[], positionCap?: number): AdditionOperand[] {
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

    const withExtension: AdditionOperand[] = [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()]
        .filter(d => {
            if(!positionCap) return true;
            return d.position < positionCap;
        });


    return mergeComplementExtension(withExtension, positionResults);
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
    const result = fromNumber(decimalValue, base);

    return result.asDigits()
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
