import { Digit } from '../../models';

export interface SignedDigitConverter {
    toSignedDigits(): Digit[];
    toSignedDigitsWithDetails(): SDConversionResult;
}

export enum SignedDigitConversionType {
    Booth = 'booth',
    BoothMcSorley = 'boothMcSorley',
    BoothAlternative = 'boothAlternative'
}

export interface SDGroupDigit extends Digit {
  isPaddingDigit?: boolean;
}

export interface SDConversionGroupResult {
    input: SDGroupDigit[];
    output: Digit[];
}

export interface SDConversionResult {
    input: Digit[];
    output: Digit[];
    groups: SDConversionGroupResult[];
    type: SignedDigitConversionType;
}

