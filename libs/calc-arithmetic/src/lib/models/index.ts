import { PositionalNumber } from '@calc/calc-arithmetic';

export interface Digit {
    valueInDecimal: number;
    representationInBase: string;
    base: number;
    position: number;
}

export interface AdditionOperand extends Digit{
    isCarry?: boolean;
    carrySourcePosition?: number;
    isComplementExtension?: boolean;
}

export interface PositionResult {
    valueAtPosition: AdditionOperand;
    carry: AdditionOperand[];
    operands: AdditionOperand[];
}

export interface AdditionResult {
    positionResults: PositionResult[];
    resultDigits: AdditionOperand[];
    numberResult?: PositionalNumber;
    operands: AdditionOperand[][];
}
