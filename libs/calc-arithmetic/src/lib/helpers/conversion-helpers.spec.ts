import BigNumber from 'bignumber.js';
import {
    arbitraryFractionToDecimal,
    arbitraryIntegralToDecimal,
    decimalFractionToArbitrary,
    decimalIntegerToArbitrary,
    getRepresentationRegexPattern,
    isFloatingPointStr,
    isValidString,
    removeZeroDigits,
    replaceAll,
    representationStrToStrArray,
    splitToDigits,
    splitToPartsArr
} from './conversion-helpers';
import { Digits } from '../positional/representations';

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
            const input = ['11', '23', '30', '50', '10', '00', '00'];
            const actual = removeZeroDigits(input);
            const expected = ['11', '23', '30', '50', '10'];
            expect(actual).toEqual(expected);
        });

        it('does not modify string with nothing to remove', () => {
            const input = ['1', '2', '3', '0', '1'];
            const actual = removeZeroDigits(input);
            const expected = ['1', '2', '3', '0', '1'];
            expect(actual).toEqual(expected);
        });

        it('does not modify empty array', () => {
            const input: string[] = [];
            const actual = removeZeroDigits(input);
            const expected: string[] = [];
            expect(actual).toEqual(expected);
        });
    });

    describe('#representationStrToStrList', () => {
        it('returns valid list for sub 36 radix string', () => {
            // given
            const input = '7543';
            const radix = 8;
            const expected = ['7', '5', '4', '3'];

            // when
            const actual = representationStrToStrArray(input, radix);

            // then
            expect(actual).toEqual(expected);
        });

        it('throws error when radix is to small', () => {
            // given
            const input = '12 24 26 76';
            const radix = 64;
            const expected = ['12', '24', '26', '76'];

            // when
            const actual = representationStrToStrArray(input, radix);

            // then
            expect(actual).toEqual(expected);
        });
    });

    describe('replaceAll tests', () => {
        it('replaces all characters in string', () => {
            const input = 'A#CA#C';
            const actual = replaceAll(input, '#', 'B');
            const expected = 'ABCABC';
            expect(actual).toEqual(expected);
        });
        it('does not modify string without character to replace', () => {
            const input = 'ACAC';
            const actual = replaceAll(input, '#', 'B');
            const expected = 'ACAC';
            expect(actual).toEqual(expected);
        });
    });

    describe('getRepresentationRegexPattern test', () => {
        it('returns correct pattern for base binary numbers', () => {
            const radix = 2;
            const expected = '^-?[0-1]+([.][0-1]+)?$';
            expect(getRepresentationRegexPattern(radix)).toEqual(expected);
        });
        it('returns correct pattern for base 10 numbers', () => {
            const radix = 10;
            const expected = '^-?[0-9]+([.][0-9]+)?$';
            expect(getRepresentationRegexPattern(radix)).toEqual(expected);
        });
        it('returns correct pattern for base 16 numbers', () => {
            const radix = 16;
            const expected = '^-?[0-9A-F]+([.][0-9A-F]+)?$';
            expect(getRepresentationRegexPattern(radix)).toEqual(expected);
        });
        it('throws error if radix > 36', () => {
            const radix = 40;
            expect(() => {
                getRepresentationRegexPattern(radix);
            }).toThrow();
        });
    });

    describe('isValidString test', () => {
        it('returns true if string matches the radix', () => {
            const str = 'FFFA.6556A';
            const radix = 16;
            expect(isValidString(str, radix)).toBeTruthy();
        });
        it('returns false if string is invalid for radix', () => {
            const str = 'ZZZa asd1  sad';
            const radix = 10;
            expect(isValidString(str, radix)).toBeFalsy();
        });
        it('returns false if string does not match the radix', () => {
            const str = 'AABFBAA.FF';
            const radix = 15;
            expect(isValidString(str, radix)).toBeFalsy();
        });
        it('returns true if string matches the radix for base > 36', () => {
            const str = '-01 36 56.92 34';
            const radix = 64;
            expect(isValidString(str, radix)).toBeTruthy();
        });
        it('returns false if string does not match the radix for base > 36', () => {
            const str = '01 78';
            const radix = 64;
            expect(isValidString(str, radix)).toBeTruthy();
        });

        it('returns false if the string has multiple signs', () => {
            const str = '--1234.-230';
            const radix = 10;
            expect(isValidString(str, radix)).toBeFalsy();
        });
        it('returns false if the string has multiple delimiters', () => {
            const str = '1234..230';
            const radix = 10;
            expect(isValidString(str, radix)).toBeFalsy();
        });
    });

    describe('decimalIntegralToArbitrary tests', () => {
        it('returns correct pattern for 0 in base 2', () => {
            const input = new BigNumber(0);
            const radix = 2;
            const expected = '0'.split('');
            const expectedDivisors: string[] = [];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
        it('returns correct pattern for 25 in base 2', () => {
            const input = new BigNumber(25);
            const radix = 2;
            const expected = '11001'.split('');
            const expectedDivisors: string[] = ['25', '12', '6', '3', '1'];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
        it('returns correct pattern for -25 in base 2', () => {
            const input = new BigNumber(-25);
            const radix = 2;
            const expected = '11001'.split('');
            const expectedDivisors: string[] = ['25', '12', '6', '3', '1'];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
        it('returns correct pattern for 255 in base 16', () => {
            const input = new BigNumber(255);
            const radix = 16;
            const expected = 'FF'.split('');
            const expectedDivisors: string[] = ['255', '15'];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
        it('returns correct pattern for -255 in base 16', () => {
            const input = new BigNumber(-255);
            const radix = 16;
            const expected = 'FF'.split('');
            const expectedDivisors = ['255', '15'];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
        it('returns correct pattern for 100 in base 64', () => {
            const input = new BigNumber(100);
            const radix = 64;
            const expected = '01 36'.split(' ');
            const expectedDivisors = ['100', '1'];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
        it('returns correct pattern for -100 in base 64', () => {
            const input = new BigNumber(-100);
            const radix = 64;
            const expected = '01 36'.split(' ');
            const expectedDivisors = ['100', '1'];
            const result = decimalIntegerToArbitrary(input, radix);
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedDivisors);
        });
    });

    describe('arbitraryIntegralToDecimal tests', () => {
        it('converts 0 in base 2 to base 10', () => {
            const input = '0';
            const radix = 2;
            const expected = new BigNumber(0);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('converts positive number in base 2 to base 10', () => {
            const input = '11001';
            const radix = 2;
            const expected = new BigNumber(25);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('converts negative number in base 2 to base 10', () => {
            const input = '-11001';
            const radix = 2;
            const expected = new BigNumber(-25);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('converts positive number in base 16 to base 10', () => {
            const input = 'FF';
            const radix = 16;
            const expected = new BigNumber(255);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('converts negative number in base 16 to base 10', () => {
            const input = '-FF';
            const radix = 16;
            const expected = new BigNumber(-255);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('converts positive number in base 64 to base 10', () => {
            const input = '01 36';
            const radix = 64;
            const expected = new BigNumber(100);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('converts negative number in base 64 to base 10', () => {
            const input = '-01 36';
            const radix = 64;
            const expected = new BigNumber(-100);
            expect(arbitraryIntegralToDecimal(input, radix)).toEqual(expected);
        });
        it('throws error if repStr does match input radix', () => {
            const input = 'FF8';
            const inputRadix = 10;
            expect(() => {
                arbitraryIntegralToDecimal(input, inputRadix);
            }).toThrow();
        });
    });

    describe('decimalFractionToArbitrary tests', () => {
        it('converts 0 fraction to zero digit', () => {
            // given
            const input = new BigNumber(0);
            const radix = 2;
            const expected: string[] = [];
            const expectedFractions: string[] = [];

            // when
            const result = decimalFractionToArbitrary(input, radix);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });

        it('converts decimal fraction to exact binary', () => {
            // given
            const input = new BigNumber(0.75);
            const radix = 2;
            const expected = '11'.split('');
            const expectedFractions: string[] = ['0.75', '1.5', '0.5', '1'];

            // when
            const result = decimalFractionToArbitrary(input, radix);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });

        it('converts decimal fraction to base 2 with 30 digits precision', () => {
            // given
            const input = new BigNumber(0.3);
            const radix = 2;
            const expected = '010011001100110011001100110011'.split('');

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
            const result = decimalFractionToArbitrary(input, radix);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });

        it('converts decimal fraction to exact base 16', () => {
            // given
            const input = new BigNumber(0.5);
            const radix = 16;
            const expected = '8'.split('');
            const expectedFractions: string[] = ['0.5', '8'];

            // when
            const result = decimalFractionToArbitrary(input, radix);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });

        it('converts decimal fraction to base 16 with 30 digits precision', () => {
            // given
            const input = new BigNumber(0.3);
            const radix = 16;
            const expected = '4CCCCCCCCCCCCCCCCCCCCCCCCCCCCC'.split('');
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
            const result = decimalFractionToArbitrary(input, radix);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });

        it('converts decimal fraction to exact base 64', () => {
            // given
            const input = new BigNumber(0.5);
            const radix = 64;
            const expected = '32'.split(' ');
            const expectedFractions: string[] = ['0.5', '32'];

            // when
            const result = decimalFractionToArbitrary(input, radix);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });
        it('converts decimal fraction to base 64 with 15 digits precision', () => {
            // given
            const input = new BigNumber(0.3);
            const radix = 64;
            const expected = '19 12 51 12 51 12 51 12 51 12 51 12 51 12 51'.split(
                ' '
            );
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
            const result = decimalFractionToArbitrary(input, radix, 15);

            // then
            expect(result[0].digits).toEqual(expected);
            expect(result[1]).toEqual(expectedFractions);
        });
    });

    describe('arbitraryFractionToDecimal tests', () => {
        it('converts base 2 fraction to exact decimal', () => {
            const input = '11';
            const radix = 2;
            const expected = new BigNumber(0.75);
            expect(arbitraryFractionToDecimal(input, radix)).toEqual(expected);
        });
        it('converts base 2 fraction to exact decimal without rounding', () => {
            const input = '010011001100110011001100110011';
            const radix = 2;
            const expected = '0.2999999998137354850769035';
            expect(arbitraryFractionToDecimal(input, radix).toString()).toEqual(
                expected
            );
        });
        it('converts base 2 fraction to exact decimal with rounding', () => {
            const input = '010011001100110011001100110011';
            const radix = 2;
            const expected = '0.3';
            expect(
                arbitraryFractionToDecimal(input, radix)
                    .toPrecision(1)
                    .toString()
            ).toEqual(expected);
        });
    });

    describe('isFloatingPointStr tests', () => {
        it('returns true if string has delimiter', () => {
            const input = '1.1';
            expect(isFloatingPointStr(input)).toBeTruthy();
        });

        it('returns false if string has no delimiter', () => {
            const input = '1121';
            expect(isFloatingPointStr(input)).toBeFalsy();
        });
    });

    describe('toDigitsLists tests', () => {
        it('Converts float number to lists of integer and fraction part digits', () => {
            const num = new BigNumber(25.5);
            const expectedIntegral = ['2', '5'];
            const expectedFractional = ['5'];
            const result = splitToPartsArr(num);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
        it('Converts int number to lists of integer and fraction part digits', () => {
            const num = new BigNumber(25);
            const expectedIntegral = ['2', '5'];
            const expectedFractional: string[] = [];
            const result = splitToPartsArr(num);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
        it('Converts negative int number to lists of integer and fraction part digits', () => {
            const num = new BigNumber(-25);
            const expectedIntegral = ['2', '5'];
            const expectedFractional: string[] = [];
            const result = splitToPartsArr(num);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
    });

    describe('splitToDigits tests', () => {
        it('Splits floating number to list of its digit parts', () => {
            const num = new BigNumber(25.5);
            const base = 10;
            const expectedIntegral = new Digits(['2', '5'], base);
            const expectedFractional = new Digits(['5'], base);
            const result = splitToDigits(num);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
        it('Splits number string to list of its digit parts', () => {
            const num = '25.5';
            const base = 10;
            const expectedIntegral = new Digits(['2', '5'], base);
            const expectedFractional = new Digits(['5'], base);
            const result = splitToDigits(num);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
        it('Splits number string to list of its digit parts for base > 36', () => {
            const num = '12 45 23.52';
            const base = 64;
            const expectedIntegral = new Digits(['12', '45', '23'], base);
            const expectedFractional = new Digits(['52'], base);
            const result = splitToDigits(num, base);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
        it('Splits number string to list of its digit parts', () => {
            const num = 25.5;
            const base = 10;
            const expectedIntegral = new Digits(['2', '5'], base);
            const expectedFractional = new Digits(['5'], base);
            const result = splitToDigits(num);
            expect(result[0]).toEqual(expectedIntegral);
            expect(result[1]).toEqual(expectedFractional);
        });
    });

});
