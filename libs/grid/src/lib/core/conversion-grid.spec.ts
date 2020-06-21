import {
    buildFractionalConversionGrid,
    buildIntegralConversionGrid,
} from './conversion-grid';
import { fromNumber } from '@calc/calc-arithmetic';
import { fractionalConversionGridMock, integralConversionGridMock } from './grid-mocks';
import { HoverOperationGrid } from '@calc/grid';

describe('hover-operation-grid', () => {
    describe('#buildFractionalConversionGrid', () => {
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

    describe('#buildHooverCoversionToArbitraryGrid', () => {
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
});
