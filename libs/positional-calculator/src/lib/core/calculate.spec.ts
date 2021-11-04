import { calculate, OperationParams } from './calculate';
import {
    AdditionType,
    fromNumber,
    MultiplicationType,
    OperationType,
    SubtractionType
} from '@calc/calc-arithmetic';


describe('calculate', () => {
    const base = 10;
    const operands = [10, 5].map((op) => fromNumber(op, base));

    const baseParams: OperationParams = {
        operation:OperationType.Addition,
        base: 10,
        operands: [...operands],
        algorithm: AdditionType.Default
    };

    describe('when operation is not supported', () => {
        it('should throw error', () => {
            // given
            const operation: OperationType ='SomeType' as OperationType;
            const params = { ...baseParams, operation };

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
            const operation = OperationType.Addition;
            const algorithm = AdditionType.Default;

            const params: OperationParams = {
                ...baseParams,
                operation,
                algorithm
            };

            // when
            const {result} = calculate(params);

            // then
            const expected = '15';
            expect(result.valueInBase).toEqual(expected);
        });

        it('should throw error when addition type is not supported', () => {
            // given
            const operation = OperationType.Addition;
            const algorithm = 'NotSupported' as AdditionType;

            const params: OperationParams = {
                ...baseParams,
                operation,
                algorithm
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
            const operation = OperationType.Subtraction;
            const algorithm = SubtractionType.Default;

            const params: OperationParams = {
                ...baseParams,
                operation,
                algorithm
            };

            // when
            const {result} = calculate(params);

            // then
            const expected = '5';
            expect(result.valueInBase).toEqual(expected);
        });

        it('should throw error when addition type is not supported', () => {
            // given
            const operation = OperationType.Subtraction;
            const algorithm = 'NotSupported' as SubtractionType;

            const params: OperationParams = {
                ...baseParams,
                operation,
                algorithm
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
            const operation = OperationType.Multiplication;
            const algorithm = MultiplicationType.Default;

            const params: OperationParams = {
                ...baseParams,
                operation,
                algorithm
            };

            // when
            const {result} = calculate(params);

            // then
            const expected = '50';
            expect(result.valueInBase).toEqual(expected);
        });

        it('should throw error when multiplication type is not supported', () => {
            // given
            const operation = OperationType.Multiplication;
            const algorithm = "NotSupported" as MultiplicationType;

            const params: OperationParams = {
                ...baseParams,
                operation,
                algorithm
            };

            // when
            expect(() => {
                calculate(params);
            }).toThrow();
        });
    });

});
