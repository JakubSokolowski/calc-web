import { AdditionOperand, AdditionPositionResult, Digit } from '../models';
import { objArrayEqual } from '@calc/utils';
import { BaseDigits } from './base-digits';

export function hasInfiniteExtension(prev: AdditionPositionResult, curr: AdditionPositionResult, globalMostSignificantPosition: number): boolean {
    if (curr.valueAtPosition.position <= globalMostSignificantPosition) return false;

    const resultsEqual = areOperandValuesEqual(prev.valueAtPosition, curr.valueAtPosition);
    if (!resultsEqual) return false;

    const carryOperands = getCarryOperands(curr);
    if(carryOperands.length > 1) return false;

    const allOperandsEqual = areAllOperandsEqual(prev.operands, curr.operands);
    if(carryOperands.length === 0) return allOperandsEqual;

    const singleCarryFromPrevPosition = hasSingleCarryFromPreviousPosition(curr);
    return allOperandsEqual && singleCarryFromPrevPosition;
}

function getCarryOperands(curr: AdditionPositionResult) {
    return curr.operands.filter(op => op.isCarry);
}

function hasSingleCarryFromPreviousPosition(curr: AdditionPositionResult): boolean {
    const carryOperands = curr.operands.filter(op => op.isCarry);
    if(carryOperands.length !== 1) return false;

    return carryOperands[0].carrySourcePosition === curr.valueAtPosition.position -1
}

export function mergeExtensionDigits<T extends Digit>(resultDigits: T[]): T[] {
    const [, extensionDigit, ...rest] = resultDigits;
    const firstDifferentIndex = rest.findIndex((digit) => {
        return digit.valueInDecimal != extensionDigit.valueInDecimal;
    });

    const startPositionIndex = firstDifferentIndex === -1
        ? rest.length -1
        : firstDifferentIndex;

    const startPosition = rest[startPositionIndex].position;
    const mergedExtension = getMergedExtension(extensionDigit, startPosition + 1);
    const nonExtensionDigits = rest.slice(firstDifferentIndex);

    return [mergedExtension, ...nonExtensionDigits]
}

export function getMergedExtension<T extends Digit>(operand: T, position: number): T {
    const base = operand.base;
    const isZeroExtension = operand.valueInDecimal === 0;
    const representationValue = isZeroExtension ? 0 : -1;
    const representationInBase = BaseDigits.getDigit(representationValue, base, true);

    return {
        ...operand,
        position,
        isComplementExtension: true,
        valueInDecimal: isZeroExtension ? 0 : base -1,
        representationInBase
    };
}

function areAllOperandsEqual(aOperands: AdditionOperand[], bOperands: AdditionOperand[]): boolean {
    return objArrayEqual(aOperands, bOperands, areOperandValuesEqual);
}

function areOperandValuesEqual(a: AdditionOperand, b: AdditionOperand): boolean {
    return a.valueInDecimal === b.valueInDecimal
        && a.representationInBase === b.representationInBase;
}

