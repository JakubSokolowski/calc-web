import { BoothConverter } from './booth-converter';
import { SDConversionGroupResult, SDGroupDigit, SignedDigitConversionType } from './signed-digit-converter';
import { BaseDigits } from '../base-digits';
import { leastSignificantPosition } from '../digits';

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
        const extensionCount = lsp % 2 === 0 ? 1 : 2;
        if (extensionCount === 1) {
            const extension: SDGroupDigit = {
                isPaddingDigit: true,
                ...BaseDigits.getDigit(0, 2, lsp - 1),
            };
            return [...digits, extension];
        } else {
            const extension: SDGroupDigit = {
                isPaddingDigit: true,
                ...BaseDigits.getDigit(0, 2, lsp - 1),
            };
            const extension2: SDGroupDigit = {
                isPaddingDigit: true,
                ...BaseDigits.getDigit(0, 2, lsp - 2),
            };
            return [...digits, extension, extension2];
        }
    }

    protected extendIntegerPart(digits: SDGroupDigit[]): SDGroupDigit[] {
        const mspDigit = digits[0];
        const shouldExtendFront = mspDigit.position % 2 === 0;
        if (!shouldExtendFront) return digits;
        const extension: SDGroupDigit = {
            isPaddingDigit: true,
            ...BaseDigits.getDigit(this.isNegative ? 1 : 0, 2, mspDigit.position + 1),
        };

        return [extension, ...digits];
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
