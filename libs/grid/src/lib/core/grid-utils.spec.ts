import {
    CellConfig,
    CellGroup,
    DigitsInfo,
    digitsToCellConfig,
    extractResultMeta,
    findGroupTriggeredByCell,
    GridCellConfig,
    gridToAscii,
    operandDigitsToCellConfig,
    padWithEmptyCells
} from '@calc/grid';
import {
    buildCellGroupLookup,
    buildColumnGroups,
    buildEmptyGrid,
    buildRowGroups,
    getOutlierAtPosition,
    groupCellsInStraightLine
} from './grid-utils';
import { addPositionalNumbers, fromNumber, subtractPositionalNumbers } from '@calc/calc-arithmetic';
import { buildIntegralConversionGrid } from './conversion-grid';
import { CellPosition } from '../models/cell-position';
import { GridLookup } from '../models/grid-lookup';

describe('grid-utils', () => {
    describe('#groupCellsInStraightLine', () => {
        it('should return array of coordinates between two cells in a vertical line', () => {
            // given
            const a: CellConfig = { x: 0, y: 0 };
            const b: CellConfig = { x: 0, y: 3 };

            const expectedCoords: CellConfig[] = [
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
            const a: CellConfig = { x: 3, y: 0 };
            const b: CellConfig = { x: 0, y: 0 };

            const expectedCoords: CellConfig[] = [
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

            const expected: CellConfig = {
                x: 2,
                y: 0
            };

            // when
            const result = getOutlierAtPosition(group, position);

            // then
            expect(result).toEqual(expected);
        });

        it('should return the most top-left cell when position is TopLeft', () => {
            // given
            const position = CellPosition.TopLeft;
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

            const expected: CellConfig = {
                x: 0,
                y: 0
            };

            // when
            const result = getOutlierAtPosition(group, position);

            // then
            expect(result).toEqual(expected);
        });

        it('should return the middle top-most cell when position is Top', () => {
            // given
            const position = CellPosition.Top;
            const group: CellGroup = {
                cells: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                    { x: 2, y: 0 }
                ]
            };

            const expected: CellConfig = {
                x: 1,
                y: 0
            };

            // when
            const result = getOutlierAtPosition(group, position);

            // then
            expect(result).toEqual(expected);
        });

        it('should return the most top-right cells when position is not yet', () => {
            // given
            const position = CellPosition.Bottom;
            const group: CellGroup = {
                cells: [
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 },
                    { x: 0, y: 1 },
                    { x: 1, y: 1 },
                    { x: 2, y: 1 },
                    { x: 2, y: 0 }
                ]
            };

            const expected: CellConfig = {
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

    describe('#extractResultMeta', () => {
        describe('when extracting from addition result', () => {
            // given
            const a = fromNumber(24, 10).result;
            const b = fromNumber(496, 10).result;
            const result = addPositionalNumbers([a, b]);

            let meta: DigitsInfo;

            beforeAll(() => {
                // when
                meta = extractResultMeta(result);
            });

            it('should return info about total width of grid need to fit all operands (with complement extension)', () => {
                // then
                const expected = 5;
                expect(meta.totalWidth).toEqual(expected);
            });


            it('should return info about most significant position in operands/result digits  (with complement extension)', () => {
                // then
                const expected = 3;
                expect(meta.mostSignificantPosition).toEqual(expected);
            });


            it('should return info about num of result integer/fractional parts digits', () => {
                // then
                const expectedInteger = 3;
                const expectedFractional = 0;
                expect(meta.numResultIntegerPartDigits).toEqual(expectedInteger);
                expect(meta.numResultFractionalPartDigits).toEqual(expectedFractional);
            });


            it('should return info about num of operands', () => {
                // then
                const expected = 2;
                expect(meta.numOperands).toEqual(expected);
            });
        });
    });

    describe('#digitsToCellConfig', () => {
        describe('when building from addition result digits', () => {
            it('should return cells with proper content', () => {
                // given
                const a = fromNumber(19, 10).result;
                const b = fromNumber(10, 10).result;
                const result = addPositionalNumbers([a, b]);
                const digits = result.resultDigits;

                // when
                const cells = digitsToCellConfig(digits);

                // then
                const expected: GridCellConfig[] = [
                    { content: '(0)' },
                    { content: '2' },
                    { content: '9' }
                ];
                expect(cells).toEqual(expected);
            });
        });

        describe('when building from subtraction result digits', () => {
            it('should return cells with proper content', () => {
                // given
                const a = fromNumber(19, 10).result;
                const b = fromNumber(10, 10).result;
                const result = subtractPositionalNumbers([a, b]);
                const digits = result.resultDigits;

                // when
                const cells = digitsToCellConfig(digits);

                // then
                const expected: GridCellConfig[] = [
                    { content: '(0)' },
                    { content: '9' }
                ];
                expect(cells).toEqual(expected);
            });
        });

        describe('when building from subtraction operands', () => {
            it('should return cells with proper content and style preset', () => {
                // given
                const a = fromNumber(24, 10).result;
                const b = fromNumber(19, 10).result;
                const result = subtractPositionalNumbers([a, b]);
                const digits = result.positionResults[0].operands;

                // when
                const cells = digitsToCellConfig(digits);

                // then
                const expected: GridCellConfig[] = [
                    {
                        content: '4',
                        preset: {
                            'default': 'crossedOutCell',
                            hover: 'crossedOutHoverCell'
                        }
                    },
                    {
                        content: '9'
                    }
                ];
                expect(cells).toEqual(expected);
            });
        });
    });

    describe('#padWithEmptyCells', () => {
        it('should return initial cells if the width is already reached', () => {
            // given
            const direction = 'Left';
            const desiredWidth = 2;
            const cells: GridCellConfig [] = [
                { content: '1' },
                { content: '2' }
            ];

            // when
            const result = padWithEmptyCells(cells, desiredWidth, direction);

            // then
            expect(result).toEqual(cells);
        });

        it('should pad cells left until desired width is reached when direction is Left', () => {
            // given
            const direction = 'Left';
            const desiredWidth = 3;
            const cells: GridCellConfig [] = [
                { content: '1' }
            ];

            // when
            const result = padWithEmptyCells(cells, desiredWidth, direction);

            // then
            const expected: GridCellConfig[] = [
                { content: '' },
                { content: '' },
                { content: '1' }
            ];
            expect(result).toEqual(expected);
        });

        it('should pad cells right until desired width is reached when direction is Rigt', () => {
            // given
            const direction = 'Right';
            const desiredWidth = 3;
            const cells: GridCellConfig [] = [
                { content: '1' }
            ];

            // when
            const result = padWithEmptyCells(cells, desiredWidth, direction);

            // then
            const expected: GridCellConfig[] = [
                { content: '1' },
                { content: '' },
                { content: '' }
            ];
            expect(result).toEqual(expected);
        });
    });

    describe('#operandDigitsToCellConfig', () => {
        it('should convert operands to cell config', () => {
            // given
            const base = 10;
            const a = fromNumber(24.5, base).result;
            const b = fromNumber(496, base).result;
            const result = addPositionalNumbers([a, b]);
            const operands = result.operands[0];
            const info = extractResultMeta(result);

            // when
            const cells = operandDigitsToCellConfig(operands, info, base);

            // then
            const expected: GridCellConfig[] = [
                { content: '' },
                { content: '' },
                { content: '(0)' },
                { content: '2' },
                { content: '4' },
                { content: '5' }
            ];
            expect(cells).toEqual(expected);
        });
    });

    describe('#findGrouTriggeredByCell', () => {
        it('should return undefined when cell coords do not match any cell in any group', () => {
            // given
            const cell: CellConfig = {
                x: 2,
                y: 2
            };

            const groups: CellGroup[] = [
                {
                    cells: [{ y: 0, x: 0 }, { y: 1, x: 0 }, { y: 2, x: 0 }],
                },
                {
                    cells: [{ y: 0, x: 1 }, { y: 1, x: 1 }, { y: 2, x: 1 }]
                }
            ];

            // when
            const result = findGroupTriggeredByCell(cell, groups);

            // then
            expect(result).toBeUndefined();
        });

        it('should return undefined when cell coords match some cell in some group, but that cell has but hover trigger is prevented for that cell', () => {
            // given
            const cell: CellConfig = {
                x: 0,
                y: 1
            };

            const groups: CellGroup[] = [
                {
                    cells: [{ y: 0, x: 0 }, { y: 1, x: 0, preventGroupTrigger: true }, { y: 2, x: 0 }],
                },
                {
                    cells: [{ y: 0, x: 1 }, { y: 1, x: 1 }, { y: 2, x: 1 }]
                }
            ];

            // when
            const result = findGroupTriggeredByCell(cell, groups);

            // then
            expect(result).toBeUndefined();
        });


        it('should return triggered group when coords match and trigger is not prevented', () => {
            // given
            const cell: CellConfig = {
                x: 0,
                y: 1
            };

            const groups: CellGroup[] = [
                {
                    cells: [{ y: 0, x: 0 }, { y: 1, x: 0 }, { y: 2, x: 0 }],
                },
                {
                    cells: [{ y: 0, x: 1 }, { y: 1, x: 1 }, { y: 2, x: 1 }]
                }
            ];

            // when
            const result = findGroupTriggeredByCell(cell, groups);

            // then
            expect(result).toEqual(groups[0]);
        });
    })
});
