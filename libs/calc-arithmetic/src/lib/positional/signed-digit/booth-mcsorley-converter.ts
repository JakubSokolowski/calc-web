import { BoothConverter } from './booth-converter';
import { SDConversionGroupResult, SDGroupDigit, SignedDigitConversionType } from './signed-digit-converter';
import { BaseDigits } from '../base-digits';
import { leastSignificantPosition, mostSignificantPosition } from '../digits';
import { nNext, nPrev } from '@calc/utils';

export class BoothMcSorleyConverter extends BoothConverter {
    protected get groupSize(): number {
        return 3;
    }

    protected get conversionType(): SignedDigitConversionType {
        return SignedDigitConversionType.BoothMcSorley;
    }

    protected extend(): SDGroupDigit[] {
        const extendFraction = this.extendFraction(this.digits);
        return this.extendIntegerPart(extendFraction);
    }

    protected extendFraction(digits: SDGroupDigit[]): SDGroupDigit[] {
        const lsp = leastSignificantPosition(digits);
        const numExtensions = lsp % 2 === 0 ? 1 : 2;
        return [...digits, ...this.getFractionExtensionDigits(lsp, numExtensions)];
    }

    protected getFractionExtensionDigits(lsp: number, numExtensions: number): SDGroupDigit[] {
        return nPrev(lsp, numExtensions).map((position) => ({
            isPaddingDigit: true,
            ...BaseDigits.getDigit(0, 2, position)
        }));
    }

    protected extendIntegerPart(digits: SDGroupDigit[]): SDGroupDigit[] {
        const msp = mostSignificantPosition(digits);
        const numExtensions = msp % 2 === 0 ? 1 : 0;
        return [...this.getIntegerExtensionDigits(msp, numExtensions), ...digits];
    }

    protected getIntegerExtensionDigits(msp: number, numExtensions: number): SDGroupDigit[] {
        return nNext(msp, numExtensions).map((position) => ({
            isPaddingDigit: true,
            ...BaseDigits.getDigit(this.isNegative ? 1 : 0, 2, position)
        }))
    }

    protected createSdDigit(input: SDGroupDigit[]): SDConversionGroupResult {
        const [x2, x1, x0] = input;
        const value = -2 * x2.valueInDecimal + x1.valueInDecimal + x0.valueInDecimal;
        const [currValue, prevValue] = this.splitToPositionValues(value);

        const currDigit: SDGroupDigit = {
            base: 2,
            valueInDecimal: currValue,
            representationInBase: currValue.toString(),
            position: x2.position,
            isPaddingDigit: x2.isPaddingDigit,
        };

        const prevDigit: SDGroupDigit = {
            base: 2,
            valueInDecimal: prevValue,
            representationInBase: prevValue.toString(),
            position: x1.position,
            isPaddingDigit: x1.isPaddingDigit,
        };

        return { input, output: [currDigit, prevDigit], value };
    }

    protected splitToPositionValues(result: number): [number, number] {
        switch (result) {
            case -2:
                return [-1, 0];
            case -1:
                return [0, -1];
            case 0:
                return [0, 0];
            case 1:
                return [0, 1];
            case 2:
                return [1, 0];
        }
    }
}
