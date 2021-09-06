import { Digit } from '../../models';

export interface SignedDigitConverter {
    toSignedDigits(): SDGroupDigit[];
    toSignedDigitsWithDetails(): SDConversionResult;
}

export enum SignedDigitConversionType {
    Booth = 'booth',
    BoothMcSorley = 'boothMcSorley',
    BoothMcSorleyAlternative = 'boothMcSorleyAlternative',
}

export interface SDGroupDigit extends Digit {
    isPaddingDigit?: boolean;
}

export interface SDConversionGroupResult {
    input: SDGroupDigit[];
    output: SDGroupDigit[];
    value?: number;
}

export interface SDConversionResult {
    input: SDGroupDigit[];
    output: SDGroupDigit[];
    groups: SDConversionGroupResult[];
    type: SignedDigitConversionType;
}
