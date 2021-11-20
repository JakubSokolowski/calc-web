import { Digit } from '../models';
import {
    convertUsingAssociatedBases,
    mapToAssociatedBaseDigits,
    reduceToGreaterBaseDigit,
    splitToSmallerBaseDigits
} from './associated-base-converter';


describe('associated-base-converter', () => {
    describe('#reduceToGreaterBaseDigit', () => {
        it('it should combine all the digits in base 2 into single digits of base 8', () => {
            // given
            const digits: Digit[] = [
                { position: 2, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 1, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 0, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];

            const outputBase = 8;

            // when
            const result = reduceToGreaterBaseDigit(digits, outputBase);

            // then
            const expected: Digit[] = [{ position: 0, representationInBase: '3', base: 8, valueInDecimal: 3}];
            expect(result.output).toEqual(expected);
        });

        it('it should combine all the digits in base 2 into single digits of base 64', () => {
            // given
            const digits: Digit[] = [
                { position: 5, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 4, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 3, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 2, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 1, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 0, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];

            const outputBase = 64;

            // when
            const result = reduceToGreaterBaseDigit(digits, outputBase);

            // then
            const expected: Digit[] = [{ position: 0, representationInBase: '51', base: 64, valueInDecimal: 51}];
            expect(result.output).toEqual(expected);
        });
    });

    describe('#splitToSmallerBaseDigits', () => {
        it('it should split single digit from base 8 to multiple digits from base 2', () => {
            // given
            const digit: Digit = { position: 0, representationInBase: '5', base: 8, valueInDecimal: 5};
            const outputBase = 2;

            // when
            const result = splitToSmallerBaseDigits(digit, outputBase);

            // then
            const expected: Digit[] = [
                { position: 2, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 1, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 0, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];
            expect(result.output).toEqual(expected);
        });

        it('it should split single digit from base 64 to multiple digits from base 2', () => {
            // given
            const digit: Digit = { position: 0, representationInBase: '51', base: 64, valueInDecimal: 51};
            const outputBase = 2;

            // when
            const result = splitToSmallerBaseDigits(digit, outputBase);

            // then
            const expected: Digit[] = [
                { position: 5, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 4, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 3, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 2, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 1, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 0, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];
            expect(result.output).toEqual(expected);
        });

        it('it should split single digit from base 8 to multiple digits from base 2' +
            ' and pad start with zero digits until the required length for mapping is reached', () => {
            // given
            const digit: Digit = { position: 0, representationInBase: '3', base: 8, valueInDecimal: 3};
            const outputBase = 2;

            // when
            const result = splitToSmallerBaseDigits(digit, outputBase);

            // then
            const expected: Digit[] = [
                { position: 2, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 1, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 0, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];
            expect(result.output).toEqual(expected);
        });

        it('it should split single digit to multiple digits and account for shifted positions', () => {
            // given
            const digit: Digit = { position: 1, representationInBase: '5', base: 8, valueInDecimal: 5};
            const outputBase = 2;

            // when
            const result = splitToSmallerBaseDigits(digit, outputBase);

            // then
            const expected: Digit[] = [
                { position: 5, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: 4, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: 3, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];
            expect(result.output).toEqual(expected);
        });

        it('it should split single digit to multiple digits and account for shifted fractional positions', () => {
            // given
            const digit: Digit = { position: -2, representationInBase: '5', base: 8, valueInDecimal: 5};
            const outputBase = 2;

            // when
            const result = splitToSmallerBaseDigits(digit, outputBase);

            // then
            const expected: Digit[] = [
                { position: -4, valueInDecimal: 1, base: 2, representationInBase: '1'},
                { position: -5, valueInDecimal: 0, base: 2, representationInBase: '0'},
                { position: -6, valueInDecimal: 1, base: 2, representationInBase: '1'},
            ];
            expect(result.output).toEqual(expected);
        });
    });

    describe('#mapToAssociatedBaseDigits', () => {
        const base8NumDigits: Digit[] = [
            { position: 1, representationInBase: '6', base: 8, valueInDecimal: 6},
            { position: 0, representationInBase: '3', base: 8, valueInDecimal: 3},
            { position: -1, representationInBase: '4', base: 8, valueInDecimal: 4},
            { position: -2, representationInBase: '5', base: 8, valueInDecimal: 5},
        ];

        const base2NumDigits: Digit[] = [
            { position: 5, valueInDecimal: 1, base: 2, representationInBase: '1'},
            { position: 4, valueInDecimal: 1, base: 2, representationInBase: '1'},
            { position: 3, valueInDecimal: 0, base: 2, representationInBase: '0'},
            { position: 2, valueInDecimal: 0, base: 2, representationInBase: '0'},
            { position: 1, valueInDecimal: 1, base: 2, representationInBase: '1'},
            { position: 0, valueInDecimal: 1, base: 2, representationInBase: '1'},
            { position: -1, valueInDecimal: 1, base: 2, representationInBase: '1'},
            { position: -2, valueInDecimal: 0, base: 2, representationInBase: '0'},
            { position: -3, valueInDecimal: 0, base: 2, representationInBase: '0'},
            { position: -4, valueInDecimal: 1, base: 2, representationInBase: '1'},
            { position: -5, valueInDecimal: 0, base: 2, representationInBase: '0'},
            { position: -6, valueInDecimal: 1, base: 2, representationInBase: '1'},
        ];

        describe('when output base is smaller than input base', () => {
            it('should map all digits to smaller output base', () => {
                // given
                const outputBase = 2;
                const digits: Digit[] = [...base8NumDigits];

                // when
                const details = mapToAssociatedBaseDigits(digits, outputBase);

                // then
                const expected: Digit[] = [...base2NumDigits];
                expect(details.resultDigits).toEqual(expected);
            })
        });

        describe('when output base is greater than input base', () => {
            it('should map all digits to greater output base', () => {
                // given
                const outputBase = 8;
                const digits: Digit[] = [...base2NumDigits];

                // when
                const details = mapToAssociatedBaseDigits(digits, outputBase);

                // then
                const expected: Digit[] = [...base8NumDigits];
                expect(details.resultDigits).toEqual(expected);
            });
        });
    });

    describe('#convertUsingAssociatedBase', () => {
        describe('when converting to smaller base', () => {
            it('should convert positive number  smaller base', () => {
                // given
                const inputStr = '63';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '110011';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert negative number  smaller base', () => {
                // given
                const inputStr = '-63';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '-110011';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert positive fractional number to smaller base', () => {
                // given
                const inputStr = '0.45';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '0.100101';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert negative fractional number to smaller base', () => {
                // given
                const inputStr = '-0.45';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '-0.100101';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert positive number with fractional part to smaller base', () => {
                // given
                const inputStr = '63.45';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '110011.100101';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert negative number with fractional part to smaller base', () => {
                // given
                const inputStr = '-63.45';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '-110011.100101';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert number when last mapping has trailing zeros', () => {
                // given
                const inputStr = '64';
                const inputBase = 8;
                const outputBase = 2;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '110100';
                expect(result.result.valueInBase).toEqual(expected);
            });
        });

        describe('when converting to greater base', () => {
            it('should convert positive number to greater base', () => {
                // given
                const inputStr = '110011';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '63';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert negative number to greater base', () => {
                // given
                const inputStr = '-110011';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '-63';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert positive fractional number to greater base', () => {
                // given
                const inputStr = '0.100101';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '0.45';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert negative fractional number to greater base', () => {
                // given
                const inputStr = '-0.100101';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '-0.45';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert positive number with fractional part to greater base', () => {
                // given
                const inputStr = '110011.100101';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '63.45';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert negative number with fractional part to greater base', () => {
                // given
                const inputStr = '-110011.100101';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '-63.45';
                expect(result.result.valueInBase).toEqual(expected);
            });

            it('should convert positive number with groups that need to be extended to greater base', () => {
                // given
                const inputStr = '1110100110.11';
                const inputBase = 2;
                const outputBase = 8;

                // when
                const result = convertUsingAssociatedBases(inputStr, inputBase, outputBase);

                // then
                const expected = '1646.6';
                expect(result.result.valueInBase).toEqual(expected);
            });
        })
    })
});
