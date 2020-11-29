import { OperationType } from './operation';

export enum AdditionType {
    Default = 'Default'
}

export enum SubtractionType {
    Default = 'Default'
}

export type AlgorithmType = AdditionType | SubtractionType

export interface OperationAlgorithm<T extends AlgorithmType = AlgorithmType> {
    type: T;
    allowedBases?: number[];
}

export type AlgorithmOperationMap = Record<OperationType, OperationAlgorithm[]>

export const additionAlgorithms: OperationAlgorithm<AdditionType>[] = [
    {
        type: AdditionType.Default
    }
];

export const subtractionAlgorithms: OperationAlgorithm<SubtractionType>[] = [
    {
        type: SubtractionType.Default
    },
];

export const algorithmMap: AlgorithmOperationMap = {
    [OperationType.Addition]: additionAlgorithms,
    [OperationType.Subtraction]: subtractionAlgorithms,
    [OperationType.Multiplication]: [],
    [OperationType.Division]: [],
};
