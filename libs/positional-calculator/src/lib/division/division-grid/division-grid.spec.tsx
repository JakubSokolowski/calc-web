import { divideDefault, fromStringDirect } from '@calc/calc-arithmetic';
import { extractDivisionResultMeta } from './division-grid';

describe('division-grid', () => {
    describe('#extractDivisionResultMeta', () => {
        it('should return proper left offset for result row with integer operands and integer result', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1224', base).result;
            const divisor = fromStringDirect('12', base).result;
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 1;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        it('should return proper left offset for result row with integer operands and fraction result', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1224', base).result;
            const divisor = fromStringDirect('13', base).result;
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 2;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        it('should return proper left offset when dividend and divisor are the same', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1224', base).result;
            const divisor = fromStringDirect('1224', base).result;
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 3;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        it('should return proper left offset when divisor is smaller than dividend', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('122.1', base).result;
            const divisor = fromStringDirect('0.1', base).result;
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 0;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        it('should return proper left offset when divisor is greater than dividend but dividend has longer fraction part', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('11.7662', base).result;
            const divisor = fromStringDirect('231', base).result;
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 1;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        it('should return proper left offset for division by 1', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1221', base).result;
            const divisor = fromStringDirect('1', base).result;
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 0;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

    });
});
