import BigNumber from 'bignumber.js';
import {
    arbitraryFractionToDecimal,
    arbitraryIntegralToDecimal,
    decimalFractionToArbitrary,
    decimalIntegerToArbitrary,
    digitsToStr,
    getRepresentationRegexPattern,
    isFloatingPointStr,
    isValidString,
    removeZeroDigits,
    representationStrToStrArray,
    serializeRepresentationStr,
    splitToDigitsList,
    splitToPartsArr
} from './conversion-helpers';
import { Digit } from '../models';

describe('conversion-helpers', () => {
    describe('#removeZeroDigits', () => {
        it('removes trailing zero digits from single char digit array', () => {
            // given
            const input = ['1', '2', '3', '0', '1', '0', '0'];
            const expected = ['1', '2', '3', '0', '1'];

            // when
            const actual = removeZeroDigits(input);

            // then
            expect(actual).toEqual(expected);
        });

        it('does not modify string with nothing to remove', () => {
            // given
            const input = ['1', '2', '3', '0', '1'];
            const actual = removeZeroDigits(input);

            // when
            const expected = ['1', '2', '3', '0', '1'];

            // then
            expect(actual).toEqual(expected);
        });

        it('removes trailing zero digits from double char digit array', () => {
            // given
            const input = ['11', '23', '30', '50', '10', '00', '00'];

            // when
            const actual = removeZeroDigits(input);

            // then
            const expected = ['11', '23', '30', '50', '10'];
            expect(actual).toEqual(expected);
        });

        it('does not modify string with nothing to remove', () => {
            // given
            const input = ['1', '2', '3', '0', '1'];

            // when
            const actual = removeZeroDigits(input);

            // then
            const expected = ['1', '2', '3', '0', '1'];
            expect(actual).toEqual(expected);
        });

        it('does not modify empty array', () => {
            // given
            const input: string[] = [];

            // when
            const actual = removeZeroDigits(input);

            // then
            const expected: string[] = [];
            expect(actual).toEqual(expected);
        });
    });

    describe('#representationStrToStrList', () => {
        it('returns valid list for sub 36 base string', () => {
            // given
            const input = '7543';
            const base = 8;
            const expected = ['7', '5', '4', '3'];

            // when
            const actual = representationStrToStrArray(input, base);

            // then
            expect(actual).toEqual(expected);
        });

        it('throws error when base is to small', () => {
            // given
            const input = '12 24 26 76';
            const base = 64;
            const expected = ['12', '24', '26', '76'];

            // when
            const actual = representationStrToStrArray(input, base);

            // then
            expect(actual).toEqual(expected);
        });
    });

    describe('getRepresentationRegexPattern test', () => {
        it('returns correct pattern for base binary numbers', () => {
            // given
            const base = 2;
            const expected = '^-?[0-1]+([.][0-1]+)?$';

            // when
            expect(getRepresentationRegexPattern(base)).toEqual(expected);
        });

        it('returns correct pattern for base 10 numbers', () => {
            // given
            const base = 10;
            const expected = '^-?[0-9]+([.][0-9]+)?$';

            // when
            expect(getRepresentationRegexPattern(base)).toEqual(expected);
        });

        it('returns correct pattern for base 16 numbers', () => {
            // given
            const base = 16;
            const expected = '^-?[0-9A-F]+([.][0-9A-F]+)?$';
            // when
            expect(getRepresentationRegexPattern(base)).toEqual(expected);
        });

        it('throws error if base > 36', () => {
            // given
            const base = 40;

            expect(() => {
                // when
                getRepresentationRegexPattern(base);
            }).toThrow();
        });
    });

    describe('isValidString test', () => {
        it('returns true if string matches the base', () => {
            // given
            const str = 'FFFA.6556A';
            const base = 16;

            // when
            expect(isValidString(str, base)).toBeTruthy();
        });

        it('returns false if string is invalid for base', () => {
            // given
            const str = 'ZZZa asd1  sad';
            const base = 10;

            // when
            expect(isValidString(str, base)).toBeFalsy();
        });

        it('returns false if string does not match the base', () => {
            // given
            const str = 'AABFBAA.FF';
            const base = 15;

            // when
            expect(isValidString(str, base)).toBeFalsy();
        });

        it('returns true if string matches the base for base > 36', () => {
            // given
            const str = '-01 36 56.92 34';
            const base = 64;

            // when
            expect(isValidString(str, base)).toBeTruthy();
        });

        it('returns false if string does not match the base for base > 36', () => {
            // given
            const str = '01 78';
            const base = 64;

            // when
            expect(isValidString(str, base)).toBeTruthy();
        });

        it('returns false if the string has multiple signs', () => {
            // given
            const str = '--1234.-230';
            const base = 10;

            // when
            expect(isValidString(str, base)).toBeFalsy();
        });

        it('returns false if the string has multiple delimiters', () => {
            // given
            const str = '1234..230';
            const base = 10;

            // when
            expect(isValidString(str, base)).toBeFalsy();
        });
    });

    describe('decimalIntegerToArbitrary tests', () => {
        it('returns correct result when converting from 0 in base 2', () => {
            // given
            const input = new BigNumber(0);
            const base = 2;
            const expected = splitToDigitsList('0', base);
            const expectedDivisors: string[] = [];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });

        it('returns correct result for 25 in base 2', () => {
            // given
            const input = new BigNumber(25);
            const base = 2;
            const expected = splitToDigitsList('11001', base);
            const expectedDivisors: string[] = ['25', '12', '6', '3', '1'];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });

        it('returns correct result when converting from -25 in base 2', () => {
            // given
            const input = new BigNumber(-25);
            const base = 2;
            const expected = splitToDigitsList('11001', base);
            const expectedDivisors: string[] = ['25', '12', '6', '3', '1'];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });

        it('returns correct result when converting from 255 in base 16', () => {
            // given
            const input = new BigNumber(255);
            const base = 16;
            const expected = splitToDigitsList('FF', base);
            const expectedDivisors: string[] = ['255', '15'];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });

        it('returns correct result when converting from -255 in base 16', () => {
            // given
            const input = new BigNumber(-255);
            const base = 16;
            const expected = splitToDigitsList('FF', base);
            const expectedDivisors = ['255', '15'];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });

        it('returns correct result when converting from 100 in base 64', () => {
            // given
            const input = new BigNumber(100);
            const base = 64;
            const expected = splitToDigitsList('01 36', base);
            const expectedDivisors = ['100', '1'];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });

        it('returns correct result when converting from -100 in base 64', () => {
            // given
            const input = new BigNumber(-100);
            const base = 64;
            const expected = splitToDigitsList('01 36', base);
            const expectedDivisors = ['100', '1'];

            // when
            const [result, divisors] = decimalIntegerToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(divisors).toEqual(expectedDivisors);
        });
    });

    describe('arbitraryIntegralToDecimal tests', () => {
        it('converts 0 in base 2 to base 10', () => {
            // given
            const input = '0';
            const base = 2;
            const expected = new BigNumber(0);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts positive number in base 2 to base 10', () => {
            // given
            const input = '11001';
            const base = 2;
            const expected = new BigNumber(25);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts negative number in base 2 to base 10', () => {
            // given
            const input = '-11001';
            const base = 2;
            const expected = new BigNumber(-25);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts positive number in base 16 to base 10', () => {
            // given
            const input = 'FF';
            const base = 16;
            const expected = new BigNumber(255);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts negative number in base 16 to base 10', () => {
            // given
            const input = '-FF';
            const base = 16;
            const expected = new BigNumber(-255);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts positive number in base 64 to base 10', () => {
            // given
            const input = '01 36';
            const base = 64;
            const expected = new BigNumber(100);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts negative number in base 64 to base 10', () => {
            // given
            const input = '-01 36';
            const base = 64;
            const expected = new BigNumber(-100);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts positive number in base 64 to base 64', () => {
            // given
            const input = '32 18';
            const base = 64;
            const expected = new BigNumber(2066);

            // when
            expect(arbitraryIntegralToDecimal(input, base)).toEqual(expected);
        });

        it('converts negative number in base 64 to base 64', () => {
            // given
            const input = '-32 18';
            const base = 64;
            const expected = new BigNumber(-2066);

            // when
            const result = arbitraryIntegralToDecimal(input, base);

            // when
            expect(result).toEqual(expected);
        });


        it('throws error if repStr does match input base', () => {
            // given
            const input = 'FF8';
            const inputbase = 10;

            // when
            expect(() => {
                arbitraryIntegralToDecimal(input, inputbase);
            }).toThrow();
        });
    });

    describe('decimalFractionToArbitrary tests', () => {
        it('converts 0 fraction to zero digit', () => {
            // given
            const input = new BigNumber(0);
            const base = 2;
            const expected: Digit[] = [];
            const expectedFractions: string[] = [];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });

        it('converts decimal fraction to exact binary', () => {
            // given
            const input = new BigNumber(0.75);
            const base = 2;
            const expected = splitToDigitsList('0.11', base).slice(1);
            const expectedFractions: string[] = ['0.75', '1.5', '0.5', '1'];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });

        it('converts decimal fraction to base 2 with 30 digits precision', () => {
            // given
            const input = new BigNumber(0.3);
            const base = 2;
            const expected = splitToDigitsList('0.010011001100110011001100110011', base).slice(1);

            const expectedFractions: string[] = [
                '0.3', '0.6', '0.6', '1.2', '0.2', '0.4',
                '0.4', '0.8', '0.8', '1.6', '0.6', '1.2',
                '0.2', '0.4', '0.4', '0.8', '0.8', '1.6',
                '0.6', '1.2', '0.2', '0.4', '0.4', '0.8',
                '0.8', '1.6', '0.6', '1.2', '0.2', '0.4',
                '0.4', '0.8', '0.8', '1.6', '0.6', '1.2',
                '0.2', '0.4', '0.4', '0.8', '0.8', '1.6',
                '0.6', '1.2', '0.2', '0.4', '0.4', '0.8',
                '0.8', '1.6', '0.6', '1.2', '0.2', '0.4',
                '0.4', '0.8', '0.8', '1.6', '0.6', '1.2'
            ];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });

        it('converts decimal fraction to exact base 16', () => {
            // given
            const input = new BigNumber(0.5);
            const base = 16;
            const expected = splitToDigitsList('0.8', base).slice(1);
            const expectedFractions: string[] = ['0.5', '8'];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });

        it('converts decimal fraction to base 16 with 30 digits precision', () => {
            // given
            const input = new BigNumber(0.3);
            const base = 16;
            const expected = splitToDigitsList('0.4CCCCCCCCCCCCCCCCCCCCCCCCCCCCC', base).slice(1);
            const expectedFractions: string[] = [
                '0.3', '4.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8',
                '0.8', '12.8', '0.8', '12.8', '0.8', '12.8'
            ];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });

        it('converts decimal fraction to exact base 64', () => {
            // given
            const input = new BigNumber(0.5);
            const base = 64;
            const expected = splitToDigitsList('0.32', base).slice(1);
            const expectedFractions: string[] = ['0.5', '32'];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });

        it('converts decimal fraction to base 64 with 15 digits precision', () => {
            // given
            const input = new BigNumber(0.3);
            const base = 64;
            const precision = 15;
            const expected = splitToDigitsList('00.19 12 51 12 51 12 51 12 51 12 51 12 51 12 51', 64).slice(1);

            const expectedFractions: string[] = [
                '0.3', '19.2', '0.2', '12.8',
                '0.8', '51.2', '0.2', '12.8',
                '0.8', '51.2', '0.2', '12.8',
                '0.8', '51.2', '0.2', '12.8',
                '0.8', '51.2', '0.2', '12.8',
                '0.8', '51.2', '0.2', '12.8',
                '0.8', '51.2', '0.2', '12.8',
                '0.8', '51.2'
            ];

            // when
            const [result, fractions] = decimalFractionToArbitrary(input, base, precision);

            // then
            expect(result).toEqual(expected);
            expect(fractions).toEqual(expectedFractions);
        });
    });

    describe('arbitraryFractionToDecimal tests', () => {
        it('converts base 2 fraction to exact decimal', () => {
            // given
            const input = '11';
            const base = 2;
            const expected = new BigNumber(0.75);

            // when
            expect(arbitraryFractionToDecimal(input, base)).toEqual(expected);
        });

        it('converts base 2 fraction to exact decimal without rounding', () => {
            // given
            const input = '010011001100110011001100110011';
            const base = 2;
            const expected = '0.2999999998137354850769035';

            // when
            expect(arbitraryFractionToDecimal(input, base).toString()).toEqual(
                expected
            );
        });

        it('converts base 2 fraction to exact decimal with rounding', () => {
            // given
            const input = '010011001100110011001100110011';
            const base = 2;
            const expected = '0.3';

            // when
            expect(
                arbitraryFractionToDecimal(input, base)
                    .toPrecision(1)
                    .toString()
            ).toEqual(expected);
        });
    });

    describe('isFloatingPointStr tests', () => {
        it('returns true if string has delimiter', () => {
            // given
            const input = '1.1';

            // when
            expect(isFloatingPointStr(input)).toBeTruthy();
        });

        it('returns false if string has no delimiter', () => {
            // given
            const input = '1121';

            // when
            expect(isFloatingPointStr(input)).toBeFalsy();
        });
    });

    describe('toDigitsLists tests', () => {
        it('Converts float number to lists of integer and fraction part digits', () => {
            // given
            const num = new BigNumber(25.5);
            const expectedIntegral = ['2', '5'];
            const expectedFractional = ['5'];

            // when
            const result = splitToPartsArr(num);

            // then
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });

        it('Converts int number to lists of integer and fraction part digits', () => {
            // given
            const num = new BigNumber(25);
            const expectedIntegral = ['2', '5'];
            const expectedFractional: string[] = [];

            // when
            const result = splitToPartsArr(num);

            // then
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });

        it('Converts negative int number to lists of integer and fraction part digits', () => {
            // given
            const num = new BigNumber(-25);
            const expectedIntegral = ['2', '5'];
            const expectedFractional: string[] = [];

            // when
            const result = splitToPartsArr(num);

            // then
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
    });

    describe('splitToDigitList tests', () => {
        it('splits floating number to list of digits', () => {
            // given
            const num = new BigNumber(25.5);
            const base = 10;

            // when
            const result = splitToDigitsList(num, base);

            // then
            const expected: Digit[] = [
                {
                    base: 10,
                    position: 1,
                    representationInBase: '2',
                    valueInDecimal: 2
                },
                {
                    base: 10,
                    position: 0,
                    representationInBase: '5',
                    valueInDecimal: 5
                },
                {
                    base: 10,
                    position: -1,
                    representationInBase: '5',
                    valueInDecimal: 5
                }
            ];
            expect(result).toEqual(expected)
        });
    });

    describe('serializeRepresentationStr tests', () => {
        it('should replace invalid signs, delimiters and whitespace with valid', () => {
            // given
           const representation = '−12 45,34  56  ';

            // when
            const result = serializeRepresentationStr(representation);

            // then
            const expected = '-12 45.34 56';
            expect(result).toEqual(expected)
        });

        it('should strip extraneous spaces around delimiter', () => {
            // given
            const representation = '−12 45 . 34  56  ';

            // when
            const result = serializeRepresentationStr(representation);

            // then
            const expected = '-12 45.34 56';
            expect(result).toEqual(expected)
        });
    });

    describe('#digitsToStr', () => {
        describe('when base is less than 36', () => {
            it('should convert to proper str when there are no fractional digits', () => {
                // given
                const base = 10;
                const digits: Digit[] = [
                    {representationInBase: '1', position: 3, valueInDecimal: 1, base },
                    {representationInBase: '2', position: 2, valueInDecimal: 2, base },
                    {representationInBase: '3', position: 1, valueInDecimal: 3, base },
                    {representationInBase: '4', position: 0, valueInDecimal: 4, base }
                ];

                // when
                const result = digitsToStr(digits);

                // then
                const expected = '1234';
                expect(result).toEqual(expected);
            });

            it('should convert to proper str when there are some fractional digits', () => {
                // given
                const base = 10;
                const digits: Digit[] = [
                    {representationInBase: '1', position: 3, valueInDecimal: 1, base },
                    {representationInBase: '2', position: 2, valueInDecimal: 2, base },
                    {representationInBase: '3', position: 1, valueInDecimal: 3, base },
                    {representationInBase: '4', position: 0, valueInDecimal: 4, base },
                    {representationInBase: '5', position: -1, valueInDecimal: 4, base }
                ];

                // when
                const result = digitsToStr(digits);

                // then
                const expected = '1234.5';
                expect(result).toEqual(expected);
            });

            it('should add leading zero when there is no integer part', () => {
                // given
                const base = 10;
                const digits: Digit[] = [
                    {representationInBase: '1', position: -1, valueInDecimal: 1, base },
                    {representationInBase: '1', position: -2, valueInDecimal: 1, base }
                ];

                // when
                const result = digitsToStr(digits);

                // then
                const expected = '0.11';
                expect(result).toEqual(expected);
            });
        });

        describe('when base is greater than 36', () => {
            it('should convert to proper str when there are no fractional digits', () => {
                // given
                const base = 64;
                const digits: Digit[] = [
                    {representationInBase: '12', position: 2, valueInDecimal: 12, base },
                    {representationInBase: '10', position: 1, valueInDecimal: 10, base },
                    {representationInBase: '04', position: 0, valueInDecimal: 3, base }
                ];

                // when
                const result = digitsToStr(digits);

                // then
                const expected = '12 10 04';
                expect(result).toEqual(expected);
            });

            it('should convert to proper str when there are some fractional digits', () => {
                // given
                const base = 64;
                const digits: Digit[] = [
                    {representationInBase: '12', position: 1, valueInDecimal: 12, base },
                    {representationInBase: '10', position: 0, valueInDecimal: 10, base },
                    {representationInBase: '04', position: -1, valueInDecimal: 4, base }
                ];

                // when
                const result = digitsToStr(digits);

                // then
                const expected = '12 10.04';
                expect(result).toEqual(expected);
            })
        });
    })
});
