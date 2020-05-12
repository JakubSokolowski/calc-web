import { fromNumber } from '@calc/calc-arithmetic';
import { buildConversionGrid, gridToAscii } from './operation-grid';

describe('operation-grid', () => {
    describe('#buildConversionGrid', () => {
        it('should return grid  with proper dimension for conversion result', () => {
            // given
            const conversion = fromNumber(24, 2);
            const expectedWidth = 7;
            const expectedHeight = 4;

            // when
            const result = buildConversionGrid(conversion);

            // then
            expect(result.height).toEqual(expectedHeight);
            expect(result.width).toEqual(expectedWidth);
        });
    });

    describe('#gridToAscii', () => {
        it('should return proper ascii representation', () => {
            // given
            const conversion = fromNumber(24, 2);
            const grid = buildConversionGrid(conversion);
            const expected =
                  "\n"
                + "2 4 | 1 2   0 \n"
                + "1 2 | 6     0 \n"
                + "  6 | 3     0 \n"
                + "  3 | 1     1 \n"
            ;

            // when
            const result = gridToAscii(grid);

            // then
            expect(result).toEqual(expected);
        });
    });

});
