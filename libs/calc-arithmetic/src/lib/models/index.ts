import { PositionalNumber } from '../positional/positional-number';
import { OperationType } from './operation';
import { AlgorithmType } from './operation-algorithm';
import { SDConversionResult } from '../positional/signed-digit/signed-digit-converter';

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
    decimalSum: number;
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
    decimalProduct: number;
    carry?: MultiplicationOperand;
    shiftedPosition?: number;
}

export interface MultiplicationRowResult extends PositionResult<MultiplicationOperand> {
    multiplicands: MultiplicationOperand[];
    multiplier: MultiplicationOperand;
    rowPositionResults: MultiplicationPositionResult[];
    resultDigits: MultiplicationOperand[];
    decimalProduct: number;
}

export type SubtractionResult = OperationResult<SubtractionOperand, SubtractionPositionResult>;

export interface MultiplicationResult extends OperationResult<MultiplicationOperand, MultiplicationPositionResult> {
    stepResults: MultiplicationRowResult[];
    addition: AdditionResult;
    multiplicandComplement?: PositionalNumber;
    sdConversion?: SDConversionResult;
    lastMultiplierDigit?: MultiplicationOperand;
}

export type DivisionOperand = AdditionOperand;


export interface DivisionPositionResult extends PositionResult<DivisionOperand> {
    remainder: DivisionOperand[];
    remainderDecimal: number;
    dividendSlice: DivisionOperand[];
    subtractionResult: SubtractionResult;
    multiplicationResult: MultiplicationResult;
    divisionIndex: number;
}

export interface DivisionResult extends OperationResult<DivisionOperand, DivisionPositionResult>{
    dividendComplement?: PositionalNumber;
}


export function isSubtractionOperand(obj: any): obj is SubtractionOperand {
    return !!obj.borrowChain;
}

