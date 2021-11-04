import { trimLeadingZeros } from '../digits';
import { fromDigits } from '../base-converter';
import { getComplement } from '../complement-converter';
import { addDigitsArrays} from '../addition';
import { PositionalNumber } from '../positional-number';
import {
    Digit,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult,
} from '../../models';
import { OperationType } from '../../models/operation';
import { MultiplicationType } from '../../models/operation-algorithm';
import {
    extractResultDigitsFromMultiplicationRow,
    getMultiplicationResultPositionCap,
} from './common';
import { extendComplement, mergeComplementExtension } from '../complement-extension';
import { NumberComplement } from '../number-complement';
import { DefaultMultiplication } from './multiplication';
import { OperandsTransformType } from '../transform/preprocessor-type';
import { applyTransformsByType } from '../transform/apply-by-type';

export function multiplyWithExtensions(
    numbers: PositionalNumber[]
): MultiplicationResult {
    return new WithExtension(numbers).multiply();
}

export class WithExtension extends DefaultMultiplication {
    constructor(numbers: PositionalNumber[]) {
        super(numbers);
    }

    protected get algorithmType(): MultiplicationType {
        return MultiplicationType.WithExtension;
    }

    prepareOperands(): MultiplicationOperand[][] {
        return applyTransformsByType(
            [
                this.multiplicand.complement.asDigits(),
                this.multiplier.complement.asDigits(),
            ],
            [OperandsTransformType.AlignFractions]
        );
    }

    multiplyDigitRows(
        multiplicandRow: MultiplicationOperand[],
        multiplierRow: MultiplicationOperand[]
    ): MultiplicationResult {
        const positionsAscending = [...multiplierRow].reverse();
        const lastMultiplier = positionsAscending.pop();

        const rowResults: MultiplicationRowResult[] = positionsAscending.map(
            (multiplier) => {
                return this.multiplyRowByDigit(multiplicandRow, multiplier);
            }
        );

        const operandsToAdd = rowResults.map((res) => res.resultDigits);

        let multiplicandComplement: PositionalNumber;

        if (this.isDigitNegativeComplement(lastMultiplier)) {
            const complement = getComplement(
                new NumberComplement(this.multiplicand.complement.asDigits())
            );
            operandsToAdd.push(complement.asDigits());
            multiplicandComplement = fromDigits(complement.asDigits());
        }

        const positionCap = this.getPositionCap(multiplicandRow, multiplierRow);
        const transformedForAddition = this.transformForAddition(operandsToAdd);
        const sum = addDigitsArrays(transformedForAddition, positionCap);
        const adjustedSum = this.adjustForMultiplierFraction(
            sum,
            multiplierRow
        );

        const trimmedLeadingZeros = this.trimSumDigits(
            adjustedSum.numberResult.asDigits()
        );
        const resultWithProperSign = fromDigits(
            trimmedLeadingZeros,
            this.resultNegative
        );

        return {
            operands: [multiplicandRow, multiplierRow],
            resultDigits: adjustedSum.resultDigits,
            numberResult: resultWithProperSign,
            numberOperands: [],
            addition: adjustedSum,
            stepResults: rowResults,
            operation: OperationType.Multiplication,
            algorithmType: this.algorithmType,
            multiplicandComplement,
            lastMultiplierDigit: lastMultiplier,
        };
    }

    protected transformForAddition(digitsToShift: MultiplicationOperand[][]) {
        return applyTransformsByType(digitsToShift, [
            OperandsTransformType.MergeExtensions,
            OperandsTransformType.ShiftAndExtendComplements,
        ]);
    }

    multiplyRowByDigit(
        rowDigits: MultiplicationOperand[],
        multiplier: MultiplicationOperand
    ): MultiplicationRowResult {
        const carryLookup: Record<number, MultiplicationOperand> = {};

        const extended = extendComplement(rowDigits, rowDigits.length);
        const positionAscending = [...extended].reverse();
        const positionResults: MultiplicationPositionResult[] = [];

        positionAscending.forEach((multiplicand) => {
            const position = multiplicand.position;
            const carry = carryLookup[position];
            const positionResult = this.multiplyDigits(
                multiplicand,
                multiplier,
                carry
            );
            if (positionResult.carry) {
                carryLookup[positionResult.carry.position] = {
                    ...positionResult.carry,
                };
            }
            positionResults.push(positionResult);
        });

        const resultDigits = this.extractResultDigitsFromMultiplicationRow(
            positionResults
        );

        return {
            multiplicands: [...rowDigits],
            valueAtPosition: {} as any,
            operands: [],
            multiplier,
            rowPositionResults: positionResults,
            resultDigits,
            decimalProduct: 0,
        };
    }

    protected extractResultDigitsFromMultiplicationRow(
        positionResults: MultiplicationPositionResult[]
    ): MultiplicationOperand[] {
        const withExtension = extractResultDigitsFromMultiplicationRow(
            positionResults
        );
        return mergeComplementExtension(withExtension, positionResults);
    }

    protected trimSumDigits(digits: Digit[]) {
        return trimLeadingZeros(digits);
    }

    private getPositionCap(
        multiplicandRow: MultiplicationOperand[],
        multiplierRow: MultiplicationOperand[]
    ): number {
        return getMultiplicationResultPositionCap(
            multiplicandRow,
            multiplierRow
        );
    }

    private isDigitNegativeComplement(
        lastDigit: MultiplicationOperand
    ): boolean {
        return lastDigit.valueInDecimal === lastDigit.base - 1;
    }
}
