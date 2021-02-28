import { fromDigits } from '../base-converter';
import {
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult
} from '../../models';
import { addPositionalNumbers } from '../addition';
import { MultiplicationType } from '../../models/operation-algorithm';
import { PositionalNumber } from '../positional-number';
import { OperationType } from '../../models/operation';
import { alignFractions, shiftLeft } from '../digits';
import {
    adjustForMultiplierFraction,
    extractResultDigitsFromMultiplicationRow,
    Multiplication,
    multiplyDigits
} from './common';

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

export function multiplyDigitRows(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[], resultNegative: boolean): MultiplicationResult {
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
    const resultWithProperSign = fromDigits(adjustedSum.numberResult.toDigitsList(), resultNegative).result;

    return {
        operands: [multiplicandRow, multiplierRow],
        resultDigits: adjustedSum.resultDigits,
        numberResult: resultWithProperSign,
        numberOperands: [],
        addition: adjustedSum,
        stepResults: rowResults,
        operation: OperationType.Multiplication,
        algorithmType: MultiplicationType.Default,
        lastMultiplierDigit: multiplicandRow[0]
    };
}

export function multiplyDefault(numbers: PositionalNumber[]): MultiplicationResult {
    const calculator = new DefaultMultiplication(numbers);
    return calculator.multiply();
}

export class DefaultMultiplication extends Multiplication {
    constructor(numbers: PositionalNumber[]) {
        super(numbers);
    }

    protected get resultNegative () {
        return this.multiplicand.isNegative() !== this.multiplier.isNegative();
    }

    multiply(): MultiplicationResult {
        const [alMultiplicand, alMultiplier] = this.prepareOperands();
        const result = this.multiplyDigitRows(alMultiplicand, alMultiplier);
        return {
            ...result,
            numberOperands: [this.multiplicand, this.multiplier]
        }
    }

    protected prepareOperands(): MultiplicationOperand[][] {
        return alignFractions(
            [
                this.multiplicand.asDigits(),
                this.multiplier.asDigits()
            ]
        );
    }

    protected multiplyDigitRows(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[]): MultiplicationResult {
        const positionAscending = [...multiplierRow].reverse();

        const rowResults: MultiplicationRowResult[] = positionAscending.map((multiplier) => {
            return this.multiplyRowByDigit(multiplicandRow, multiplier);
        });

        const resultNumbers = rowResults.map((result, index) => {
            const shifted = shiftLeft(result.resultDigits, index);
            return fromDigits(shifted).result;
        });

        const sum = addPositionalNumbers(resultNumbers);
        const adjustedSum = this.adjustForMultiplierFraction(sum, multiplierRow);
        const resultWithProperSign = fromDigits(adjustedSum.numberResult.toDigitsList(), this.resultNegative).result;

        return {
            operands: [multiplicandRow, multiplierRow],
            resultDigits: adjustedSum.resultDigits,
            numberResult: resultWithProperSign,
            numberOperands: [],
            addition: adjustedSum,
            stepResults: rowResults,
            operation: OperationType.Multiplication,
            algorithmType: MultiplicationType.Default,
            lastMultiplierDigit: multiplicandRow[0]
        };
    }

    protected multiplyRowByDigit(rowDigits: MultiplicationOperand[], multiplier: MultiplicationOperand): MultiplicationRowResult {
        const carryLookup: Record<number, MultiplicationOperand> = {};

        const positionResults: MultiplicationPositionResult[] = [];
        const positionAscending = [...rowDigits].reverse();

        positionAscending.forEach((multiplicand) => {
            const position = multiplicand.position;
            const carry = carryLookup[position];
            const positionResult = this.multiplyDigits(multiplicand, multiplier, carry);
            if (positionResult.carry) {
                carryLookup[positionResult.carry.position] = { ...positionResult.carry };
            }
            positionResults.push(positionResult);
        });

        const resultDigits = this.extractResultDigitsFromMultiplicationRow(positionResults);
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
}
