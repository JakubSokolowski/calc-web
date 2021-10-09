import { OperationType } from './operation';
import { OperandValidator } from '../positional/validators';

export enum AdditionType {
    Default = 'Default',
}

export enum SubtractionType {
    Default = 'Default',
}

export enum MultiplicationType {
    Default = 'Default',
    WithExtension = 'WithExtension',
    WithoutExtension = 'WithoutExtension',
    Booth = 'Booth',
    BoothMcSorley = 'BoothMcSorley',
    BoothMcSorleyAlt = 'BoothMcSorleyAlt',
}

export enum DivisionType {
    Default = 'Default'
}

export type AlgorithmType = AdditionType | SubtractionType | MultiplicationType | DivisionType;

export interface OperationAlgorithm<T extends AlgorithmType = AlgorithmType> {
    type: T;
    tKey: string;
    allowedBases?: number[];
    operandValidators?: OperandValidator[];
}

export type AlgorithmOperationMap = Record<OperationType, OperationAlgorithm[]>;

