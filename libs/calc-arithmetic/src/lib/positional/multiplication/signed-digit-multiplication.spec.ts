import { fromStringDirect } from '@calc/calc-arithmetic';
import {
    multiplyBooth,
    multiplyBoothMcSorley,
    multiplyBoothMcSorleyAlt
} from './signed-digit-multiplication';

describe('signed-digit-multiplication', () => {
    describe('#multiplyBooth', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110', base).result;

            // when
            const result = multiplyBooth([x, y]);

            // then
            const expected = '10011000010';
            const expectedComplement = '(0)10011000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });

        it('should negative multiplicand by positive multiplier', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(0)110', base).result;

            // when
            const result = multiplyBooth([x, y]);

            // then
            const expected = '-1111110';
            const expectedComplement = '(1)0000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });

        it('should multiply by number with fraction part', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110.101', base).result;

            // when
            const result = multiplyBooth([x, y]);

            // then
            const expected = '10010110100.111';
            const expectedComplement = '(0)10010110100.111';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });
    });

    describe('#multiplyBoothMcSorley', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110', base).result;

            // when
            const result = multiplyBoothMcSorley([x, y]);

            // then
            const expected = '10011000010';
            const expectedComplement = '(0)10011000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });

        it('should negative multiplicand by positive multiplier', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(0)110', base).result;

            // when
            const result = multiplyBoothMcSorley([x, y]);

            // then
            const expected = '-1111110';
            const expectedComplement = '(1)0000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });

        it('should multiply by number with fraction part', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110.101', base).result;

            // when
            const result = multiplyBoothMcSorley([x, y]);

            // then
            const expected = '10010110100.111';
            const expectedComplement = '(0)10010110100.111';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });
    });

    describe('#multiplyBoothMcSorleyAlt', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110', base).result;

            // when
            const result = multiplyBoothMcSorleyAlt([x, y]);

            // then
            const expected = '10011000010';
            const expectedComplement = '(0)10011000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });

        it('should negative multiplicand by positive multiplier', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(0)110', base).result;

            // when
            const result = multiplyBoothMcSorleyAlt([x, y]);

            // then
            const expected = '-1111110';
            const expectedComplement = '(1)0000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });

        it('should multiply by number with fraction part', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110.101', base).result;

            // when
            const result = multiplyBoothMcSorleyAlt([x, y]);

            // then
            const expected = '10010110100.111';
            const expectedComplement = '(0)10010110100.111';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(
                expectedComplement
            );
        });
    });
});
