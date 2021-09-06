import { BoothMcSorleyConverter } from './booth-mcsorley-converter';
import { leastSignificantPosition, mostSignificantPosition } from '../digits';
import { SDGroupDigit, SignedDigitConversionType } from './signed-digit-converter';


export class BoothMcSorleyAltConverter extends BoothMcSorleyConverter {
    protected get conversionType(): SignedDigitConversionType {
        return SignedDigitConversionType.BoothMcSorleyAlternative;
    }

    protected extendFraction(digits: SDGroupDigit[]): SDGroupDigit[] {
        const lsp = leastSignificantPosition(digits);
        const numExtensions = lsp % 2 === 0 ? 2 : 1;
        return [...digits, ...this.getFractionExtensionDigits(lsp, numExtensions)];
    }

    protected extendIntegerPart(digits: SDGroupDigit[]): SDGroupDigit[] {
        const msp = mostSignificantPosition(digits);
        const numExtensions = msp % 2 === 0 ? 0 : 1;
        return [...this.getIntegerExtensionDigits(msp, numExtensions), ...digits];
    }

}
