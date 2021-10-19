import { fromNumber, fromStringDirect } from '../base-converter';
import { multiplyWithExtensions } from './with-extension';


describe('multiply-with-extensions', () => {
    describe('#multiplyWithExtension', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(999, base).result;
            const multiplier = fromNumber(99, base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '98901';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply negative by positive', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('-33', base).result;
            const multiplier = fromStringDirect('723', base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '-30501';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply positive and negative in base 8', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(0)3156', base).result;
            const multiplier = fromStringDirect('(7)6423', base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '-4547726';
            const expectedComplement = '(7)3230052';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        it('should multiply two negative numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('(9)22', base).result;
            const multiplier = fromStringDirect('(9)12', base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '6864';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should follow associative property of multiplication', () => {
            // given
            const base = 10;
            const x = fromStringDirect('-88', base).result;
            const y = fromStringDirect('78', base).result;

            // when
            const xy = multiplyWithExtensions([x, y]);
            const yx = multiplyWithExtensions([y, x]);

            // then
            const expected = '-6864';
            expect(xy.numberResult.toString()).toEqual(expected);
            expect(yx.numberResult.toString()).toEqual(expected);
        });

        it('should multiply by 0', () => {
            // given
            const base = 10;
            const x = fromStringDirect('123', base).result;
            const y = fromStringDirect('0', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '0';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply 0 by number', () => {
            // given
            const base = 10;
            const x = fromStringDirect('0', base).result;
            const y = fromStringDirect('123', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '00';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply U2 numbers', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '10011000010';
            const expectedComplement = '(0)10011000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #158
        it('should multiply 1 in U2 by number between 0 and 1', () => {
            // given
            const base = 2;
            const x = fromStringDirect('1', base).result;
            const y = fromStringDirect('0.1', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '0.1';
            const expectedComplement = '(0)0.1';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #206
        it('should multiply 0 by number in U2', () => {
            // given
            const base = 2;
            const x = fromStringDirect('0', base).result;
            const y = fromStringDirect('110.101', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '0.0';
            const expectedComplement = '(0)0.0';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #206
        it('should multiply number by 0 in U2', () => {
            // given
            const base = 2;
            const x = fromStringDirect('10.111', base).result;
            const y = fromStringDirect('0', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '0.0';
            const expectedComplement = '(0)0.0';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #162
        it('should multiply 2 b64 numbers in with fraction parts', () => {
            // given
            const base = 64;
            const x = fromStringDirect('12. 34', base).result;
            const y = fromStringDirect('11 08', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '02 11 26.16';
            const expectedComplement = '(00) 02 11 26.16';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #219
        it('should multiply 2 base 7 numbers', () => {
            // given
            const base = 7;
            const x = fromStringDirect('4', base).result;
            const y = fromStringDirect('3', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '15';
            const expectedComplement = '(0)15';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #219
        it('should multiply 2 base 11 numbers', () => {
            // given
            const base = 11;
            const x = fromStringDirect('5', base).result;
            const y = fromStringDirect('94', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '429';
            const expectedComplement = '(0)429';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        // BUG #219
        it('should multiply 2 base 4 numbers', () => {
            // given
            const base = 4;
            const x = fromStringDirect('2', base).result;
            const y = fromStringDirect('3300', base).result;

            // when
            const result = multiplyWithExtensions([x, y]);

            // then
            const expected = '13200';
            const expectedComplement = '(0)13200';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });
    });
});
