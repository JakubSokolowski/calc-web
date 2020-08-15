import { PositionalNumber } from '@calc/calc-arithmetic';

export interface Digit {
    valueInDecimal: number;
    valueInBase: string;
    base: number;
    position: number;
}

export interface Operand extends Digit{
    isCarry?: boolean;
}

export interface PositionResult {
    valueAtPosition: Digit;
    carry: Digit[];
    operands: Operand[];
}

export interface AdditionResult {
    positionResults: PositionResult[];
    resultDigits: Digit[];
    numberResult?: PositionalNumber;
    operands: Operand[][];
}
