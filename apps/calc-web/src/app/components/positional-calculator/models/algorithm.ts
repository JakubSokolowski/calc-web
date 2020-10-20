import { ExtendedOption } from '@calc/ui';
import { OperationType } from './operation';

export enum AdditionType {
    Default = 'Default'
}

export enum SubtractionType {
    Default = 'Default'
}

export type AlgorithmType = AdditionType | SubtractionType

export interface Algorithm<T extends AlgorithmType> extends ExtendedOption {
    type: T;
    allowedBases?: number[];
}

export type AlgorithmOperationMap = Record<OperationType, Algorithm<AlgorithmType>[]>

export const additionAlgorithms: Algorithm<AdditionType>[] = [
    {
        type: AdditionType.Default
    }
];

export const subtractionAlgorithms: Algorithm<SubtractionType>[] = [
    {
        type: SubtractionType.Default
    }
];

export const algorithmMap: AlgorithmOperationMap = {
    [OperationType.Addition]: additionAlgorithms,
    [OperationType.Subtraction]: subtractionAlgorithms,
    [OperationType.Multiplication]: [],
    [OperationType.Division]: [],
};
