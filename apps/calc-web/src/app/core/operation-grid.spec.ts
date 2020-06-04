import { fromNumber } from '@calc/calc-arithmetic';
import { buildFloatingPartConversionGrid, buildIntegralPartConversionGrid, gridToAscii } from './operation-grid';

describe('operation-grid', () => {
    describe('#buildConversionGrid', () => {
        it('should return grid  with proper dimension for conversion result', () => {
            // given
            const conversion = fromNumber(24, 2);
            const expectedWidth = 7;
            const expectedHeight = 4;

            // when
            const result = buildIntegralPartConversionGrid(conversion);

            // then
            expect(result.height).toEqual(expectedHeight);
            expect(result.width).toEqual(expectedWidth);
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
            const result = buildIntegralPartConversionGrid(conversion);

            // then
            expect(result.cellDisplayValues).toEqual(expectedRows);
        });
    });

    describe('#builFloatingPartConversionGrid', () => {
        it('should build proper grid', () => {
            // given
            const conversion = fromNumber(1.4375, 2);

            // when
            const result = buildFloatingPartConversionGrid(conversion);

            // then
            expect(result).toBeDefined();
        });
    });

    describe('#gridToAscii', () => {
        it('should return proper ascii representation', () => {
            // given
            const conversion = fromNumber(24, 2);
            const gridInfo = buildIntegralPartConversionGrid(conversion);
            const expected =
                '\n'
                + '2 4 | 1 2   0 \n'
                + '1 2 | 6     0 \n'
                + '  6 | 3     0 \n'
                + '  3 | 1     1 \n'
            ;

            // when
            const result = gridToAscii(gridInfo);

            // then
            expect(result).toEqual(expected);
        });
    });

});
