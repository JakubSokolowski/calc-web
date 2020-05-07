import { ComplementConverter } from './complement-converter';

describe('getPositiveComplement tests', () => {
    it('returns valid complement for positive number', () => {
        const input = '200';
        const base = 10;
        const expected = '(0)200';
        const expectedSign = '(0)';
        const actual = ComplementConverter.getPositiveNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for positive number with 0 floating part', () => {
        const input = '200.0';
        const base = 10;
        const expected = '(0)200.0';
        const expectedSign = '(0)';
        const actual = ComplementConverter.getPositiveNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for positive floating number', () => {
        const input = '200.73';
        const base = 10;
        const expected = '(0)200.73';
        const expectedSign = '(0)';
        const actual = ComplementConverter.getPositiveNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });
});

describe('getNegativeComplement tests', () => {
    it('returns valid complement for base 10 negative number', () => {
        const input = '-200';
        const base = 10;
        const expected = '(9)800';
        const expectedSign = '(9)';
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for base 10 negative number with 0 floating part', () => {
        const input = '-200.0';
        const base = 10;
        const expected = '(9)800.0';
        const expectedSign = '(9)';
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for base 10 negative floating number', () => {
        const input = '-11001.1';
        const base = 2;
        const expected = '(1)00110.1';
        const expectedSign = '(1)';
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for base 2 negative floating number', () => {
        const input = '-200.73';
        const base = 10;
        const expected = '(9)799.27';
        const expectedSign = '(9)';
        const actual = ComplementConverter.getNegativeNumberComplement(
            input,
            base
        );
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });
});

describe('getComplement tests', () => {
    it('returns valid complement for positive number', () => {
        const input = '200';
        const base = 10;
        const expected = '(0)200';
        const expectedSign = '(0)';
        const actual = ComplementConverter.getComplement(input, base);
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for negative number', () => {
        const input = '-200';
        const base = 10;
        const expected = '(9)800';
        const expectedSign = '(9)';
        const actual = ComplementConverter.getComplement(input, base);
        expect(actual.toString()).toEqual(expected);
        expect(actual.sign).toEqual(expectedSign);
    });

    it('returns valid complement for another complement', () => {
        const input = '200';
        const base = 10;
        const expected = '(0)200';
        const expectedSign = '(0)';
        const complement = ComplementConverter.getComplement(input, base);
        const actual = ComplementConverter.getComplement(complement);
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
        const input = ['7', '8', '9', '2', '3', '4'];
        const base = 10;
        const expected = '789235'.split('');
        expect(ComplementConverter.incrementNumber(input, base)).toEqual(
            expected
        );
    });

    it('increments number when base is < 36 and with propagation', () => {
        const input = ['7', '8', '9', '2', '9', '9'];
        const base = 10;
        const expected = '789300'.split('');
        expect(ComplementConverter.incrementNumber(input, base)).toEqual(
            expected
        );
    });

    it('increments number when base is > 36 and there is no propagation', () => {
        const input = ['10', '48', '29', '42', '23', '44'];
        const base = 64;
        const expected = '10 48 29 42 23 45'.split(' ');
        const actual = ComplementConverter.incrementNumber(input, base);
        expect(actual).toEqual(expected);
    });

    it('increments number when base is > 36 and with propagation', () => {
        const input = ['10', '48', '29', '63', '63', '63'];
        const base = 64;
        const expected = '10 48 30 00 00 00'.split(' ');
        expect(ComplementConverter.incrementNumber(input, base)).toEqual(
            expected
        );
    });
});

describe('complementStrToBaseStr tests', () => {
    it('converts positive number complement to its base string', () => {
        const input = '(0)12345.123';
        const base = 10;
        const expected = '12345.123';
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts negative number complement to its base string', () => {
        const input = '(9)76543';
        const base = 10;
        const expected = '-23457';
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });

    it('converts floating negative number complement to its base string', () => {
        const input = '(9)76543.12';
        const base = 10;
        const expected = '-23456.88';
        expect(ComplementConverter.complementStrToBaseStr(input, base)).toEqual(
            expected
        );
    });
});

describe('hasValidComplementSign tests', () => {
    it('returns true if string starts with valid positive complement sign', () => {
        const input = '(0)12345.123';
        const base = 10;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns true if string starts with valid negative complement sign', () => {
        const input = '(9)12345.123';
        const base = 10;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns true if string starts with valid positive complement sign for base > 36', () => {
        const input = '(00)12 23 42.23';
        const base = 64;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns true if string starts with valid negative complement sign for base > 36', () => {
        const input = '(63)12 23 42.12';
        const base = 64;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns false if string starts with invalid sign', () => {
        const input = '(A)12345.123';
        const base = 10;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeFalsy();
    });

    it('returns true for random string wiht valid sign', () => {
        const input = '(9)asdasda1023182312';
        const base = 10;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeTruthy();
    });

    it('returns false if string has no complement sign', () => {
        const input = '12345.123';
        const base = 10;
        expect(
            ComplementConverter.hasValidComplementSign(input, base)
        ).toBeFalsy();
    });
});

describe('isValidComplementStr tests', () => {
    it('returns true for valid string with valid sign', () => {
        const input = '(0)12345.123';
        const base = 10;
        expect(
            ComplementConverter.isValidComplementStr(input, base)
        ).toBeTruthy();
    });

    it('returns false for valid string with invalid sign', () => {
        const input = '(A)12345.123';
        const base = 10;
        expect(
            ComplementConverter.isValidComplementStr(input, base)
        ).toBeFalsy();
    });

    it('returns false for invalid string with valid sign', () => {
        const input = '(9)AAFFDD.CCC';
        const base = 10;
        expect(
            ComplementConverter.isValidComplementStr(input, base)
        ).toBeFalsy();
    });
});

describe('isComplementStrNegative tests', () => {
    it('Detects negative sign in complement str', () => {
        const positive = '(0)12345.123';
        const negative = '(9)12345.123';
        expect(
            ComplementConverter.isComplementStrNegative(positive)
        ).toBeFalsy();
        expect(
            ComplementConverter.isComplementStrNegative(negative)
        ).toBeTruthy();
    });

    it('Detects negative sign in complement str for base > 36', () => {
        const positive = '(00)12 34 50.12 30';
        const negative = '(63)12 34 50.12 30';
        const base = 64;
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
        const input = '(0)12345.123';
        expect(ComplementConverter.hasDelimiter(input)).toBeTruthy();
    });

    it('Detects colon delimiter', () => {
        const input = '(0)12345,123';
        expect(ComplementConverter.hasDelimiter(input)).toBeTruthy();
    });

    it('Returns false for string without delimiter', () => {
        const input = '(0)12345123';
        expect(ComplementConverter.hasDelimiter(input)).toBeFalsy();
    });

    it('Detects negative sign in complement str for base > 36', () => {
        const positive = '(00)12 34 50.12 30';
        const negative = '(63)12 34 50.12 30';
        const base = 64;
        expect(
            ComplementConverter.isComplementStrNegative(positive, base)
        ).toBeFalsy();
        expect(
            ComplementConverter.isComplementStrNegative(negative, base)
        ).toBeTruthy();
    });
});
