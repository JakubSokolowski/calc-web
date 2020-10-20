import { ComplementConverter, fromNumber } from '@calc/calc-arithmetic';
import { AdditionOperand } from '../models';

describe('representation', () => {
    describe('PositionalNumber', () => {
        describe('toDigitsList', () => {
            it('should correctly convert to list of digits', () => {
                // given
                const { result } = fromNumber(123, 10);

                const expected: AdditionOperand[] = [
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        base: 10,
                        position: 2
                    },
                    {
                        valueInDecimal: 2,
                        representationInBase: '2',
                        base: 10,
                        position: 1
                    },
                    {
                        valueInDecimal: 3,
                        representationInBase: '3',
                        base: 10,
                        position: 0
                    }
                ];


                // when
                const digits = result.toDigitsList();

                // then
                expect(digits).toEqual(expected);
            });

            it('should correctly convert to list of digits when number has fractional part', () => {
                // given
                const { result } = fromNumber(123.45, 10);
                const expected: AdditionOperand[] = [
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        base: 10,
                        position: 2
                    },
                    {
                        valueInDecimal: 2,
                        representationInBase: '2',
                        base: 10,
                        position: 1
                    },
                    {
                        valueInDecimal: 3,
                        representationInBase: '3',
                        base: 10,
                        position: 0
                    },
                    {
                        valueInDecimal: 4,
                        representationInBase: '4',
                        base: 10,
                        position: -1
                    },
                    {
                        valueInDecimal: 5,
                        representationInBase: '5',
                        base: 10,
                        position: -2
                    }
                ];

                // when
                const digits = result.toDigitsList();

                // then
                expect(digits).toEqual(expected);
            });
        });
    });

    describe('NumberComplement', () => {
        describe('toDigitsList', () => {
            it('should return list of digits for positive number complement', () => {
                // given
                const complementStr = '1B49';
                const base = 16;
                const complement = ComplementConverter.getComplement(complementStr, base);

                // when
                const digits = complement.toDigitsList();

                // then
                const expected: AdditionOperand[] = [
                    {
                        isComplementExtension: true,
                        base: 16,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        position: 4
                    },
                    {

                        base: 16,
                        representationInBase: '1',
                        valueInDecimal: 1,
                        position: 3
                    },
                    {

                        base: 16,
                        representationInBase: 'B',
                        valueInDecimal: 11,
                        position: 2
                    },
                    {

                        base: 16,
                        representationInBase: '4',
                        valueInDecimal: 4,
                        position: 1
                    },
                    {

                        base: 16,
                        representationInBase: '9',
                        valueInDecimal: 9,
                        position: 0
                    }
                ];
                expect(digits).toEqual(expected);
            });
        });
    });
});
