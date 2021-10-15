import {
    AdditionResult,
    AdditionType,
    addPositionalNumbers,
    AlgorithmType,
    divideDefault,
    DivisionResult,
    DivisionType,
    MultiplicationResult,
    MultiplicationType,
    multiplyBooth,
    multiplyBoothMcSorley,
    multiplyBoothMcSorleyAlt,
    multiplyDefault,
    multiplyWithExtensions,
    multiplyWithoutExtension,
    OperationType,
    PositionalNumber,
    SubtractionResult,
    SubtractionType,
    subtractPositionalNumbers
} from '@calc/calc-arithmetic';
import { buildAdditionGrid, buildSubtractionGrid, HoverOperationGrid } from '@calc/grid';
import { buildMultiplicationGrid } from '../multiplication/multiplication-grid/multiplication-grid';
import { buildDivisionGrid } from '../division/division-grid/division-grid';

export interface OperationParams<T = PositionalNumber> {
    base: number;
    operands: T[];
    operation: OperationType;
    algorithm: AlgorithmType;
}

export interface GridResult<T = any> {
    result: PositionalNumber;
    grid: HoverOperationGrid;
    operationResult?: any;
}

export function calculate<D = AdditionResult | SubtractionResult | MultiplicationResult | DivisionResult>(params: OperationParams): GridResult<D> {
    switch (params.operation) {
        case OperationType.Addition:
            return handleAdd(params);
        case OperationType.Subtraction:
            return handleSubtract(params);
        case OperationType.Multiplication:
            return handleMultiply(
                params
            );
        case OperationType.Division:
            return handleDivide(
                params
            );
        default:
            throw new Error(
                `Operation type: ${params.operation} not supported`
            );
    }
}

function handleAdd(
    params: OperationParams
): GridResult<AdditionResult> {
    switch (params.algorithm) {
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
            throw new Error(
                `Addition algorithm type: ${params.algorithm} not supported`
            );
    }
}

function handleSubtract(
    params: OperationParams
): GridResult<SubtractionResult> {
    switch (params.algorithm) {
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
            throw new Error(
                `Subtraction algorithm type: ${params.algorithm} not supported`
            );
    }
}

function handleMultiply(
    params: OperationParams
): GridResult<MultiplicationResult> {
    switch (params.algorithm) {
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
        case MultiplicationType.WithoutExtension: {
            const result = multiplyWithoutExtension(params.operands);
            const grid = buildMultiplicationGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        case MultiplicationType.Booth: {
            const result = multiplyBooth(params.operands);
            const grid = buildMultiplicationGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        case MultiplicationType.BoothMcSorley: {
            const result = multiplyBoothMcSorley(params.operands);
            const grid = buildMultiplicationGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        case MultiplicationType.BoothMcSorleyAlt: {
            const result = multiplyBoothMcSorleyAlt(params.operands);
            const grid = buildMultiplicationGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        default:
            throw new Error(
                `Subtraction algorithm type: ${params.algorithm} not supported`
            );
    }
}


function handleDivide(params: OperationParams): GridResult<DivisionResult> {
    switch (params.algorithm) {
        case DivisionType.Default: {
            const result = divideDefault(params.operands);
            const grid = buildDivisionGrid(result);
            return {
                grid,
                result: result.numberResult,
                operationResult: result
            };
        }
        default:
            throw new Error(
                `Division algorithm type: ${params.algorithm} not supported`
            );
    }
}
