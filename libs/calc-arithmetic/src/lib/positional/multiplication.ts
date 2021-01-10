import { fromDigits } from './base-converter';
import {
    AdditionOperand,
    AdditionResult,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult
} from '../models';
import { BaseDigits } from './base-digits';
import { addPositionalNumbers } from './addition';
import { MultiplicationType } from '../models/operation-algorithm';
import { PositionalNumber } from './representations';
import { OperationType } from '../models/operation';
import { alignFractions, shiftLeft, shiftRight } from './digits';
import { trimEndByPredicate } from '@calc/utils';

export function multiplyDigits(
    multiplicand: MultiplicationOperand,
    multiplier: MultiplicationOperand,
    carry?: MultiplicationOperand,
): MultiplicationPositionResult {
    const base = multiplicand.base;
    const position = multiplicand.position;
    const shiftedPosition = multiplicand.position + multiplier.position;

    const decimalProduct = multiplicand.valueInDecimal * multiplier.valueInDecimal;
    const decimalProductWithCarry = decimalProduct + (carry ? carry.valueInDecimal : 0);

    const decimalPositionValue = decimalProductWithCarry % base;
    const representationInBase = BaseDigits.getRepresentation(decimalPositionValue, base);
    const decimalCarry = (decimalProductWithCarry - decimalPositionValue) / base;

    const valueAtPosition: MultiplicationOperand = {
        base,
        representationInBase: representationInBase,
        valueInDecimal: decimalPositionValue,
        position: position,
    };

    const operands = [multiplicand, multiplier];
    if (carry) operands.push(carry);

    if (!decimalCarry) return { valueAtPosition, operands: operands, shiftedPosition, decimalProduct: decimalProductWithCarry };

    const carryRep = BaseDigits.getRepresentation(decimalCarry, base);

    const nextPositionCarry: MultiplicationOperand = {
        position: position + 1,
        carrySourcePosition: position,
        base,
        valueInDecimal: decimalCarry,
        representationInBase: carryRep,
        isCarry: true
    };

    return {
        valueAtPosition,
        operands,
        carry: nextPositionCarry,
        shiftedPosition,
        decimalProduct: decimalProductWithCarry
    };
}

export function multiplyRowByDigit(rowDigits: MultiplicationOperand[], multiplier: MultiplicationOperand): MultiplicationRowResult {
    const carryLookup: Record<number, MultiplicationOperand> = {};

    const positionResults: MultiplicationPositionResult[] = [];
    const positionAscending = [...rowDigits].reverse();

    positionAscending.forEach((multiplicand) => {
        const position = multiplicand.position;
        const carry = carryLookup[position];
        const positionResult = multiplyDigits(multiplicand, multiplier, carry);
        if (positionResult.carry) {
            carryLookup[positionResult.carry.position] = { ...positionResult.carry };
        }
        positionResults.push(positionResult);
    });

    const resultDigits = extractResultDigitsFromMultiplicationRow(positionResults);

    return {
        multiplicands: [...rowDigits],
        valueAtPosition: {} as any,
        operands: [],
        multiplier,
        rowPositionResults: positionResults,
        resultDigits,
        decimalProduct: 0
    };
}

export function extractResultDigitsFromMultiplicationRow(positionResults: MultiplicationPositionResult[]): MultiplicationOperand[] {
    const digitsFromPositions: AdditionOperand[] = positionResults.map((res) => {
        return { ...res.valueAtPosition };
    });
    const carryDigitsNotConsideredInResult: AdditionOperand[] = [];

    positionResults.forEach((result) => {
        if (result.carry && !digitsFromPositions.find((posDgt) => result.carry.position === posDgt.position)) {
            carryDigitsNotConsideredInResult.push(result.carry);
        }
    });

    return [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()];
}

export function multiplyDigitRows(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[]): MultiplicationResult {
    const positionAscending = [...multiplierRow].reverse();

    const rowResults: MultiplicationRowResult[] = positionAscending.map((multiplier) => {
        return multiplyRowByDigit(multiplicandRow, multiplier);
    });

    const resultNumbers = rowResults.map((result, index) => {
        const shifted = shiftLeft(result.resultDigits, index);
        return fromDigits(shifted).result;
    });

    const sum = addPositionalNumbers(resultNumbers);
    const adjustedSum = adjustForMultiplierFraction(sum, multiplierRow);

    return {
        operands: [multiplicandRow, multiplierRow],
        resultDigits: adjustedSum.resultDigits,
        numberResult: adjustedSum.numberResult,
        numberOperands: [],
        addition: adjustedSum,
        stepResults: rowResults,
        operation: OperationType.Multiplication,
        algorithmType: MultiplicationType.Default,
    };
}

function adjustForMultiplierFraction(additionResult: AdditionResult, multiplierRow: MultiplicationOperand[]): AdditionResult {
    const leastSignificantPosition = multiplierRow[multiplierRow.length - 1].position;
    const numFractionDigits = Math.abs(leastSignificantPosition);
    if (numFractionDigits < 1) return additionResult;

    const shiftedDigits = shiftRight(additionResult.resultDigits, numFractionDigits);
    const trimmedDigits = trimEndByPredicate(shiftedDigits, (digit) => digit.position < -1 && digit.valueInDecimal === 0);
    const shiftedNum = fromDigits(trimmedDigits, additionResult.numberResult.isNegative).result;

    return {
        ...additionResult,
        resultDigits: shiftedDigits,
        numberResult: shiftedNum
    };
}

export function multiplyPositionalNumbers(numbers: PositionalNumber[]): MultiplicationResult {
    const [multiplicand, multiplier] = numbers.map(d => d.toDigitsList());
    const [alMultiplicand, alMultiplier] = alignFractions([multiplicand, multiplier]);
    const result = multiplyDigitRows(alMultiplicand, alMultiplier);

    return {
        ...result,
        numberOperands: numbers
    };
}


