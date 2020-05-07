import { BaseDigits } from './base-digits';

describe('GetDigit sub 36 radix test', () => {
    it('returns proper digit for value 10 in hexadecimal', () => {
        expect(BaseDigits.getDigit(10, 16)).toBe('A');
    });
    it('throws error, if requested digit is greater than radix', () => {
        expect(() => {
            BaseDigits.getDigit(16, 10);
        }).toThrow();
    });
});
describe('GetValue tests', () => {
    it('returns proper value for digit "A" in base 16', () => {
        expect(BaseDigits.getValue('A', 16)).toBe(10);
    });
    it('returns proper value for digit "10" in base 64', () => {
        expect(BaseDigits.getValue('10', 64)).toBe(10);
    });
    it('returns undefined if requested value is not in object', () => {
        expect(BaseDigits.getValue('AAA', 10)).toBe(-1);
    });
    it('returns undefined if requested value is equal to radix (not in object)', () => {
        expect(BaseDigits.getValue('10', 10)).toBe(-1);
    });
    it('throws when radix is invalid', () => {
        expect(() => {
            BaseDigits.getValue('10', 100);
        }).toThrow();
    });
});
describe('GetDigit above 36 radix test', () => {
    it('returns proper digit for value 10 in base 64', () => {
        expect(BaseDigits.getDigit(10, 64)).toBe('10');
    });
    it('adds zero before sub-10 digits in base 64', () => {
        expect(BaseDigits.getDigit(8, 64)).toBe('08');
    });
    it('returns proper digit for value 63 in base 64', () => {
        expect(BaseDigits.getDigit(63, 64)).toBe('63');
    });
    it('throws error, if requested digit is equal to radix', () => {
        expect(() => {
            BaseDigits.getDigit(64, 64);
        }).toThrow();
    });
    it('throws error, if requested digit is greater than radix', () => {
        expect(() => {
            BaseDigits.getDigit(65, 64);
        }).toThrow();
    });
    it('returns proper digits after radix change from 10 to 64', () => {
        expect(BaseDigits.getDigit(9, 10)).toBe('9');
        expect(BaseDigits.getDigit(63, 64)).toBe('63');
    });
    it('throws when radix is invalid', () => {
        expect(() => {
            BaseDigits.getDigit(10, 100);
        }).toThrow();
    });
});
