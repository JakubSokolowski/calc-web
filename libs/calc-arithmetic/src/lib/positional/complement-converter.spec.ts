import {
    complementStrToBaseStr,
    getComplement,
    getNegativeNumberComplement,
    getPositiveNumberComplement,
    hasDelimiter,
    hasValidComplementSign,
    incrementNumber,
    isComplementStrNegative,
    isNegative,
    isValidComplementOrRepresentationStr,
    isValidComplementStr,
    stripComplementExtension
} from './complement-converter';
import { splitToDigitsList } from '../helpers/conversion-helpers';

describe('complement-converter', () => {
    describe('getPositiveComplement tests', () => {
        it('returns valid complement for positive number', () => {
            // given
            const input = '200';
            const base = 10;
            const expected = '(0)200';
            const expectedExtension = '(0)';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getPositiveNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedExtension);
        });

        it('returns valid complement for positive number with 0 floating part', () => {
            // given
            const input = '200.0';
            const base = 10;
            const expected = '(0)200.0';
            const expectedSign = '(0)';

            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getPositiveNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for positive floating number', () => {
            // given
            const input = '200.73';
            const base = 10;
            const expected = '(0)200.73';
            const expectedSign = '(0)';

            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getPositiveNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });
    });

    describe('getNegativeComplement tests', () => {
        it('returns valid complement for base 10 negative number', () => {
            // given
            const input = '-200';
            const base = 10;
            const expected = '(9)800';
            const expectedSign = '(9)';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getNegativeNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for base 10 negative number with 0 floating part', () => {
            // given
            const input = '-200.0';
            const base = 10;
            const expected = '(9)800.0';
            const expectedSign = '(9)';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getNegativeNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for base 10 negative floating number', () => {
            // given
            const input = '-11001.1';
            const base = 2;
            const expected = '(1)00110.1';
            const expectedSign = '(1)';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getNegativeNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for base 2 negative floating number', () => {
            // given
            const input = '-200.73';
            const base = 10;
            const expected = '(9)799.27';
            const expectedSign = '(9)';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const actual = getNegativeNumberComplement(inputDigits);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });
    });

    describe('getComplement tests', () => {
        it('returns valid complement for positive number', () => {
            // given
            const input = '200';
            const base = 10;
            const expected = '(0)200';
            const expectedSign = '(0)';

            // when
            const actual = getComplement(input, base);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for negative number', () => {
            // given
            const input = '-200';
            const base = 10;
            const expected = '(9)800';
            const expectedSign = '(9)';

            // when
            const actual = getComplement(input, base);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for another complement', () => {
            // given
            const input = '200';
            const base = 10;
            const expected = '(0)200';
            const expectedSign = '(0)';

            // when
            const actual = getComplement(input, base);

            // then
            expect(actual.toString()).toEqual(expected);
            expect(actual.extensionStr()).toEqual(expectedSign);
        });

        it('returns valid complement for positive number equal to base', () => {
            // given
            const input = '10';
            const base = 10;

            // when
            const actual = getComplement(input, base);

            // then
            const expected = '(0)10';
            expect(actual.toString()).toEqual(expected);
        });

        it('returns valid complement for negative number equal to -(base)', () => {
            // given
            const input = '-10';
            const base = 10;

            // when
            const actual = getComplement(input, base);

            // then
            const expected = '(9)90';
            expect(actual.toString()).toEqual(expected);
        });

        it('returns valid complement for already computed positive complement', () => {
            // given
            const input = '78';
            const base = 10;

            // when
            const first = getComplement(input, base);
            const second = getComplement(first, base);

            // then
            const expectedFirst = '(0)78';
            const expectedSecond = '(9)22';
            expect(first.toString()).toEqual(expectedFirst);
            expect(second.toString()).toEqual(expectedSecond);
        });

        it('returns valid complement for already computed negative complement', () => {
            // given
            const input = '-78';
            const base = 10;

            // when
            const first = getComplement(input, base);
            const second = getComplement(first, base);

            // then
            const expectedFirst = '(9)22';
            const expectedSecond = '(0)78';
            expect(first.toString()).toEqual(expectedFirst);
            expect(second.toString()).toEqual(expectedSecond);
        });
    });

    describe('incrementNumber tests', () => {
        it('increments number when base is < 36 and there is no propagation', () => {
            // given
            const base = 10;
            const input = '789235';
            const expected = '789236';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const result = incrementNumber(inputDigits);

            // then
            const expectedDigits = splitToDigitsList(expected, base);
            expect(result).toEqual(expectedDigits);
        });

        it('increments number when base is < 36 and with propagation', () => {
            // given
            const base = 10;
            const input = '789299';
            const expected = '789300';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const result = incrementNumber(inputDigits);

            // then
            const expectedDigits = splitToDigitsList(expected, base);
            expect(result).toEqual(expectedDigits);
        });

        it('increments number when base is > 36 and there is no propagation', () => {
            // given
            const base = 64;
            const input = '10 48 29 42 23 44';
            const expected = '10 48 29 42 23 45';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const result = incrementNumber(inputDigits);

            // then
            const expectedDigits = splitToDigitsList(expected, base);
            expect(result).toEqual(expectedDigits);
        });

        it('increments number when base is > 36 and with propagation', () => {
            // given
            const base = 64;
            const input = '10 48 30 63 63 63';
            const expected = '10 48 31 00 00 00';
            const inputDigits = splitToDigitsList(input, base);

            // when
            const result = incrementNumber(inputDigits);

            // then
            const expectedDigits = splitToDigitsList(expected, base);
            expect(result).toEqual(expectedDigits);
        });
    });

    describe('isNegative tests', () => {
        it('returns true if toString() is negative', () => {
            const input = '-200.22';
            expect(isNegative(input)).toBeTruthy();
        });

        it('returns false if toString() is positive', () => {
            const input = '200.22';
            expect(isNegative(input)).toBeFalsy();
        });
    });

    describe('complementStrToBaseStr tests', () => {
        it('converts 0 to its complement', () => {
            // given
            const input = '(0)0.0';
            const base = 10;
            const expected = '0.0';

            // then
            expect(complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });

        it('converts extended 0 to its complement', () => {
            // given
            const input = '(0).0';
            const base = 10;
            const expected = '0.0';

            // then
            expect(complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });

        it('converts positive number complement to its base string', () => {
            // given
            const input = '(0)12345.123';
            const base = 10;
            const expected = '12345.123';

            // then
            expect(complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });

        it('converts negative number complement to its base string', () => {
            // given
            const input = '(9)76543';
            const base = 10;
            const expected = '-23457';

            // then
            expect(complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });

        it('converts floating negative number complement to its base string', () => {
            // given
            const input = '(9)76543.12';
            const base = 10;
            const expected = '-23456.88';

            // then
            expect(complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });

        it('converts negative base64 number complement to its base string', () => {
            // given
            const input = '(63) 51';
            const base = 64;
            const expected = '-13';

            // then
            expect(complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });

        it('converts positive floating number starting with complement', () => {
            // given
            const input = '(0).1';
            const base = 10;
            const expected = '0.1';

            // when
            const result = complementStrToBaseStr(input, base);

            // then
            expect(result).toEqual(expected);
        });

        it('converts negative floating number starting with complement', () => {
            // given
            const input = '(9).1';
            const base = 10;
            const expected = '-0.9';

            // when
            const result = complementStrToBaseStr(input, base);

            // then
            expect(result).toEqual(expected);
        });

        describe('when base is greater than 36', () => {
            it('converts positive number complement to its base string', () => {
                // given
                const input = '(00)00';
                const base = 64;
                const expected = '00';

                // then
                expect(complementStrToBaseStr(input, base)).toEqual(
                    expected
                );
            });
        });
    });

    describe('hasValidComplementSign tests', () => {
        it('returns true if string starts with valid positive complement sign', () => {
            // given
            const input = '(0)12345.123';
            const base = 10;

            // then
            expect(hasValidComplementSign(input, base)).toBeTruthy();
        });

        it('returns true if string starts with valid negative complement sign', () => {
            // given
            const input = '(9)12345.123';
            const base = 10;

            // then
            expect(hasValidComplementSign(input, base)).toBeTruthy();
        });

        it('returns true if string starts with valid positive complement sign for base > 36', () => {
            // given
            const input = '(00)12 23 42.23';
            const base = 64;

            // then
            expect(hasValidComplementSign(input, base)).toBeTruthy();
        });

        it('returns true if string starts with valid negative complement sign for base > 36', () => {
            // given
            const input = '(63)12 23 42.12';
            const base = 64;

            // then
            expect(hasValidComplementSign(input, base)).toBeTruthy();
        });

        it('returns false if string starts with invalid sign', () => {
            // given
            const input = '(A)12345.123';
            const base = 10;

            // then
            expect(hasValidComplementSign(input, base)).toBeFalsy();
        });

        it('returns true for random string wiht valid sign', () => {
            // given
            const input = '(9)asdasda1023182312';
            const base = 10;

            // then
            expect(hasValidComplementSign(input, base)).toBeTruthy();
        });

        it('returns false if string has no complement sign', () => {
            // given
            const input = '12345.123';
            const base = 10;

            // then
            expect(hasValidComplementSign(input, base)).toBeFalsy();
        });
    });

    describe('isValidComplementStr tests', () => {
        it('returns true for valid string with valid sign', () => {
            // given
            const input = '(0)12345.123';
            const base = 10;

            // then
            expect(isValidComplementStr(input, base)).toBeTruthy();
        });

        it('returns false for valid string with invalid sign', () => {
            // given
            const input = '(A)12345.123';
            const base = 10;

            // then
            expect(isValidComplementStr(input, base)).toBeFalsy();
        });

        it('returns false for invalid string with valid sign', () => {
            // given
            const input = '(9)AAFFDD.CCC';
            const base = 10;

            // then
            expect(isValidComplementStr(input, base)).toBeFalsy();
        });

        it('returns true for valid shortened negative fractional complement', () => {
            // given
            const input = '(9).1';
            const base = 10;

            // when
            const result = isValidComplementStr(input, base);

            // then
            expect(result).toBeTruthy();
        });

        it('returns true for valid shortened positive fractional complement', () => {
            // given
            const input = '(0).1';
            const base = 10;

            // when
            const result = isValidComplementStr(input, base);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('isValidComplementOrRepresentationStr tests', () => {
        it('returns true for valid complement string', () => {
            // given
            const input = '(0)12345.123';
            const base = 10;

            // then
            expect(isValidComplementOrRepresentationStr(input, base)).toBeTruthy();
        });

        it('returns false for invalid complement str', () => {
            // given
            const input = '9)AAFFDD.CCC';
            const base = 10;

            // then
            expect(isValidComplementOrRepresentationStr(input, base)).toBeFalsy();
        });

        it('returns true for valid representation str', () => {
            // given
            const input = '12345.123';
            const base = 10;

            // then
            expect(isValidComplementOrRepresentationStr(input, base)).toBeTruthy();
        });

        it('returns true false invalid representation str', () => {
            // given
            const input = '12345.12 3';
            const base = 10;

            // then
            expect(isValidComplementOrRepresentationStr(input, base)).toBeFalsy();
        });
    });

    describe('isComplementStrNegative tests', () => {
        it('Detects negative sign in complement str', () => {
            // given
            const positive = '(0)12345.123';
            const negative = '(9)12345.123';

            // then
            expect(isComplementStrNegative(positive)).toBeFalsy();
            expect(isComplementStrNegative(negative)).toBeTruthy();
        });

        it('detects negative sign in shortened negative complement str', () => {
            // given
            const base = 10;
            const complement = '(9).1';

            // when
            const result = isComplementStrNegative(complement, base);

            // then
            expect(result).toBeTruthy();
        });

        it('should not detect negative sign in shortened positive complement str', () => {
            // given
            const base = 10;
            const complement = '(1).1';

            // when
            const result = isComplementStrNegative(complement, base);

            // then
            expect(result).toBeFalsy();
        });


        it('Detects negative sign in complement str for base > 36', () => {
            // given
            const positive = '(00)12 34 50.12 30';
            const negative = '(63)12 34 50.12 30';
            const base = 64;

            // then
            expect(
                isComplementStrNegative(positive, base)
            ).toBeFalsy();
            expect(
                isComplementStrNegative(negative, base)
            ).toBeTruthy();
        });
    });

    describe('hasDelimiter tests', () => {
        it('Detects dot delimiter', () => {
            // given
            const input = '(0)12345.123';

            // then
            expect(hasDelimiter(input)).toBeTruthy();
        });

        it('Detects colon delimiter', () => {
            // given
            const input = '(0)12345,123';

            // then
            expect(hasDelimiter(input)).toBeTruthy();
        });

        it('Returns false for string without delimiter', () => {
            // given
            const input = '(0)12345123';

            // then
            expect(hasDelimiter(input)).toBeFalsy();
        });

        it('Detects negative sign in complement str for base > 36', () => {
            // given
            const positive = '(00)12 34 50.12 30';
            const negative = '(63)12 34 50.12 30';
            const base = 64;

            // then
            expect(
                isComplementStrNegative(positive, base)
            ).toBeFalsy();
            expect(
                isComplementStrNegative(negative, base)
            ).toBeTruthy();
        });
    });

    describe('$stripComplementExtension', () => {
        it('should remove complement extension from positive str', () => {
            // given
            const input = '(0)12345.123';
            const base = 10;

            // when
            const result = stripComplementExtension(input, base);

            // then
            const expected = '12345.123';
            expect(result).toEqual(expected);
        });

        it('should remove complement extension from positive str', () => {
            // given
            const input = '(9)12345.123';
            const base = 10;

            // when
            const result = stripComplementExtension(input, base);

            // then
            const expected = '12345.123';
            expect(result).toEqual(expected);
        });

        it('should remove complement extension from b64 str', () => {
            // given
            const input = '(64) 43 12';
            const base = 64;

            // when
            const result = stripComplementExtension(input, base);

            // then
            const expected = '43 12';
            expect(result).toEqual(expected);
        });

        it('should remove complement extension from shortened complement str', () => {
            // given
            const input = '(0).123';
            const base = 10;

            // when
            const result = stripComplementExtension(input, base);

            // then
            const expected = '0.123';
            expect(result).toEqual(expected);
        });
    });
});
