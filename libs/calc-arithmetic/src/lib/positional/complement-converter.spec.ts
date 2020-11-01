import { ComplementConverter } from './complement-converter';

describe('getPositiveComplement tests', () => {
    it('returns valid complement for positive number', () => {
        // given
        const input = '200';
        const base = 10;
        const expected = '(0)200';
        const expectedSign = '(0)';

        // when
        const actual = ComplementConverter.getPositiveNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for positive number with 0 floating part', () => {
        // given
        const input = '200.0';
        const base = 10;
        const expected = '(0)200.0';
        const expectedSign = '(0)';

        // when
        const actual = ComplementConverter.getPositiveNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for positive floating number', () => {
        // given
        const input = '200.73';
        const base = 10;
        const expected = '(0)200.73';
        const expectedSign = '(0)';

        // when
        const actual = ComplementConverter.getPositiveNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });
});

describe('getNegativeComplement tests', () => {
    it('returns valid complement for base 10 negative number', () => {
        // given
        const input = '-200';
        const base = 10;
        const expected = '(9)800';
        const expectedSign = '(9)';

        // when
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for base 10 negative number with 0 floating part', () => {
        // given
        const input = '-200.0';
        const base = 10;
        const expected = '(9)800.0';
        const expectedSign = '(9)';

        // when
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for base 10 negative floating number', () => {
        // given
        const input = '-11001.1';
        const base = 2;
        const expected = '(1)00110.1';
        const expectedSign = '(1)';

        // when
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for base 2 negative floating number', () => {
        // given
        const input = '-200.73';
        const base = 10;
        const expected = '(9)799.27';
        const expectedSign = '(9)';

        // when
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
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
        const actual = ComplementConverter.getComplement(input, base);

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for negative number', () => {
        // given
        const input = '-200';
        const base = 10;
        const expected = '(9)800';
        const expectedSign = '(9)';

        // when
        const actual = ComplementConverter.getComplement(input, base);

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for another complement', () => {
        // given
        const input = '200';
        const base = 10;
        const expected = '(0)200';
        const expectedSign = '(0)';

        // when
        const complement = ComplementConverter.getComplement(input, base);
        const actual = ComplementConverter.getComplement(complement);

        // then
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });
});

describe('isNegative tests', () => {
    it('returns true if toString() is negative', () => {
        const input = '-200.22';
        expect(ComplementConverter.isNegative(input)).toBeTruthy();
    });

    it('returns false if toString() is positive', () => {
        const input = '200.22';
        expect(ComplementConverter.isNegative(input)).toBeFalsy();
    });
});

describe('incrementNumber tests', () => {
    it('increments number when base is < 36 and there is no propagation', () => {
        // given
        const input = ['7', '8', '9', '2', '3', '4'];
        const base = 10;
        const expected = '789235'.split('');

        // then
        expect(ComplementConverter.incrementNumber(input, base)).toEqual(
            expected
        );
    });

    it('increments number when base is < 36 and with propagation', () => {
        // given
        const input = ['7', '8', '9', '2', '9', '9'];
        const base = 10;
        const expected = '789300'.split('');

        // then
        expect(ComplementConverter.incrementNumber(input, base)).toEqual(
            expected
        );
    });

    it('increments number when base is > 36 and there is no propagation', () => {
        // given
        const input = ['10', '48', '29', '42', '23', '44'];
        const base = 64;
        const expected = '10 48 29 42 23 45'.split(' ');

        // when
        const actual = ComplementConverter.incrementNumber(input, base);

        // then
        expect(actual).toEqual(expected);
    });

    it('increments number when base is > 36 and with propagation', () => {
        // given
        const input = ['10', '48', '29', '63', '63', '63'];
        const base = 64;
        const expected = '10 48 30 00 00 00'.split(' ');

        // then
        expect(ComplementConverter.incrementNumber(input, base)).toEqual(
            expected
        );
    });
});

