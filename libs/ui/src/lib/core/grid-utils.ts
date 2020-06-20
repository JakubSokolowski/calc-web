import { intersect, range } from '@calc/utils';
import { CellPosition } from '../models/cell-position';
import { CellGroup } from '../models/cell-group';
import { GridCellConfig } from '../models/grid-cell-config';
import { GridCellDisplayPreset } from '../models/grid-cell-display-preset';
import { CellCoords } from '../models/cell-coords';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { LineType } from '../models/line-type';
import { GridLookup } from '../models/grid-lookup';


export function buildEmptyGrid(width: number, height: number): GridCellConfig[][] {
    return [...Array(height).keys()].map(() => buildEmptyRow(width));
}

function buildEmptyRow(width: number): GridCellConfig[] {
    const preset: GridCellDisplayPreset = {
        default: 'default-cell'
    };

    return [...Array(width).keys()].map(() => ({ content: '', preset }));
}

export function buildRowGroups(cells: GridCellConfig[][], contentProps?: any, builder?: any): CellGroup[] {
    if (!cells.length) return [];

    return cells.map((row, rowIndex) => {
        const [start, end] = getStartEndRowCoords(row, rowIndex);
        const cells = groupCellsInStraightLine(start, end);
        return {
            cells: cells,
            contentProps: contentProps,
            contentBuilder: builder
        };
    });
}

export function buildRowGroup(row: GridCellConfig[], rowIndex: number, contentProps?: any, contentBuilder?: any): CellGroup {
    const [start, end] = getStartEndRowCoords(row, rowIndex);
    return {
        cells: groupCellsInStraightLine(start, end),
        contentBuilder: contentBuilder,
        contentProps: contentProps
    };
}

export function buildColumnGroups(cells: GridCellConfig[][], contentProps?: any[], contentBuilder?: any): CellGroup[] {
    if (!cells.length) return [];

    const groups: CellGroup[] = [];

    for (let x = 0; x < cells[0].length; x++) {
        const start: CellCoords = { x, y: 0 };
        const end: CellCoords = { x, y: cells.length - 1 };
        const group: CellGroup = {
            cells: groupCellsInStraightLine(start, end),
            contentProps: (contentProps && contentProps[x]) ? contentProps[x] : '',
            contentBuilder: contentBuilder
        };
        groups.push(group);
    }

    return groups;
}

export function buildCellGroupLookup(groups: CellGroup[]): GridLookup {
    const sortedGroups = groups.sort((a, b) => {
        return a.cells.length > b.cells.length ? 1 : -1;
    });

    return sortedGroups.reduce((lookup, group) => {
        group.cells.forEach((cell) => {
            const cellKey = `${cell.x}-${cell.y}`;

            if (lookup[cellKey]) {
                lookup[cellKey].push(group);
            } else {
                lookup[cellKey] = [group];
            }
        });

        return lookup;
    }, {} as GridLookup);
}

function getStartEndRowCoords(row: GridCellConfig[], rowIndex: number): [CellCoords, CellCoords] {
    const start: CellCoords = { x: 0, y: rowIndex };
    const end: CellCoords = { x: row.length - 1, y: rowIndex };
    return [start, end];
}

export function groupCellsInStraightLine(a: CellCoords, b: CellCoords): CellCoords[] {
    const horizontalLine = a.y === b.y;
    const verticalLine = a.x === b.x;

    if (horizontalLine) {
        const { start, range } = getCellRange(a.x, b.x);
        return range.map((x) => ({ x: start + x, y: a.y }));
    }

    if (verticalLine) {
        const { start, range } = getCellRange(a.y, b.y);
        return range.map((y) => ({ y: start + y, x: a.x }));
    }

    return [];
}

interface CellRange {
    start: number;
    range: number[];
}

function getCellRange(a: number, b: number): CellRange {
    const to = Math.max(a, b);
    const from = Math.min(a, b);
    const diff = to - from;

    return { range: range(0, diff), start: from };
}


export function getOutlierAtPosition(cellGroup: CellGroup, position: CellPosition): CellCoords {
    if (!cellGroup.cells) return { x: -1, y: -1 };

    return {
        [CellPosition.TopRight]: getTopRightOutlier(cellGroup),
        [CellPosition.TopLeft]: getTopLeftOutlier(cellGroup),
        [CellPosition.Top]: getTopMiddleOutlier(cellGroup)
    } [position] || getTopRightOutlier(cellGroup);
}

function getTopMiddleOutlier(cellGroup: CellGroup): CellCoords {
    const topmost = getTopMostCells(cellGroup);
    return topmost[Math.floor((topmost.length - 1) / 2)];
}

function getTopMostCells(cellGroup: CellGroup): CellCoords[] {
    return getOutliers(cellGroup, Math.min, 'y');
}

function getBottommostCells(cellGroup: CellGroup): CellCoords[] {
    return getOutliers(cellGroup, Math.max, 'y');
}

function getRightmostCells(cellGroup: CellGroup): CellCoords[] {
    return getOutliers(cellGroup, Math.max, 'x');
}

function getLeftmostCells(cellGroup: CellGroup): CellCoords[] {
    return getOutliers(cellGroup, Math.min, 'x');
}

function getTopRightOutlier(cellGroup: CellGroup): CellCoords {
    const topmost = getTopMostCells(cellGroup);
    const rightmost = getRightmostCells(cellGroup);
    const [topRight] = intersect(topmost, rightmost, coordsEqual);
    return topRight || topmost[0];
}

function getTopLeftOutlier(cellGroup: CellGroup): CellCoords {
    const topmost = getTopMostCells(cellGroup);
    const leftmost = getLeftmostCells(cellGroup);

    const [topRight] = intersect(topmost, leftmost, coordsEqual);
    return topRight || topmost[0];
}

export function coordsEqual(a: CellCoords, b: CellCoords): boolean {
    return a.x === b.x && a.y === b.y;
}

function getOutliers(cellGroup: CellGroup, minmax: (...values: number[]) => number, key: string): CellCoords[] {
    const { cells } = cellGroup;
    const outlier = minmax(...cells.map((cell) => cell[key]));
    return cells.filter((cell) => cell[key] === outlier);
}

export function gridToAscii(grid: HoverOperationGrid): string {
    let ascii = '\n';

    grid.values.forEach((row, rowIndex) => {
        const horizontalLine = grid.lines.find((line) => {
            return line.type === LineType.Horizontal && line.index === rowIndex;
        });

        if (horizontalLine) {
            ascii = ascii.concat('_'.repeat(grid.values[0].length).concat('\n'));
            return;
        }

        row.forEach((cell, columnIndex) => {
            ascii = ascii.concat(cell.content + ' ');
            const verticalLine = grid.lines.find((line) => {
                return line.type === LineType.Vertical && line.index === columnIndex;
            });

            if (verticalLine) {
                ascii = ascii.concat('| ');
            }
        });
        ascii = ascii.concat('\n');
    });

    return ascii;
}

