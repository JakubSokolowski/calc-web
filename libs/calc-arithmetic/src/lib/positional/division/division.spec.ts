import {
    DivisionOperand,
    DivisionPositionResult, DivisionResult, DivisionType,
    fromStringDirect,
    multiplyDefault, OperationType,
    splitToDigitsList,
    subtractPositionalNumbers
} from '@calc/calc-arithmetic';
import { divideAtPosition, divideDefault, divideDigits, getDividendSlice, integerQuotient } from './division';


describe('#division', () => {

    describe('#integerQuotient', () => {
        it('should return proper quotient for division', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('5462', base).result;
            const divisor = fromStringDirect('4587', base).result;

            // when
            const result = integerQuotient(dividend, divisor);

            // then
            const expected: DivisionOperand = {
                representationInBase: '1',
                valueInDecimal: 1,
                base,
                position: 0
            };

            expect(result).toEqual(expected);
        });

        it('should return 0 when divisor is greater than dividend', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('5462', base).result;
            const divisor = fromStringDirect('6789', base).result;

            // when
            const result = integerQuotient(dividend, divisor);

            // then
            const expected: DivisionOperand = {
                representationInBase: '0',
                valueInDecimal: 0,
                base,
                position: 0
            };

            expect(result).toEqual(expected);
        });
    });

    describe('#getDividendSlice', () => {
        it('should return proper slice for initial position division', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('54625', base).result;
            const divisor = fromStringDirect('4587', base).result;

            // when
            const result = getDividendSlice(dividend.toDigitsList(), divisor.toDigitsList());

            // then
            const expectedStr = '5462';
            expect(result.toString()).toEqual(expectedStr);
        });

        it('should extend previous remainder with next dividend digit', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('54625', base).result;
            const divisor = fromStringDirect('4587', base).result;
            const prev: DivisionPositionResult = {
                divisionIndex: 0,
                remainder: splitToDigitsList('875', base)
            } as DivisionPositionResult;

            // when
            const result = getDividendSlice(dividend.toDigitsList(), divisor.toDigitsList(), prev);

            // then
            const expectedStr = '8755';
            expect(result.toString()).toEqual(expectedStr);
        });

        it('should extend previous remainder with zero if all dividend digits were already used', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('54625', base).result;
            const divisor = fromStringDirect('4587', base).result;
            const prev: DivisionPositionResult = {
                divisionIndex: 4,
                remainder: splitToDigitsList('875', base)
            } as DivisionPositionResult;

            // when
            const result = getDividendSlice(dividend.toDigitsList(), divisor.toDigitsList(), prev);

            // then
            const expectedStr = '8750';
            expect(result.toString()).toEqual(expectedStr);
        });
    });

    describe('#divideAtPosition', () => {
        describe('for initial position division', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('54625', base).result;
            const divisor = fromStringDirect('4587', base).result;

            // when
            const result = divideAtPosition(dividend.toDigitsList(), divisor.toDigitsList());

            it('should return proper position result', () => {
                // then
                const expected: DivisionOperand = {
                    representationInBase: '1',
                    valueInDecimal: 1,
                    base,
                    position: 1
                };
                expect(result.valueAtPosition).toEqual(expected);
            });

            it('should return proper remainder', () => {
                // then
                const expected: DivisionOperand[] = [
                    { base: 10, position: 2, representationInBase: '8', valueInDecimal: 8 },
                    { base: 10, position: 1, representationInBase: '7', valueInDecimal: 7 },
                    { base: 10, position: 0, representationInBase: '5', valueInDecimal: 5 }
                ];
                expect(result.remainder).toEqual(expected);
            });

            it('should return proper divisionIndex', () => {
                // then
                const expected = 0;
                expect(result.divisionIndex).toEqual(expected);
            });

            it('should return proper position subtraction result', () => {
                // then
                const minuend = fromStringDirect('5462', base).result;
                const subtrahend = fromStringDirect('4587', base).result;
                const expected = subtractPositionalNumbers([minuend, subtrahend]);
                expect(result.subtractionResult).toEqual(expected);
            });


            it('should return proper position multiplication result', () => {
                // then
                const divisor = fromStringDirect('4587', base).result;
                const quotient = fromStringDirect('1', base).result;
                const expected = multiplyDefault([divisor, quotient]);
                expect(result.multiplicationResult).toEqual(expected);
            });
        });

        describe('for subsequent position division', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('54625', base).result;
            const divisor = fromStringDirect('4587', base).result;
            const initial = divideAtPosition(dividend.toDigitsList(), divisor.toDigitsList());

            // when
            const result = divideAtPosition(dividend.toDigitsList(), divisor.toDigitsList(), initial);

            it('should return proper position result', () => {
                // then
                const expected: DivisionOperand = {
                    representationInBase: '1',
                    valueInDecimal: 1,
                    base,
                    position: 0
                };
                expect(result.valueAtPosition).toEqual(expected);
            });

            it('should return proper remainder', () => {
                // then
                const expected: DivisionOperand[] = [
                    { valueInDecimal: 4, base: 10, position: 3, representationInBase: '4' },
                    { valueInDecimal: 1, base: 10, position: 2, representationInBase: '1' },
                    { valueInDecimal: 6, base: 10, position: 1, representationInBase: '6' },
                    { valueInDecimal: 8, base: 10, position: 0, representationInBase: '8' }
                ];
                expect(result.remainder).toEqual(expected);
            });

            it('should return proper divisionIndex', () => {
                // then
                const expected = 1;
                expect(result.divisionIndex).toEqual(expected);
            });

            it('should return proper position subtraction result', () => {
                // then
                const minuend = fromStringDirect('8755', base).result;
                const subtrahend = fromStringDirect('4587', base).result;
                const expected = subtractPositionalNumbers([minuend, subtrahend]);
                expect(result.subtractionResult).toEqual(expected);
            });


            it('should return proper position multiplication result', () => {
                // then
                const divisor = fromStringDirect('4587', base).result;
                const quotient = fromStringDirect('1', base).result;
                const expected = multiplyDefault([divisor, quotient]);
                expect(result.multiplicationResult).toEqual(expected);
            });
        });
    });

    describe('#divideDigits', () => {
        it('should return proper result when division has integer result', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('54625', base).result;
            const divisor = fromStringDirect('5', base).result;

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());
            // then
            const expected = '10925';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return proper result when division has result with finite fraction', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('62.5', base).result;
            const divisor = fromStringDirect('5', base).result;

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());

            // then
            const expected = '12.5';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return result with default 5 fraction precision when division has result with infinite fraction and fractionPrecision is not defined', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1000', base).result;
            const divisor = fromStringDirect(' 312', base).result;

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());

            // then
            const expected = '3.20512';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return result with given fraction precision when division has result with infinite fraction and fractionPrecision is defined', () => {
            // given
            const base = 10;
            const fractionPrecision = 2;
            const dividend = fromStringDirect('1000', base).result;
            const divisor = fromStringDirect('312', base).result;

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList(), fractionPrecision);

            // then
            const expected = '3.20';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return proper result for binary numbers with integer result', () => {
            // given
            const base = 2;
            const dividend = fromStringDirect('1100100', base).result;
            const divisor = fromStringDirect('101', base).result;

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());

            // then
            const expected = '10100';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return proper result for binary numbers with fraction result (MrK example)', () => {
            // given
            const base = 2;
            const dividend = fromStringDirect('1000101', base).result; // 69
            const divisor = fromStringDirect('101', base).result;      // 5

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());

            // then
            const expected = '1101.11001'; // 13.8
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return proper result for binary numbers with fraction result', () => {
            // given
            const base = 2;
            const dividend = fromStringDirect('11001001001.1011', base).result; // 1609.6875
            const divisor = fromStringDirect('101110', base).result;            // 46

            // when
            const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());

            // then
            const expected = '100010.11111'; // 34.9921875
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should throw error when divisor has fraction part', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('10', base).result;
            const divisor = fromStringDirect('2.5', base).result;

            // when
            expect(() => {
                divideDigits(dividend.toDigitsList(), divisor.toDigitsList());
            }).toThrow();
        });
    });

    describe('#divideDefault', () => {
        describe('when dividing numbers', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('22144', base).result;
            const divisor = fromStringDirect('64', base).result;
            let result: DivisionResult;

            beforeEach(() => {
                // when
                result = divideDefault([dividend, divisor]);
            });

            it('should return result with proper numberResult', () => {
                // then
                const expected = '346';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            it('should return result with proper operation', () => {
                // then
                const expected = OperationType.Division;
                expect(result.operation).toEqual(expected);
            });

            it('should return result with proper algorithm type', () => {
                // then
                const expected = DivisionType.Default;
                expect(result.algorithmType).toEqual(expected);
            });
        });

        it('should return proper step results', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1224', base).result;
            const divisor = fromStringDirect('12', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '102';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should return proper step results when divisor and dividend have both fraction parts', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('122.1', base).result;
            const divisor = fromStringDirect('12.1', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '10.09090';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should divide numbers when divisor has fraction part', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('62', base).result;
            const divisor = fromStringDirect('0.5', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '124';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should divide numbers when both dividend and divisor has fraction part', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('7834.123', base).result;
            const divisor = fromStringDirect('0.58644', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '13358.78009';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should divide numbers when both dividend and divisor has fraction part and are between 0 and 1', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('0.66484', base).result;
            const divisor = fromStringDirect('0.00124', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '536.16129';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should divide numbers when divisor is between 0 and 1', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('122.1', base).result;
            const divisor = fromStringDirect('0.1', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '1221';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should divide numbers when some of operands is a negative number', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('-0.66484', base).result;
            const divisor = fromStringDirect('0.00124', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '-536.16129';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should divide numbers when both of operands are negative', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('-0.66484', base).result;
            const divisor = fromStringDirect('-0.00124', base).result;

            // when
            const result = divideDefault([dividend, divisor]);

            // then
            const expected = '536.16129';
            expect(result.numberResult.toString()).toEqual(expected);
        });
    });
});
