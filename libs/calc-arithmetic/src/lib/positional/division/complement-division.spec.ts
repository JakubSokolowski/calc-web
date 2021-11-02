import { DivisionOperand, fromStringDirect } from '@calc/calc-arithmetic';
import { adjustInitialPosition, divideComplement, divideRestOfDigits } from './complement-division';

describe('complement-division', () => {
    describe('#divideComplement', () => {
        it('should return proper step results when divisor and dividend have both fraction parts', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('(9)54625', base).result;
            const divisor = fromStringDirect('(0)4587', base).result;

            // when
            const result = divideComplement([dividend, divisor]);

            // then
            const expectedComplement = '(9)9.01079';
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });
    });

    describe('#adjustInitialPosition', () => {
        // given
        const base = 10;
        const dividend = fromStringDirect('(9)54625', base).result.complement.asDigits();
        const divisor = fromStringDirect('(0)4587', base).result.complement.asDigits();

        it('should return result with proper shifted divisor', () => {
            // when
            const result = adjustInitialPosition(dividend, divisor);

            // then
            const expected: DivisionOperand[] = [
                {
                    position: 4,
                    base: 10,
                    valueInDecimal: 0,
                    isComplementExtension: true,
                    representationInBase: '(0)'
                },
                {
                    valueInDecimal: 4,
                    base: 10,
                    position: 3,
                    representationInBase: '4'
                },
                {
                    valueInDecimal: 5,
                    base: 10,
                    position: 2,
                    representationInBase: '5'
                },
                {
                    valueInDecimal: 8,
                    base: 10,
                    position: 1,
                    representationInBase: '8'
                },
                {
                    valueInDecimal: 7,
                    base: 10,
                    position: 0,
                    representationInBase: '7'
                }
            ];
            expect(result.shiftedDivisor).toEqual(expected);
        });

        it('should return result with proper number of shifted positions', () => {
            // when
            const result = adjustInitialPosition(dividend, divisor);

            // then
            const expected = 1;
            expect(result.positionShift).toEqual(expected);
        });

        it('should return result with proper dividend complement', () => {
            // when
            const result = adjustInitialPosition(dividend, divisor);

            // then
            const expected = '(0)45375';
            expect(result.dividendComplement.toString()).toEqual(expected);
        });

        it('should return result with proper dividend slice', () => {
            // when
            const result = adjustInitialPosition(dividend, divisor);

            // then
            const expected: DivisionOperand[] = [
                {
                    position: 4,
                    base: 10,
                    valueInDecimal: 9,
                    isComplementExtension: true,
                    representationInBase: '(9)'
                },
                {
                    valueInDecimal: 5,
                    base: 10,
                    position: 3,
                    representationInBase: '5'
                },
                {
                    valueInDecimal: 4,
                    base: 10,
                    position: 2,
                    representationInBase: '4'
                },
                {
                    valueInDecimal: 6,
                    base: 10,
                    position: 1,
                    representationInBase: '6'
                },
                {
                    valueInDecimal: 2,
                    base: 10,
                    position: 0,
                    representationInBase: '2'
                }
            ];
            expect(result.dividendSlice).toEqual(expected);
        });

        it('should return result with proper next dividend slice', () => {
            // when
            const result = adjustInitialPosition(dividend, divisor);

            // then
            const expected: DivisionOperand[] =   [
                {
                    base: 10,
                    representationInBase: '4',
                    valueInDecimal: 4,
                    position: 2
                },
                {
                    base: 10,
                    representationInBase: '9',
                    valueInDecimal: 9,
                    position: 1
                },
                {
                    position: 0,
                    base: 10,
                    valueInDecimal: 5,
                    isComplementExtension: undefined,
                    representationInBase: '5'
                }
            ];
            expect(result.nextDividendSlice).toEqual(expected);
        });

        // it('should return proper step results when divisor and dividend have both fraction parts', () => {
        //     // given
        //     const base = 10;
        //     const dividend = fromStringDirect('(9)54625', base).result.complement.asDigits();
        //     const divisor = fromStringDirect('(0)4587', base).result.complement.asDigits();
        //
        //     // when
        //     const result = adjustInitialPosition(dividend, divisor);
        //     const [dividendSlice, shiftedDivisor] = result.sum.operands;
        //
        //     // then
        //     const expectedShiftedDivisor = '(0)4587';
        //     const expectedDividendSlice = '(9)5462';
        //     const expectedSumResult = '(0)049';
        //     expect(digitsToStr(dividendSlice)).toEqual(expectedDividendSlice);
        //     expect(digitsToStr(shiftedDivisor)).toEqual(expectedShiftedDivisor);
        //     expect(digitsToStr(result.sum.resultDigits)).toEqual(expectedSumResult);
        // });
    });

    describe('#divideRestOfDigits', () => {
        // it('should return proper position results when dividing digits after initial position', () => {
        //     // given
        //     const base = 10;
        //     const dividend = fromStringDirect('495', base).result.asDigits();
        //     const divisor = fromStringDirect('(0)4587', base).result.asDigits();
        //
        //     // when
        //     const result = divideRestOfDigits(dividend, divisor);
        //     const digits = result.map(d => d.valueAtPosition);
        //
        //     // then
        //     const expected =  [
        //         {
        //             position: 0,
        //             base: 10,
        //             valueInDecimal: 0,
        //             representationInBase: '0'
        //         },
        //         {
        //             position: -1,
        //             base: 10,
        //             valueInDecimal: 1,
        //             representationInBase: '1'
        //         },
        //         {
        //             position: -2,
        //             base: 10,
        //             valueInDecimal: 0,
        //             representationInBase: '0'
        //         },
        //         {
        //             position: -3,
        //             base: 10,
        //             valueInDecimal: 7,
        //             representationInBase: '7'
        //         },
        //         {
        //             position: -4,
        //             base: 10,
        //             valueInDecimal: 9,
        //             representationInBase: '9'
        //         }
        //     ];
        //     expect(digits).toEqual(expected);
        // });
    });
});
