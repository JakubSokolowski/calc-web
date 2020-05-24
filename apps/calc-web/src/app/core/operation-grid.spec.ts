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
            expect(result.grid.height).toEqual(expectedHeight);
            expect(result.grid.width).toEqual(expectedWidth);
        });

        it('should return grid with proper row values for conversion result', () => {
            // given
            const conversion = fromNumber(24, 2);
            const expectedRows = [
                [
                    { value: '2' },
                    { value: '4' },
                    { value: '1' },
                    { value: '2' },
                    { value: ' ' },
                    { value: '0', highlight: true }
                ],
                [
                    { value: '1' },
                    { value: '2' },
                    { value: '6' },
                    { value: ' ' },
                    { value: ' ' },
                    { value: '0', highlight: true }
                ],
                [
                    { value: ' ' },
                    { value: '6' },
                    { value: '3' },
                    { value: ' ' },
                    { value: ' ' },
                    { value: '0', highlight: true }
                ],
                [
                    { value: ' ' },
                    { value: '3' },
                    { value: '1', highlight: true },
                    { value: ' ', highlight: true },
                    { value: ' ', highlight: true },
                    { value: '1', highlight: true }
                ]
            ];

            // when
            const result = buildConversionGrid(conversion);

            // then
            expect(result.grid.values).toEqual(expectedRows);
        });
    });

    describe('#gridToAscii', () => {
        it('should return proper ascii representation', () => {
            // given
            const conversion = fromNumber(24, 2);
            const gridInfo = buildConversionGrid(conversion);
            const expected =
                '\n'
                + '2 4 | 1 2   0 \n'
                + '1 2 | 6     0 \n'
                + '  6 | 3     0 \n'
                + '  3 | 1     1 \n'
            ;

            // when
            const result = gridToAscii(gridInfo.grid);

            // then
            expect(result).toEqual(expected);
        });
    });

});
