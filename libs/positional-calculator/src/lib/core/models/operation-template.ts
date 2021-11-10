import { AlgorithmType, OperationType } from '@calc/calc-arithmetic';

export interface OperationTemplate<T extends AlgorithmType> {
    base: number;
    operands: string[];
    precision?: number;
    operation: OperationType;
    algorithm: AlgorithmType;
}
