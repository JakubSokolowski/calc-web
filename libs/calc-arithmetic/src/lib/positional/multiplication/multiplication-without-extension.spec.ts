import { fromStringDirect } from '@calc/calc-arithmetic';
import { multiplyWithoutExtension } from './multiplication-without-extension';

describe('multiplication-without-extension', () => {
    describe('#multiplyWithoutExtension', () => {
        it('should multiply two negative numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('(9)6745', base).result;
            const multiplier = fromStringDirect('(9)8123', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '6109635';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply negative number by positive', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(7)45', base).result;
            const multiplier = fromStringDirect('(0)723', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '-30501';
            const expectedComplement = '(7)47277';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });


        it('should multiply positive number by negative', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(0)3156', base).result;
            const multiplier = fromStringDirect('(7)6423', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '-4547726';
            const expectedComplement = '(7)3230052';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });
    });
});
