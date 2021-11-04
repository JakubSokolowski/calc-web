import { Digit } from './index';

export interface PositionalRepresentation {
    base(): number;
    toDigits(withExtension: boolean): Digit[];
    fractionPartStr(): string;
    integerPartStr(withExtension: boolean): string;
    fractionPartDigits(): Digit[];
    integerPartDigits(): Digit[];
    digitAtIndex(index: number): Digit;
    digitAtPosition(position: number): Digit;
    msp(withExtension: boolean): number;
    lsp(): number;
    numDigits(): number;
    numIntegerPartDigits(withExtension: boolean): number;
    numFractionPartDigits(): number;
    isNegative(): boolean;
    toString(withExtension: boolean): string;
}
