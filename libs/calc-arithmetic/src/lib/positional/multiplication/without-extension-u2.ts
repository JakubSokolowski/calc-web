import { alignFractions, mostSignificantPosition, shiftLeft } from '../digits';
import { addDigitsArrays } from '../addition';
import { NumberComplement } from '../number-complement';
import { getComplement, getDigitComplement } from '../complement-converter';
import { mergeExtensionDigits } from '../complement-extension';
import { WithoutExtension } from './without-extension';
import { Digit, MultiplicationOperand, MultiplicationResult, MultiplicationRowResult } from '../../models';
import { fromDigits } from '../base-converter';
import { OperationType } from '../../models/operation';
import { MultiplicationType } from '../../models/operation-algorithm';

export class MultiplicationWithoutExtensionU2 extends WithoutExtension {
    multiplyDigitRows(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[]): MultiplicationResult {
        const [...positionsAscending] = [...multiplierRow].reverse();

        const lastMultiplierDigit = positionsAscending.pop();

        const rowResults: MultiplicationRowResult[] = positionsAscending.map((multiplier) => {
            return this.multiplyRowByDigit(multiplicandRow, multiplier);
        });

        rowResults.push(this.multiplyRowByLastDigit(multiplicandRow, lastMultiplierDigit));

        const digitsToShift = rowResults.map(r => r.resultDigits);
        const correction = this.mapToOne(multiplicandRow);
        digitsToShift.push(correction);


        const shifted = digitsToShift.map((opRow, index) => {
            if (index === digitsToShift.length - 1) {
                return shiftLeft(opRow, index - 1);
            }
            const complement: Digit = {
                base: 2,
                isComplementExtension: true,
                position: opRow[0].position + 1,
                valueInDecimal: 0,
                representationInBase: '(0)'
            };
            return shiftLeft([complement, ...opRow], index);
        });

        const sum = addDigitsArrays(shifted);
        const adjustedSum = this.adjustForMultiplierFraction(sum, multiplierRow);
        const trimmedLeadingZeros = this.trimSumDigits(adjustedSum.numberResult.asDigits());
        const resultWithProperSign = fromDigits(trimmedLeadingZeros, this.resultNegative).result;

        const multiplicandComplement = this.multiplier.isNegative()
            ? fromDigits(getComplement(new NumberComplement(multiplicandRow)).asDigits()).result
            : undefined;

        return {
            operands: [multiplicandRow, multiplierRow],
            resultDigits: adjustedSum.resultDigits,
            numberResult: resultWithProperSign,
            numberOperands: [],
            lastMultiplierDigit,
            multiplicandComplement,
            addition: adjustedSum,
            stepResults: rowResults,
            operation: OperationType.Multiplication,
            algorithmType: MultiplicationType.WithoutExtension
        };
    }

    multiplyRowByLastDigit(rowDigits: MultiplicationOperand[], lastMultiplier: MultiplicationOperand): MultiplicationRowResult {
        let resultDigits: MultiplicationOperand[];

        if (lastMultiplier.valueInDecimal === 0) {
            resultDigits = this.mapToZeros(rowDigits);
        } else {
            const complement = getComplement(new NumberComplement(rowDigits));
            const compDigits = complement.asDigits().slice(1);
            resultDigits = this.negateMostSignificant(compDigits);
        }

        return {
            multiplicands: [...rowDigits],
            valueAtPosition: {} as any,
            operands: [],
            multiplier: lastMultiplier,
            rowPositionResults: [],
            resultDigits: resultDigits,
            decimalProduct: 0
        };
    }

    multiplyRowByDigit(rowDigits: MultiplicationOperand[], multiplier: MultiplicationOperand): MultiplicationRowResult {
        const resultDigits = multiplier.valueInDecimal === 0
            ? this.mapToZeros(rowDigits)
            : this.negateMostSignificant(rowDigits);

        return {
            multiplicands: [...rowDigits],
            valueAtPosition: {} as any,
            operands: [],
            multiplier,
            rowPositionResults: [],
            resultDigits,
            decimalProduct: 0
        };
    }

    negateMostSignificant(digits: MultiplicationOperand[]) {
        const copy = [...digits];
        copy[0] = getDigitComplement(copy[0]);
        return copy;
    }

    negateLeastSignificant(digits: MultiplicationOperand[]) {
        const copy = [...digits];
        copy[copy.length - 1] = getDigitComplement(copy[copy.length - 1]);
        return copy;
    }

    mapToZeros(digits: MultiplicationOperand[]) {
        return this.negateMostSignificant(digits.map(d => ({ ...d, valueInDecimal: 0, representationInBase: '0' })));
    }

    mapToOne(digits: MultiplicationOperand[]) {
        const appennd: Digit = {
            ...digits[0],
            position: digits[0].position + 1
        };
        const negated = this.negateLeastSignificant(this.mapToZeros([appennd, ...digits]));
        negated[0].isComplementExtension = true;
        return negated;
    }

    prepareOperands(): MultiplicationOperand[][] {
        const aligned = alignFractions([
            this.multiplicand.complement.asDigits(),
            this.multiplier.complement.asDigits()
        ]);

        const [
            extendedMultiplicand,
            extendedMultiplier
        ] = this.extendComplementsToMostSignificant(aligned);

        return [
            extendedMultiplicand.filter(d => !d.isComplementExtension),
            extendedMultiplier.filter(d => !d.isComplementExtension)
        ];
    }

    protected extendComplementsToMostSignificant<T extends Digit>(complements: T[][]) {
        const someNegative = this.someNegativeOperands(complements);

        const firstNonZero = complements.map(digits => {
            if (someNegative && digits[0].valueInDecimal === 0) {
                return digits[1].position;
            }
            return mostSignificantPosition(digits);
        });


        const globalMostSignificant = Math.max(...firstNonZero);
        const maxPositionAfterExtend = globalMostSignificant + complements.length;

        const merged = complements.map(mergeExtensionDigits);
        const numRows = complements.length;

        return merged.map((complement, index) => {
            return this.extendComplementToPosition(complement, numRows, index, maxPositionAfterExtend);
        });
    }
}