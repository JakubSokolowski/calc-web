import { buildFractionalConversionGrid, buildIntegralConversionGrid } from './conversion-grid';
import { fromNumber, fromString } from '@calc/calc-arithmetic';
import {
    fractionalConversionExactGridMock,
    fractionalConversionGridMock,
    integralConversionGridMock
} from './grid-mocks';
import { GridLine, HoverOperationGrid, LineType } from '@calc/grid';

describe('hover-operation-grid', () => {
    describe('#buildFractionalConversionGrid', () => {
        describe('when building grid from conversion', () => {
            // given
            let grid: HoverOperationGrid;
            const conversion = fromNumber(24.23, 2);
            const precision = 5;

            beforeEach(() => {
                // when
                grid = buildFractionalConversionGrid(conversion, precision);
            });

            it('it should return grid with vertical line separating multiplicand and multiplier', () => {
                // then
                expect(grid.lines).toEqual(fractionalConversionGridMock.lines);
            });

            it('it should return grid with cell groups for each row', () => {
                // then
                expect(grid.groups).toEqual(fractionalConversionGridMock.groups);
            });

            it('it should return grid with proper cell values', () => {
                // then
                expect(grid.values).toEqual(fractionalConversionGridMock.values);
            });
        });

        describe('edge cases', () => {
            // ISSUE_ID: 32
            it('should return proper gird values for such conversion which subsequent multiplicands are shorter than previous', () => {
                // given
                const conv = fromNumber(24.125, 2);
                const precision = 5;

                // when
                const grid = buildFractionalConversionGrid(conv, precision);

                // then
                expect(grid.values).toEqual(fractionalConversionExactGridMock.values);
            });
        });
    });


    describe('#buildhoverCoversionToArbitraryGrid', () => {
        describe('when building integral grid from conversion', () => {
            // given
            let grid: HoverOperationGrid;
            const conversion = fromNumber(24.23, 2);

            beforeEach(() => {
                // when
                grid = buildIntegralConversionGrid(conversion);
            });

            it('it should return grid with vertical line separating dividend and divisor', () => {
                // then
                expect(grid.lines).toEqual(integralConversionGridMock.lines);
            });

            it('it should return grid with cell groups for each row', () => {
                // then
                expect(grid.groups).toEqual(integralConversionGridMock.groups);
            });

            it('it should return grid with proper cell values', () => {
                // then
                expect(grid.values).toEqual(integralConversionGridMock.values);
            });
        });

        describe('edge cases', () => {
            // ISSUE_ID: 41
            it('should return grid with proper conversion lines for conversion to base 10', () => {
                // given
                const conv = fromString('111001011.01100', 2, 10);

                // when
                const grid = buildIntegralConversionGrid(conv);

                // then
                const lines: GridLine[] = [
                    {
                        type: LineType.Vertical,
                        index: 2
                    }
                ];
                expect(grid.lines).toEqual(lines);
            });
        })
    });
});
