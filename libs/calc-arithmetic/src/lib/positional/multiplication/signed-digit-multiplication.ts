import { NumberComplement } from '../number-complement';
import { shiftLeft } from '../digits';
import { addDigitsArrays } from '../addition';
import { BoothConverter } from '../signed-digit/booth-converter';
import { MultiplicationWithoutExtensionU2 } from './without-extension-u2';
import { applyTransformsByType } from '../transform/apply-by-type';
import { OperandsTransformType } from '../transform/preprocessor-type';
import { SDConversionResult } from '../signed-digit/signed-digit-converter';
import { getMultiplicationResultPositionCap } from './common';
import { PositionalNumber } from '../positional-number';
import { Digit, MultiplicationOperand, MultiplicationResult, MultiplicationRowResult } from '../../models';
import { fromDigits } from '../base-converter';
import { getComplement } from '../complement-converter';
import { OperationType } from '../../models/operation';
import { MultiplicationType } from '../../models/operation-algorithm';
import { BoothMcSorleyConverter } from '../signed-digit/booth-mcsorley-converter';
import { BoothMcSorleyAltConverter } from '../signed-digit/booth-mcsorley-alt-converter';

export class BoothMultiplication extends MultiplicationWithoutExtensionU2 {
    constructor(numbers: PositionalNumber[]) {
        super(numbers);
    }

    protected get algorithmType(): MultiplicationType {
        return MultiplicationType.Booth;
    }

    multiplyDigitRows(
        multiplicandRow: MultiplicationOperand[],
        multiplierRow: MultiplicationOperand[]
    ): MultiplicationResult {
        const sdConversion = this.convertToSD([...multiplierRow]);
        const [...positionsAscending] = sdConversion.output.reverse();

        const rowResults: MultiplicationRowResult[] = positionsAscending.map(
            (multiplier) => {
                return this.multiplyRowByDigit(multiplicandRow, multiplier);
            }
        );

        const digitsToShift = rowResults.map((r) => r.resultDigits);
        const shifted = digitsToShift.map((opRow, index) => {
            return shiftLeft(opRow, index);
        });

        const positionCap = getMultiplicationResultPositionCap(
            multiplicandRow,
            multiplierRow
        );
        const sum = addDigitsArrays(shifted, positionCap);
        const adjustedSum = this.adjustForMultiplierFraction(
            sum,
            multiplierRow
        );
        const trimmedLeadingZeros = this.trimSumDigits(
            adjustedSum.numberResult.toDigits()
        );
        const resultWithProperSign = fromDigits(
            trimmedLeadingZeros,
            this.resultNegative
        );

        const multiplicandComplement = fromDigits(
            getComplement(new NumberComplement(multiplicandRow)).toDigits()
        );

        return {
            operands: [multiplicandRow, multiplierRow],
            resultDigits: adjustedSum.resultDigits,
            numberResult: resultWithProperSign,
            numberOperands: [],
            multiplicandComplement,
            sdConversion,
            addition: adjustedSum,
            stepResults: rowResults,
            operation: OperationType.Multiplication,
            algorithmType: this.algorithmType
        };
    }

    convertToSD(multiplierRow: Digit[]): SDConversionResult {
        return new BoothConverter(multiplierRow, this.multiplier.isNegative()).toSignedDigitsWithDetails();
    }

    prepareOperands(): MultiplicationOperand[][] {
        return applyTransformsByType(
            [
                this.multiplicand.complement.toDigits(),
                this.multiplier.complement.toDigits()
            ],
            [OperandsTransformType.WithoutExtensionU2Multiplication]
        );
    }

    multiplyRowByDigit(
        rowDigits: MultiplicationOperand[],
        multiplier: MultiplicationOperand
    ): MultiplicationRowResult {
        const resultDigits = this.multiplyRowBySD(rowDigits, multiplier);

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

    multiplyRowBySD(multiplicandRow: Digit[], digitInSD: Digit): Digit[] {
        switch (digitInSD.valueInDecimal) {
            case 0:
                return this.multiplyByZero(multiplicandRow);
            case 1:
                return this.multiplyByOne(multiplicandRow);
            case -1:
                return this.multiplyByMinusOne(multiplicandRow);
            default:
                throw Error(`Unexpected SD value: ${digitInSD.valueInDecimal}`);
        }
    }

    multiplyByZero(digits: Digit[]): Digit[] {
        return digits.map((d) => ({
            ...d,
            representationInBase: '0',
            valueInDecimal: 0
        }));
    }

    multiplyByOne(digits: Digit[]): Digit[] {
        return digits;
    }

    multiplyByMinusOne(digits: Digit[]): Digit[] {
        return getComplement(new NumberComplement(digits)).toDigits(false);
    }
}

export class BoothMcSorleyMultiplication extends BoothMultiplication {
    protected get algorithmType(): MultiplicationType {
        return MultiplicationType.BoothMcSorley;
    }

    convertToSD(multiplierRow: Digit[]): SDConversionResult {
        return new BoothMcSorleyConverter(
            multiplierRow,
            this.multiplier.isNegative()
        ).toSignedDigitsWithDetails();
    }
}

export class BoothMcSorleyAltMultiplication extends BoothMultiplication {
    protected get algorithmType(): MultiplicationType {
        return MultiplicationType.BoothMcSorleyAlt;
    }

    convertToSD(multiplierRow: Digit[]): SDConversionResult {
        return new BoothMcSorleyAltConverter(
            multiplierRow,
            this.multiplier.isNegative()
        ).toSignedDigitsWithDetails();
    }
}

export function multiplyBooth(
    numbers: PositionalNumber[]
): MultiplicationResult {
    const calculator = new BoothMultiplication(numbers);
    return calculator.multiply();
}

export function multiplyBoothMcSorley(
    numbers: PositionalNumber[]
): MultiplicationResult {
    const calculator = new BoothMcSorleyMultiplication(numbers);
    return calculator.multiply();
}

export function multiplyBoothMcSorleyAlt(
    numbers: PositionalNumber[]
): MultiplicationResult {
    const calculator = new BoothMcSorleyAltMultiplication(numbers);
    return calculator.multiply();
}
