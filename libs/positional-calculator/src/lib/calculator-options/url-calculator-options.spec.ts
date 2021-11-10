import { toUrlSearchParams, urlParamsToCalculatorOptionsValue } from './url-calculator-options';
import { CalculatorOptionsValue } from './calculator-options-value';
import { DivisionType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import { divisionAlgorithms } from './algorithms';
import { OperationParams } from '@calc/positional-calculator';


describe('#urlParamsToCalculatorOptionsValue', () => {

    it('should return undefined when some arg is not present in url params', () => {
        // given
        const params = new URLSearchParams('operation=multiplication&algorithm=default&base=2');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when base param is not valid', () => {
        // given
        const params = new URLSearchParams('operation=multiplication&algorithm=default&base=999&op=101&op=1011');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when precision param is present but not valid', () => {
        // given
        const params = new URLSearchParams('operation=division&algorithm=default&base=2&op=101&op=1011&precision=20');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });


    it('should return undefined when operation param is not valid', () => {
        // given
        const params = new URLSearchParams('operation=integral&algorithm=default&base=2&op=101&op=1011');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when algorithm param is not valid for given operation', () => {
        // given
        const params = new URLSearchParams('operation=addition&algorithm=withextension&base=2&op=101&op=1011');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when there is too few op params for given operation', () => {
        // given
        const params = new URLSearchParams('operation=multiplication&algorithm=withextension&base=2&op=101');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when there is too many op params for given operation', () => {
        // given
        const params = new URLSearchParams('operation=multiplication&algorithm=withextension&base=2&op=101&op=11&op=101');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when some operand representation is not valid for given base', () => {
        // given
        const params = new URLSearchParams('operation=multiplication&algorithm=withextension&base=2&op=101&op=99');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return options obj when all params are valid', () => {
        // given
        const params = new URLSearchParams('operation=multiplication&algorithm=withextension&base=2&op=101&op=11');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        const expected: CalculatorOptionsValue = {
            algorithm: {
                tKey: 'operations.multiplication.withExtension',
                type: MultiplicationType.WithExtension
            },
            base: 2,
            operands: [
                { dndKey: '0', representation: '101', valid: true },
                { dndKey: '1', representation: '11', valid: true }
            ],
            operation: {
                maxOperands: 2,
                minOperands: 2,
                tKey: 'operations.multiplication.title',
                type: OperationType.Multiplication
            }
        };
        expect(result).toEqual(expected);
    });

    it('should return options obj with precision when all params are valid', () => {
        // given
        const params = new URLSearchParams('operation=division&algorithm=default&base=2&op=101&op=11&precision=5');

        // when
        const result = urlParamsToCalculatorOptionsValue(params);

        // when
        const expected: CalculatorOptionsValue = {
            algorithm: divisionAlgorithms[0],
            base: 2,
            operands: [
                { dndKey: '0', representation: '101', valid: true },
                { dndKey: '1', representation: '11', valid: true }
            ],
            operation: {
                maxOperands: 2,
                minOperands: 2,
                tKey: 'operations.division.title',
                type: OperationType.Division
            },
            precision: 5,
        };
        expect(result).toEqual(expected);
    });

    describe('#toUrlSearchParams', () => {
        it('should return search params str for operation obj with precision', () => {
            // given
            const operation: OperationParams<string> = {
                algorithm: DivisionType.Default,
                base: 2,
                operands: [
                    '101', '11'
                ],
                operation: OperationType.Division,
                precision: 5,
            };

            // when
            const search = toUrlSearchParams(operation);

            // then
            const expected = "?operation=division&algorithm=default&base=2&op=101&op=11&precision=5";
            expect(search).toEqual(expected);
        });

        it('should return search params str for operation obj without precision', () => {
            // given
            const operation: OperationParams<string> = {
                algorithm: MultiplicationType.Default,
                base: 2,
                operands: [
                    '101', '11'
                ],
                operation: OperationType.Multiplication
            };

            // when
            const search = toUrlSearchParams(operation);

            // then
            const expected = "?operation=multiplication&algorithm=default&base=2&op=101&op=11";
            expect(search).toEqual(expected);
        });
    })
});
