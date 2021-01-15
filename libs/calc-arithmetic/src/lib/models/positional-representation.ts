import { Digit } from './index';

export interface PositionalRepresentation {
    base(): number;
    asDigits(withExtension: boolean): Digit[];
    fractionPartStr(): string;
    integerPartStr(withExtension: boolean): string;
    fractionPartDigits(): Digit[];
    integerPartDigits(): Digit[];
    mostSignificantPosition(withExtension: boolean): number;
    leastSignificantPosition(): number;
    numDigits(): number;
    numIntegerPartDigits(withExtension: boolean): number;
    numFractionPartDigits(): number;
    isNegative(): boolean;
    toString(withExtension: boolean): string;
}
