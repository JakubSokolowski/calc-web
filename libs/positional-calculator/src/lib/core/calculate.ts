import {
    AdditionResult,
    AdditionType,
    addPositionalNumbers,
    AlgorithmType,
    BaseOperationResult,
    Operation,
    OperationAlgorithm,
    OperationType,
    PositionalNumber,
    SubtractionResult,
    SubtractionType,
    subtractPositionalNumbers
} from '@calc/calc-arithmetic';
import { buildAdditionGrid, buildSubtractionGrid, HoverOperationGrid } from '@calc/grid';


export interface OperationParams<T extends AlgorithmType> {
    base: number;
    operands: PositionalNumber[];
    operation: Operation;
    algorithm: OperationAlgorithm<T>;
}


export interface GridResult<T extends BaseOperationResult = BaseOperationResult> {
    result: PositionalNumber;
    grid: HoverOperationGrid;
    operationResult?: BaseOperationResult;
}


export function calculate<T extends AlgorithmType, D extends BaseOperationResult>(params: OperationParams<T>): GridResult<D> {
    switch (params.operation.type) {
        case OperationType.Addition:
            return handleAdd(params as OperationParams<AdditionType>);
        case OperationType.Subtraction:
            return handleSubtract(params as OperationParams<SubtractionType>);
        case OperationType.Multiplication:
            break;
        case OperationType.Division:
            break;
        default:
            throw new Error('What?');
    }
}

function handleAdd(params: OperationParams<AdditionType>): GridResult<AdditionResult> {
    switch (params.algorithm.type) {
        case AdditionType.Default: {
            const result = addPositionalNumbers(params.operands);
            const grid = buildAdditionGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        default:
            throw 'XD';

    }
}

function handleSubtract(params: OperationParams<SubtractionType>): GridResult<SubtractionResult> {
    switch (params.algorithm.type) {
        case SubtractionType.Default: {
            const result = subtractPositionalNumbers(params.operands);
            const grid = buildSubtractionGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        default:
            throw 'XD';
    }
}

