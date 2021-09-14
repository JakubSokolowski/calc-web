import {
    DivisionOperand,
    DivisionPositionResult,
    fromStringDirect,
    multiplyDefault,
    splitToDigitsList,
    subtractPositionalNumbers
} from '@calc/calc-arithmetic';
import { divideAtPosition, divideDigits, getDividendSlice, integerQuotient } from './division';


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

        // it('should return proper result when division has result with finite fraction and both dividend and divisor have fraction parts', () => {
        //     // given
        //     const base = 10;
        //     const dividend = fromStringDirect('1000', base).result;
        //     const divisor = fromStringDirect(' 312', base).result;
        //
        //     // when
        //     const result = divideDigits(dividend.toDigitsList(), divisor.toDigitsList());
        //
        //     // then
        //     const expected = '12.5';
        //     expect(result.numberResult.toString()).toEqual(expected);
        // });

        it('should throw error when divisor has fraction part', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('10', base).result;
            const divisor = fromStringDirect('2.5', base).result;

            // when
            expect(() => {
                divideDigits(dividend.toDigitsList(), divisor.toDigitsList())
            }).toThrow();
        });
    });
});