describe('complementStrToBaseStr tests', () => {
    it('converts 0 to its complement', () => {
        // given
        const input = '(0)0.0';
        const base = 10;
        const expected = '0.0';

        // then
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts extended 0 to its complement', () => {
        // given
        const input = '(0).0';
        const base = 10;
        const expected = '0.0';

        // then
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts positive number complement to its base string', () => {
        // given
        const input = '(0)12345.123';
        const base = 10;
        const expected = '12345.123';

        // then
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts negative number complement to its base string', () => {
        // given
        const input = '(9)76543';
        const base = 10;
        const expected = '-23457';

        // then
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts floating negative number complement to its base string', () => {
        // given
        const input = '(9)76543.12';
        const base = 10;
        const expected = '-23456.88';

        // then
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts negative base64 number complement to its base string', () => {
        // given
        const input = '(63) 51';
        const base = 64;
        const expected = '-13';

        // then
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    describe('when base is greater than 36', () => {
        it('converts positive number complement to its base string', () => {
            // given
            const input = '(00)00';
            const base = 64;
            const expected = '00';

            // then
            expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
                expected
            );
        });
    })
});

describe('hasValidComplementSign tests', () => {
    it('returns true if string starts with valid positive complement sign', () => {
        // given
        const input = '(0)12345.123';
        const base = 10;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns true if string starts with valid negative complement sign', () => {
        // given
        const input = '(9)12345.123';
        const base = 10;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns true if string starts with valid positive complement sign for base > 36', () => {
        // given
        const input = '(00)12 23 42.23';
        const base = 64;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns true if string starts with valid negative complement sign for base > 36', () => {
        // given
        const input = '(63)12 23 42.12';
        const base = 64;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns false if string starts with invalid sign', () => {
        // given
        const input = '(A)12345.123';
        const base = 10;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeFalsy();
    });

    it('returns true for random string wiht valid sign', () => {
        // given
        const input = '(9)asdasda1023182312';
        const base = 10;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns false if string has no complement sign', () => {
        // given
        const input = '12345.123';
        const base = 10;

        // then
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeFalsy();
    });
});

describe('isValidComplementStr tests', () => {
    it('returns true for valid string with valid sign', () => {
        // given
        const input = '(0)12345.123';
        const base = 10;

        // then
        expect(
            ComplementConverter.isValidComplementStr(input, base)
        ).toBeTruthy();
    });

    it('returns false for valid string with invalid sign', () => {
        // given
        const input = '(A)12345.123';
        const base = 10;

        // then
        expect(
            ComplementConverter.isValidComplementStr(input, base)
        ).toBeFalsy();
    });

    it('returns false for invalid string with valid sign', () => {
        // given
        const input = '(9)AAFFDD.CCC';
        const base = 10;

        // then
        expect(
            ComplementConverter.isValidComplementStr(input, base)
        ).toBeFalsy();
    });
});

describe('isComplementStrNegative tests', () => {
    it('Detects negative sign in complement str', () => {
        // given
        const positive = '(0)12345.123';
        const negative = '(9)12345.123';

        // then
        expect(
            ComplementConverter.isComplementStrNegative(positive)
        ).toBeFalsy();
        expect(
            ComplementConverter.isComplementStrNegative(negative)
        ).toBeTruthy();
    });

    it('Detects negative sign in complement str for base > 36', () => {
        // given
        const positive = '(00)12 34 50.12 30';
        const negative = '(63)12 34 50.12 30';
        const base = 64;

        // then
        expect(
            ComplementConverter.isComplementStrNegative(positive, base)
        ).toBeFalsy();
        expect(
            ComplementConverter.isComplementStrNegative(negative, base)
        ).toBeTruthy();
    });
});

describe('hasDelimiter tests', () => {
    it('Detects dot delimiter', () => {
        // given
        const input = '(0)12345.123';

        // then
        expect(ComplementConverter.hasDelimiter(input)).toBeTruthy();
    });

    it('Detects colon delimiter', () => {
        // given
        const input = '(0)12345,123';

        // then
        expect(ComplementConverter.hasDelimiter(input)).toBeTruthy();
    });

    it('Returns false for string without delimiter', () => {
        // given
        const input = '(0)12345123';

        // then
        expect(ComplementConverter.hasDelimiter(input)).toBeFalsy();
    });

    it('Detects negative sign in complement str for base > 36', () => {
        // given
        const positive = '(00)12 34 50.12 30';
        const negative = '(63)12 34 50.12 30';
        const base = 64;

        // then
        expect(
            ComplementConverter.isComplementStrNegative(positive, base)
        ).toBeFalsy();
        expect(
            ComplementConverter.isComplementStrNegative(negative, base)
        ).toBeTruthy();
    });
});
