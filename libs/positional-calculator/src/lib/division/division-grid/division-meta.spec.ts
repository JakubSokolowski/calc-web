import { divideDefault, fromStringDirect } from '@calc/calc-arithmetic';
import { extractDivisionResultMeta } from './divison-meta';

describe('division-meta', () => {
    describe('#extractDivisionResultMeta', () => {
        it('should return proper left offset for result row with integer operands and integer result', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1224', base);
            const divisor = fromStringDirect('12', base);
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
            const dividend = fromStringDirect('1224', base);
            const divisor = fromStringDirect('13', base);
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
            const dividend = fromStringDirect('1224', base);
            const divisor = fromStringDirect('1224', base);
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
            const dividend = fromStringDirect('122.1', base);
            const divisor = fromStringDirect('0.1', base);
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
            const dividend = fromStringDirect('11.7662', base);
            const divisor = fromStringDirect('231', base);
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 0;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        it('should return proper left offset for division by 1', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1221', base);
            const divisor = fromStringDirect('1', base);
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 0;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        // BUG #194
        it('should return proper left offset for division by 1 when dividend has fraction part', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('1230.99903', base);
            const divisor = fromStringDirect('1', base);
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 0;
            expect(meta.resultRowLeftOffset).toEqual(expected);
        });

        // BUG #240
        it('should return proper total width result has multiple leading zero digits', () => {
            // given
            const base = 10;
            const dividend = fromStringDirect('121', base);
            const divisor = fromStringDirect('123', base);
            const result = divideDefault([dividend, divisor]);

            // when
            const meta = extractDivisionResultMeta(result);

            // then
            const expected = 9;
            expect(meta.totalWidth).toEqual(expected);
        });
    });
});
