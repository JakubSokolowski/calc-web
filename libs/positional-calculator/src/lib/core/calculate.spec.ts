import { calculate, OperationParams } from './calculate';
import {
    AdditionType,
    AlgorithmType,
    fromNumber, MultiplicationType,
    Operation,
    OperationAlgorithm,
    OperationType, SubtractionType
} from '@calc/calc-arithmetic';


describe('calculate', () => {
    const base = 10;
    const operands = [10, 5].map((op) => fromNumber(op, base).result);

    const baseParams: OperationParams<AlgorithmType> = {
        operation: {
            type: OperationType.Addition,
            maxOperands: 10,
            minOperands: 1,
            tKey: 'operations.addition.title'
        },
        base: 10,
        operands: [...operands],
        algorithm: {
            type: AdditionType.Default,
            tKey: 'operations.addition.default'
        }
    };

    describe('when operation is not supported', () => {
        it('should throw error', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: 'SomeType' as OperationType,
                tKey: ''
            };

            const params = { ...baseParams, operation: { ...operation } } as OperationParams<AlgorithmType>;

            // then
            expect(() => {
                // when
                calculate(params);
            }).toThrow();
        });
    });

    describe('when operation is addition', () => {
        it('should return proper result when addition type is default', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: OperationType.Addition,
                tKey: ''
            };

            const algorithm: OperationAlgorithm<AdditionType> = {
                type: AdditionType.Default,
                tKey: ''
            };

            const params: OperationParams<AlgorithmType> = {
                ...baseParams,
                operation: { ...operation },
                algorithm: { ...algorithm }
            };

            // when
            const {result} = calculate(params);

            // then
            const expected = '15';
            expect(result.valueInBase).toEqual(expected);
        });

        it('should throw error when addition type is not supported', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: OperationType.Addition,
                tKey: ''
            };

            const algorithm: OperationAlgorithm<AdditionType> = {
                type: 'NotSupported' as AdditionType,
                tKey: ''
            };

            const params: OperationParams<AlgorithmType> = {
                ...baseParams,
                operation: { ...operation },
                algorithm: { ...algorithm }
            };

            // when
            expect(() => {
                calculate(params);
            }).toThrow();
        });
    });

    describe('when operation is subtraction', () => {
        it('should return proper result when addition type is default', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: OperationType.Subtraction,
                tKey: ''
            };

            const algorithm: OperationAlgorithm<SubtractionType> = {
                type: SubtractionType.Default,
                tKey: ''
            };

            const params: OperationParams<AlgorithmType> = {
                ...baseParams,
                operation: { ...operation },
                algorithm: { ...algorithm }
            };

            // when
            const {result} = calculate(params);

            // then
            const expected = '5';
            expect(result.valueInBase).toEqual(expected);
        });

        it('should throw error when addition type is not supported', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: OperationType.Subtraction,
                tKey: ''
            };

            const algorithm: OperationAlgorithm<SubtractionType> = {
                type: 'NotSupported' as SubtractionType,
                tKey: ''
            };

            const params: OperationParams<AlgorithmType> = {
                ...baseParams,
                operation: { ...operation },
                algorithm: { ...algorithm }
            };

            // when
            expect(() => {
                calculate(params);
            }).toThrow();
        });
    });

    describe('when operation is multiplication', () => {
        it('should return proper result when multiplication type is default', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: OperationType.Multiplication,
                tKey: ''
            };

            const algorithm: OperationAlgorithm<MultiplicationType> = {
                type: MultiplicationType.Default,
                tKey: ''
            };

            const params: OperationParams<AlgorithmType> = {
                ...baseParams,
                operation: { ...operation },
                algorithm: { ...algorithm }
            };

            // when
            const {result} = calculate(params);

            // then
            const expected = '50';
            expect(result.valueInBase).toEqual(expected);
        });

        it('should throw error when multiplication type is not supported', () => {
            // given
            const operation: Operation = {
                maxOperands: 10,
                minOperands: 2,
                type: OperationType.Multiplication,
                tKey: ''
            };

            const algorithm: OperationAlgorithm<MultiplicationType> = {
                type: 'NotSupported' as MultiplicationType,
                tKey: ''
            };

            const params: OperationParams<AlgorithmType> = {
                ...baseParams,
                operation: { ...operation },
                algorithm: { ...algorithm }
            };

            // when
            expect(() => {
                calculate(params);
            }).toThrow();
        });
    });

});
