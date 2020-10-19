import { PositionalNumber } from '@calc/calc-arithmetic';

export interface Digit {
    valueInDecimal: number;
    representationInBase: string;
    base: number;
    position: number;
}

export interface Operand extends Digit{
    isCarry?: boolean;
    carrySourcePosition?: number;
    isComplementExtension?: boolean;
}

export interface PositionResult {
    valueAtPosition: Operand;
    carry: Operand[];
    operands: Operand[];
}

export interface AdditionResult {
    positionResults: PositionResult[];
    resultDigits: Operand[];
    numberResult?: PositionalNumber;
    operands: Operand[][];
}
