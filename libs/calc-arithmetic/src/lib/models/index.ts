import { PositionalNumber } from '../positional/representations';
import { OperationType } from './operation';
import { AlgorithmType } from './operation-algorithm';

export interface Digit {
    valueInDecimal: number;
    representationInBase: string;
    base: number;
    position: number;
    isComplementExtension?: boolean;
}

export interface PositionResult<T extends Digit> {
    valueAtPosition: T;
    operands: T[];
}

export interface OperationResult<D extends Digit, T extends PositionResult<D>> {
    stepResults: T[];
    resultDigits: D[];
    numberResult?: PositionalNumber;
    numberOperands: PositionalNumber[];
    operands: D[][];
    operation: OperationType;
    algorithmType: AlgorithmType;
}

export type BaseOperationResult = OperationResult<Digit, PositionResult<Digit>>;

export interface AdditionOperand extends Digit {
    isCarry?: boolean;
    carrySourcePosition?: number;
}

export interface AdditionPositionResult extends PositionResult<AdditionOperand> {
    carry: AdditionOperand[];
}

export type AdditionResult = OperationResult<AdditionOperand, AdditionPositionResult>;

export interface Borrow {
    amount: number;
    fromPosition: number;
    sourcePosition: number;
}

export interface BorrowInfo {
    totalAmount: number;
    borrows: Borrow[];
}

export interface SubtractionOperand extends Digit {
    borrowChain?: Digit[];
}

export type MultiplicationOperand = AdditionOperand

export interface SubtractionPositionResult extends PositionResult<SubtractionOperand> {
    borrow?: Borrow;
}

export interface MultiplicationPositionResult extends PositionResult<MultiplicationOperand> {
    carry?: MultiplicationOperand;
    shiftedPosition?: number;
}

export interface MultiplicationRowResult extends PositionResult<MultiplicationOperand> {
    multiplicands: MultiplicationOperand[];
    multiplier: MultiplicationOperand;
    rowPositionResults: MultiplicationPositionResult[];
    resultDigits: MultiplicationOperand[];
}

export type SubtractionResult = OperationResult<SubtractionOperand, SubtractionPositionResult>;

export interface MultiplicationResult extends OperationResult<MultiplicationOperand, MultiplicationPositionResult> {
    stepResults: MultiplicationRowResult[];
    addition: AdditionResult;
}


export function isSubtractionOperand(obj: any): obj is SubtractionOperand {
    return !!obj.borrowChain;
}

