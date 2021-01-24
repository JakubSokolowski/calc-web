import {
    AdditionResult,
    AdditionType,
    addPositionalNumbers,
    AlgorithmType,
    BaseOperationResult,
    MultiplicationResult,
    MultiplicationType,
    Operation,
    OperationAlgorithm,
    OperationType,
    PositionalNumber,
    SubtractionResult,
    SubtractionType,
    subtractPositionalNumbers,
    multiplyDefault,
    multiplyWithExtensions
} from '@calc/calc-arithmetic';
import { buildAdditionGrid, buildSubtractionGrid, HoverOperationGrid } from '@calc/grid';
import { buildMultiplicationGrid } from '../multiplication/multiplication-grid/multiplication-grid';


export interface OperationParams<T extends AlgorithmType> {
    base: number;
    operands: PositionalNumber[];
    operation: Operation;
    algorithm: OperationAlgorithm<T>;
}


export interface GridResult<T = any> {
    result: PositionalNumber;
    grid: HoverOperationGrid;
    operationResult?: any;
}


export function calculate<T extends AlgorithmType, D extends BaseOperationResult>(params: OperationParams<T>): GridResult<D> {
    switch (params.operation.type) {
        case OperationType.Addition:
            return handleAdd(params as OperationParams<AdditionType>);
        case OperationType.Subtraction:
            return handleSubtract(params as OperationParams<SubtractionType>);
        case OperationType.Multiplication:
            return handleMultiply(params as OperationParams<MultiplicationType>);
        default:
            throw new Error(`Operation type: ${params.operation.type} not supported`);
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
            throw new Error(`Addition algorithm type: ${params.algorithm.type} not supported`);

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
            throw new Error(`Subtraction algorithm type: ${params.algorithm.type} not supported`);
    }
}

function handleMultiply(params: OperationParams<MultiplicationType>): GridResult<MultiplicationResult> {
    switch (params.algorithm.type) {
        case MultiplicationType.Default: {
            const result = multiplyDefault(params.operands);
            const grid = buildMultiplicationGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        case MultiplicationType.WithExtension: {
            const result = multiplyWithExtensions(params.operands);
            const grid = buildMultiplicationGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        default:
            throw new Error(`Subtraction algorithm type: ${params.algorithm.type} not supported`);
    }
}


