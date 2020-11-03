import { intersect, range } from '@calc/utils';
import { CellPosition } from '../models/cell-position';
import { CellGroup } from '../models/cell-group';
import { GridCellConfig } from '../models/grid-cell-config';
import { GridCellDisplayPreset } from '../models/grid-cell-display-preset';
import { CellCoords } from '../models/cell-coords';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { LineType } from '../models/line-type';
import { GridLookup } from '../models/grid-lookup';
import { BaseDigits, Digit, isSubtractionOperand, OperationResult, PositionResult } from '@calc/calc-arithmetic';
import { GridLine } from '../..';
import { LineDefinition } from '../models/grid-line';


export function buildEmptyGrid(width: number, height: number): GridCellConfig[][] {
    return [...Array(height).keys()].map(() => buildEmptyRow(width));
}

function buildEmptyRow(width: number): GridCellConfig[] {
    const preset: GridCellDisplayPreset = {
        default: 'defaultCell'
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

export interface DigitsInfo {
    mostSignificantPosition: number;
    totalWidth: number;
    numOperands: number;
    numIntegerPartDigits: number;
    numFractionalDigits: number;
}

export function extractResultMeta(result: OperationResult<Digit, PositionResult<Digit>>): DigitsInfo {
    const maxDigitsInRow = maxNumOfDigitsInRow(result);

    return {
        totalWidth: maxDigitsInRow + 1,
        mostSignificantPosition: mostSignificantPosition(result),
        numIntegerPartDigits: result.numberResult.integerPart.length,
        numFractionalDigits: result.numberResult.fractionalPart.length,
        numOperands: result.operands.length
    };
}

function maxNumOfDigitsInRow(result: OperationResult<Digit, PositionResult<Digit>>): number {
    const resultLength = result.resultDigits.length;
    const maxOperandLength = Math.max(...result.operands.map((op) => op.length));

    return Math.max(resultLength, maxOperandLength);
}

function mostSignificantPosition(result: OperationResult<Digit, PositionResult<Digit>>): number {
    const resultMSP = result.resultDigits[0].position;
    const operandMSP = Math.max(...result.operands.map((op) => op[0].position));

    return Math.max(resultMSP, operandMSP);
}

export function digitsToCellConfig<T extends Digit>(digits: T[]): GridCellConfig[] {
    return digits.map((digit) => {
        const content = digit.representationInBase;
        const cell: GridCellConfig = {
            content
        };

        if (isSubtractionOperand(digit)) {
            cell.preset = {
                default: 'crossedOutCell',
                hover: 'crossedOutHoverCell'
            };
        }

        return cell;
    });
}

export function padWithEmptyCells(cells: GridCellConfig[], desiredWidth: number, direction?: 'Left' | 'Right'): GridCellConfig[] {
    if (desiredWidth <= cells.length) return cells;
    const missingCellsCount = desiredWidth - cells.length;
    const newEmptyCells: GridCellConfig[] = [...Array(missingCellsCount).keys()].map(() => ({ content: '' }));

    return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

export function operandDigitsToCellConfig<T extends Digit>(digits: T[], info: DigitsInfo, base: number): GridCellConfig[] {
    const indexOfZeroPositionDigit = digits.findIndex((digit) => digit.position === 0);
    if (indexOfZeroPositionDigit === -1) return [];

    const integerPartDigits = digits.slice(0, indexOfZeroPositionDigit + 1);
    const fractionalPartDigits = digits.slice(indexOfZeroPositionDigit + 1);

    const paddedIntegerPartDigits = padWithZeroDigitCells(integerPartDigits, info.numIntegerPartDigits + 2, base, 'Left');
    const paddedFractionalPartDigits = padWithZeroDigitCells(fractionalPartDigits, info.numFractionalDigits, base, 'Right');

    return padWithEmptyCells([...paddedIntegerPartDigits, ...paddedFractionalPartDigits], info.totalWidth, 'Left');
}

export function padWithZeroDigitCells<T extends Digit>(digits: T[], desiredWidth: number, base: number, direction?: 'Left' | 'Right'): GridCellConfig[] {
    const cells = digitsToCellConfig(digits);
    if (desiredWidth <= digits.length) return cells;

    const missingCellsCount = desiredWidth - digits.length;
    const newEmptyCells: GridCellConfig[] = [...Array(missingCellsCount).keys()].map(() => {
        const value = direction === 'Left' ? '' : BaseDigits.getDigit(0, base);
        return ({ content: value });
    });

    return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

export function getUnderline(carryRows: GridCellConfig[][]): GridLine {
    const index = carryRows.length - 1;
    const span: LineDefinition = {
        from: index > 0
            ? carryRows[index].findIndex((cell) => cell.content !== '')
            : 0
    };

    return {
        type: LineType.Horizontal,
        index,
        span
    };
}
