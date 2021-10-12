import { Digit, PositionalNumber } from '../..';

export interface ComplementConversionResult {
    inputNumber: PositionalNumber;
    inputDigits: Digit[];
    minuendDigits: Digit[];
    afterSubtraction: Digit[];
    complementDigits: Digit[];
    one?: Digit;
}
