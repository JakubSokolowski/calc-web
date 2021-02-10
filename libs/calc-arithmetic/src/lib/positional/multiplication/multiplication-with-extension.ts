import { alignFractions, isZeroDigit, shiftLeft } from '../digits';
import { fromDigits } from '../base-converter';
import { getComplement } from '../complement-converter';
import { addDigitsArrays, mergeAdditionExtensionDigit } from '../addition';
import { PositionalNumber } from '../positional-number';
import {
    AdditionOperand,
    Digit,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult
} from '../../models';
import { OperationType } from '../../models/operation';
import { MultiplicationType } from '../../models/operation-algorithm';
import { adjustForMultiplierFraction, extractResultDigitsFromMultiplicationRow, multiplyDigits } from './common';
import { extendComplement, mergeExtensionDigits } from '../complement-extension';
import { trimStartByPredicate } from '@calc/utils';
import { NumberComplement } from '../number-complement';

export function multiplyWithExtensions(numbers: PositionalNumber[]): MultiplicationResult {
    const [multiplicand, multiplier] = numbers;
    const [alMultiplicand, alMultiplier] = alignFractions(
        [
            multiplicand.complement.asDigits(),
            multiplier.complement.asDigits()
        ]
    );
    const resultNegative = multiplicand.isNegative() !== multiplier.isNegative();
    const result = multiplyDigitRows(alMultiplicand, alMultiplier, multiplicand.complement.asDigits(), resultNegative);

    return {
        ...result,
        numberOperands: numbers
    };
}

export function multiplyRowByDigit(multiplicandDigits: MultiplicationOperand[], multiplier: MultiplicationOperand): MultiplicationRowResult {
    const carryLookup: Record<number, MultiplicationOperand> = {};

    const extended = extendComplement(multiplicandDigits, multiplicandDigits.length);
    const positionAscending = [...extended].reverse();
    const positionResults: MultiplicationPositionResult[] = [];

    positionAscending.forEach((multiplicand) => {
        const position = multiplicand.position;
        const carry = carryLookup[position];
        const positionResult = multiplyDigits(multiplicand, multiplier, carry);
        if (positionResult.carry) {
            carryLookup[positionResult.carry.position] = { ...positionResult.carry };
        }
        positionResults.push(positionResult);
    });

    const resultDigits = extractResultDigitsFromMultiplicationWithExtensionRow(positionResults);

    return {
        multiplicands: [...multiplicandDigits],
        valueAtPosition: {} as any,
        operands: [],
        multiplier,
        rowPositionResults: positionResults,
        resultDigits,
        decimalProduct: 0
    };
}

function extendComplementToPosition<T extends Digit>(complement: T[], numRows: number, rowIndex: number, position: number): T[] {
    const msp = complement[0].position;
    const normalExtensionForRow = numRows - rowIndex - 1;
    const mspAfterNormalExtension = msp + normalExtensionForRow;
    const actualPositionDifference = position - mspAfterNormalExtension;
    const numPositionsToExtend = normalExtensionForRow + actualPositionDifference;
    return extendComplement(complement, numPositionsToExtend);
}

function extendComplementsToPosition<T extends Digit>(complements: T[][], maxPositionAfterExtend: number) {
    const merged = complements.map(mergeExtensionDigits);
    const numRows = complements.length;

    return merged.map((complement, index) => {
        return extendComplementToPosition(complement, numRows, index, maxPositionAfterExtend);
    });
}

export function shiftAndExtend<T extends Digit>(operands: T[][]) {
    const globalMostSignificant = Math.max(...operands.map(r => r[0].position));
    const maxPositionAfterExtend = globalMostSignificant + operands.length - 1;

    const shiftedRows = operands.map((opRow, index) => {
        return shiftLeft(opRow, index);
    });

    return extendComplementsToPosition(shiftedRows, maxPositionAfterExtend);
}

function multiplyDigitRows(
    multiplicandRow: MultiplicationOperand[],
    multiplierRow: MultiplicationOperand[],
    multiplicandDigits: Digit[],
    resultNegative: boolean
): MultiplicationResult {
    const positionsAscending = [...multiplierRow].reverse();
    const lastMultiplier = positionsAscending.pop();

    const rowResults: MultiplicationRowResult[] = positionsAscending.map((multiplier) => {
        return multiplyRowByDigit(multiplicandRow, multiplier);
    });

    const rowResultDigits = shiftAndExtend(rowResults.map(res => res.resultDigits));

    let multiplicandComplement: PositionalNumber;

    if (isDigitNegativeComplement(lastMultiplier)) {
        const complement = getComplement(new NumberComplement(multiplicandDigits));
        const numPositionsToShift = rowResultDigits.length;
        const shifted = shiftLeft(complement.asDigits(), numPositionsToShift);
        rowResultDigits.push(shifted);
        multiplicandComplement = fromDigits(complement.asDigits()).result;
    }

    const sum = addDigitsArrays(rowResultDigits);
    const adjustedSum = adjustForMultiplierFraction(sum, multiplierRow);
    const trimmedLeadingZeros = trimSumDigits(adjustedSum.numberResult.asDigits());
    const resultWithProperSign = fromDigits(trimmedLeadingZeros, resultNegative).result;

    return {
        operands: [multiplicandRow, multiplierRow],
        resultDigits: adjustedSum.resultDigits,
        numberResult: resultWithProperSign,
        numberOperands: [],
        addition: adjustedSum,
        stepResults: rowResults,
        operation: OperationType.Multiplication,
        algorithmType: MultiplicationType.WithExtension,
        multiplicandComplement,
        lastMultiplierDigit: lastMultiplier
    };
}

export function trimSumDigits(digits: Digit[]) {
    const onlyZeros = digits.every(isZeroDigit);
    return onlyZeros
        ? digits
        : trimStartByPredicate(digits, isZeroDigit);
}


function isDigitNegativeComplement(lastDigit: MultiplicationOperand): boolean {
    return lastDigit.valueInDecimal === lastDigit.base - 1;
}

export function extractResultDigitsFromMultiplicationWithExtensionRow(positionResults: MultiplicationPositionResult[]): MultiplicationOperand[] {
    const withExtension = extractResultDigitsFromMultiplicationRow(positionResults);
    return mergeAdditionExtensionDigit(withExtension, positionResults);
}
