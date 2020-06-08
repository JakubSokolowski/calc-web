import { CellCoords, CellGroup, gridToAscii } from '@calc/ui';
import {
    buildCellGroupLookup,
    buildColumnGroups,
    buildEmptyGrid,
    buildRowGroups,
    getOutlierAtPosition,
    groupCellsInStraightLine
} from './grid-utils';
import { fromNumber } from '@calc/calc-arithmetic';
import { buildIntegralConversionGrid } from './conversion-grid';
import { CellPosition } from '../models/cell-position';
import { GridLookup } from '../models/grid-lookup';

describe('grid-utils', () => {
    describe('#groupCellsInStraightLine', () => {
        it('should return array of coordinates between two cells in a vertical line', () => {
            // given
            const a: CellCoords = { x: 0, y: 0 };
            const b: CellCoords = { x: 0, y: 3 };

            const expectedCoords: CellCoords[] = [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 0, y: 3 }
            ];

            // when
            const result = groupCellsInStraightLine(a, b);

            // then
            expect(result).toEqual(expectedCoords);
        });

        it('should return array of coordinates between two cells in a horizontal line', () => {
            // given
            const a: CellCoords = { x: 3, y: 0 };
            const b: CellCoords = { x: 0, y: 0 };

            const expectedCoords: CellCoords[] = [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 }
            ];

            // when
            const result = groupCellsInStraightLine(a, b);

            // then
            expect(result).toEqual(expectedCoords);
        });
    });

    describe('#buildRowGroups', () => {
        it('should return cell groups for each row of grid', () => {
            // given
            const grid = buildEmptyGrid(2, 3);
            const expectedGroups: CellGroup[] = [
                {
                    cells: [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 }
                    ],
                    contentBuilder: undefined,
                    contentProps: undefined
                },
                {
                    cells: [
                        { x: 0, y: 1 },
                        { x: 1, y: 1 }
                    ],
                    contentBuilder: undefined,
                    contentProps: undefined
                },
                {
                    cells: [
                        { x: 0, y: 2 },
                        { x: 1, y: 2 }
                    ],
                    contentBuilder: undefined,
                    contentProps: undefined
                }
            ];

            // when
            const result = buildRowGroups(grid);

            // then
            expect(result).toEqual(expectedGroups);
        });
    });

    describe('#buildColumnGroups', () => {
        it('should return cells groups for each row of grid', () => {
            // given
            const grid = buildEmptyGrid(2, 3);
            const expectedGroups: CellGroup[] = [
                {
                    cells: [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 }
                    ],
                    contentBuilder: undefined,
                    contentProps: ''
                },
                {
                    cells: [
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 }
                    ],
                    contentBuilder: undefined,
                    contentProps: ''
                }
            ];

            // when
            const result = buildColumnGroups(grid);

            // then
            expect(result).toEqual(expectedGroups);
        });
    });

    describe('#buildCellGroupLookup', () => {
        // given
        const grid = buildEmptyGrid(2, 3);
        const rowGroups = buildRowGroups(grid);
        const columnGroups = buildColumnGroups(grid);
        const groups = [...rowGroups, ...columnGroups];

        let lookup: GridLookup;

        beforeEach(() => {
            // when
            lookup = buildCellGroupLookup(groups);
        });

        it('should build coord => cell groups lookup that has 2 groups for each cell', () => {
            // then
            expect(Object.values(lookup).every((value) => value.length === 2)).toBeTruthy();
        });

        it('lookup for key should return groups sorted by group size ascending', () => {
            // given
            const key = '0-0';
            const expectedGroups: CellGroup[] = [
                {
                    cells: [
                        { x: 0, y: 0 },
                        { x: 1, y: 0 }
                    ],
                    contentBuilder: undefined,
                    contentProps: undefined
                },
                {
                    cells: [
                        { x: 0, y: 0 },
                        { x: 0, y: 1 },
                        { x: 0, y: 2 }
                    ],
                    contentBuilder: undefined,
                    contentProps: ''
                }
            ];

            // then
            expect(lookup[key]).toEqual(expectedGroups);
        });
    });

    describe('#getOutlierAtPosition', () => {
        it('should return the most top-right cell when position is TopRight', () => {
            // given
            const position = CellPosition.TopRight;
            const group: CellGroup = {
                cells: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                    { x: 2, y: 0 }
                ]
            };

            const expected: CellCoords = {
                x: 2,
                y: 0
            };

            // when
            const result = getOutlierAtPosition(group, position);

            // then
            expect(result).toEqual(expected);
        });
    });

    describe('#gridToAscii', () => {
        it('should return proper ascii representation', () => {
            // given
            const conversion = fromNumber(24, 2);
            const gridInfo = buildIntegralConversionGrid(conversion);
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
