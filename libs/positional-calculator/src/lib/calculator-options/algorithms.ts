import {
    AdditionType,
    AlgorithmOperationMap,
    DivisionType,
    MultiplicationType,
    OperationAlgorithm,
    OperationType,
    SubtractionType
} from '@calc/calc-arithmetic';
import { isDivisorZero } from '../validators/validators';

export const additionAlgorithms: OperationAlgorithm<AdditionType>[] = [
    {
        type: AdditionType.Default,
        tKey: 'operations.addition.default'
    }
];
export const subtractionAlgorithms: OperationAlgorithm<SubtractionType>[] = [
    {
        type: SubtractionType.Default,
        tKey: 'operations.subtraction.default'
    }
];
export const multiplicationAlgorithms: OperationAlgorithm<MultiplicationType>[] = [
    {
        type: MultiplicationType.Default,
        tKey: 'operations.multiplication.default'
    },
    {
        type: MultiplicationType.WithExtension,
        tKey: 'operations.multiplication.withExtension'
    },
    {
        type: MultiplicationType.WithoutExtension,
        tKey: 'operations.multiplication.withoutExtension'
    },
    {
        type: MultiplicationType.Booth,
        tKey: 'operations.multiplication.booth',
        allowedBases: [2]
    },
    {
        type: MultiplicationType.BoothMcSorley,
        tKey: 'operations.multiplication.boothMcSorley',
        allowedBases: [2]
    },
    {
        type: MultiplicationType.BoothMcSorleyAlt,
        tKey: 'operations.multiplication.boothMcSorleyAlt',
        allowedBases: [2]
    }
];
export const divisionAlgorithms: OperationAlgorithm<DivisionType>[] = [
    {
        type: DivisionType.Default,
        tKey: 'operations.division.default',
        operandValidators: [isDivisorZero]
    }
];
export const algorithmMap: AlgorithmOperationMap = {
    [OperationType.Addition]: additionAlgorithms,
    [OperationType.Subtraction]: subtractionAlgorithms,
    [OperationType.Multiplication]: multiplicationAlgorithms,
    [OperationType.Division]: divisionAlgorithms
};
