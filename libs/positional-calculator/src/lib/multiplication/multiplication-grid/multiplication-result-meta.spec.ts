import { fromStringDirect, multiplyWithExtensions } from '@calc/calc-arithmetic';
import { extractMultiplicationResultMeta } from './multiplication-result-meta';

describe('#extractMultiplicationResultMeta', () => {
    describe('when building meta for WithExtension result', () => {

        // BUG #160
        it('should return proper total width for two positive extensions', () => {
            // given
            const base = 2;
            const multiplicand = fromStringDirect('1.1', base);
            const multiplier = fromStringDirect('1', base);
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // when
            const meta = extractMultiplicationResultMeta(result);

            // then
            const expected = 5;
            expect(meta.totalWidth).toEqual(expected);
        });

        it('should return proper total width for one negative extension', () => {
            // given
            const base = 2;
            const multiplicand = fromStringDirect('(0)1101001.101', base);
            const multiplier = fromStringDirect('(1)1101.111', base);
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // when
            const meta = extractMultiplicationResultMeta(result);

            // then
            const expected = 19;
            expect(meta.totalWidth).toEqual(expected);
        });
    });
});
