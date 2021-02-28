import { alignFractions, isZeroDigit, leastSignificantPosition, mostSignificantPosition, shiftLeft } from '../digits';
import { fromDigits } from '../base-converter';
import { getComplement } from '../complement-converter';
import { addDigitsArrays, mergeAdditionExtensionDigit } from '../addition';
import { PositionalNumber } from '../positional-number';
import {
    Digit,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult
} from '../../models';
import { OperationType } from '../../models/operation';
import { MultiplicationType } from '../../models/operation-algorithm';
import { extractResultDigitsFromMultiplicationRow } from './common';
import { extendComplement, mergeExtensionDigits } from '../complement-extension';
import { trimStartByPredicate } from '@calc/utils';
import { NumberComplement } from '../number-complement';
import { DefaultMultiplication } from './multiplication';

export function multiplyWithExtensions(numbers: PositionalNumber[]): MultiplicationResult {
    return new WithExtension(numbers).multiply();
}

export class WithExtension extends DefaultMultiplication {
    constructor(numbers: PositionalNumber[]) {
        super(numbers);
    }

    prepareOperands(): MultiplicationOperand[][] {
        return alignFractions(
            [
                this.multiplicand.complement.asDigits(),
                this.multiplier.complement.asDigits()
            ]
        );
    }

    multiplyDigitRows(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[]): MultiplicationResult {
        const positionsAscending = [...multiplierRow].reverse();
        const lastMultiplier = positionsAscending.pop();

        const rowResults: MultiplicationRowResult[] = positionsAscending.map((multiplier) => {
            return this.multiplyRowByDigit(multiplicandRow, multiplier);
        });

        const digitsToShift = rowResults.map(res => res.resultDigits);

        let multiplicandComplement: PositionalNumber;

        if (this.isDigitNegativeComplement(lastMultiplier)) {
            const complement = getComplement(new NumberComplement(this.multiplicand.complement.asDigits()));
            digitsToShift.push(complement.asDigits());
            multiplicandComplement = fromDigits(complement.asDigits()).result;
        }

        const shifted = this.shiftAndExtend(digitsToShift);
        const positionCap = this.getPositionCap(multiplicandRow, multiplierRow);
        const sum = addDigitsArrays(shifted, positionCap);
        const adjustedSum = this.adjustForMultiplierFraction(sum, multiplierRow);
        const trimmedLeadingZeros = this.trimSumDigits(adjustedSum.numberResult.asDigits());
        const resultWithProperSign = fromDigits(trimmedLeadingZeros, this.resultNegative).result;

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

    multiplyRowByDigit(rowDigits: MultiplicationOperand[], multiplier: MultiplicationOperand): MultiplicationRowResult {
        const carryLookup: Record<number, MultiplicationOperand> = {};

        const extended = extendComplement(rowDigits, rowDigits.length);
        const positionAscending = [...extended].reverse();
        const positionResults: MultiplicationPositionResult[] = [];

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

    protected extractResultDigitsFromMultiplicationRow(positionResults: MultiplicationPositionResult[]): MultiplicationOperand[] {
        const withExtension = extractResultDigitsFromMultiplicationRow(positionResults);
        return mergeAdditionExtensionDigit(withExtension, positionResults);
    }

    protected trimSumDigits(digits: Digit[]) {
        const onlyZeros = digits.every(isZeroDigit);
        return onlyZeros
            ? digits
            : trimStartByPredicate(digits, isZeroDigit);
    }

    protected shiftAndExtend<T extends Digit>(operands: T[][]) {
        const merged = operands.map(ops => mergeExtensionDigits(ops));

        const someNegative = this.someNegativeOperands(operands);

        const firstNonZero = merged.map(digits => {
            if (someNegative && digits[0].valueInDecimal === 0) {
                return digits[1].position;
            }
            return mostSignificantPosition(digits);
        });

        const globalMostSignificant = Math.max(...firstNonZero);
        const maxPositionAfterExtend = globalMostSignificant + merged.length;

        const shiftedRows = merged.map((opRow, index) => {
            return shiftLeft(opRow, index);
        });

        return this.extendComplementsToPosition(shiftedRows, maxPositionAfterExtend);
    }

    private getPositionCap(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[]): number {
        const multiplicandLSP = leastSignificantPosition(multiplicandRow);
        const multiplierLSP = leastSignificantPosition(multiplierRow);
        const globalLSP = Math.min(multiplicandLSP, multiplierLSP);

        return globalLSP + multiplicandRow.length + multiplierRow.length;
    }

    private isDigitNegativeComplement(lastDigit: MultiplicationOperand): boolean {
        return lastDigit.valueInDecimal === lastDigit.base - 1;
    }

    protected extendComplementToPosition<T extends Digit>(complement: T[], numRows: number, rowIndex: number, position: number): T[] {
        const msp = complement[0].position;
        const normalExtensionForRow = numRows - rowIndex - 1;
        const mspAfterNormalExtension = msp + normalExtensionForRow;
        const actualPositionDifference = position - mspAfterNormalExtension;
        const numPositionsToExtend = normalExtensionForRow + actualPositionDifference;
        return extendComplement(complement, numPositionsToExtend);
    }

    private extendComplementsToPosition<T extends Digit>(complements: T[][], maxPositionAfterExtend: number) {
        const merged = complements.map(mergeExtensionDigits);
        const numRows = complements.length;

        return merged.map((complement, index) => {
            return this.extendComplementToPosition(complement, numRows, index, maxPositionAfterExtend);
        });
    }

    protected someNegativeOperands<T extends Digit>(operands: T[][]) {
        return operands.some(row => row[0].isComplementExtension && row[0].valueInDecimal > 0);
    }
}
