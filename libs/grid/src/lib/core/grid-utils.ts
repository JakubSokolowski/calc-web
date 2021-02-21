import { intersect, range } from '@calc/utils';
import { CellPosition } from '../models/cell-position';
import { CellGroup } from '../models/cell-group';
import { GridCellConfig } from '../models/grid-cell-config';
import { GridCellDisplayPreset } from '../models/grid-cell-display-preset';
import { CellConfig } from '../models/cell-config';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { LineType } from '../models/line-type';
import { GridLookup } from '../models/grid-lookup';
import { BaseDigits, Digit, isSubtractionOperand, OperationResult, PositionResult } from '@calc/calc-arithmetic';
import { GridCellEvent } from '../..';
import { isFunction, isString } from 'util';


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

export function buildColumnGroups(cells: GridCellConfig[][], contentProps?: any[], yOffset = 0, contentBuilder?: any, preventTriggerPredicate?: PreventTriggerPredicate): CellGroup[] {
    if (!cells.length) return [];

    console.log('startY')

    const groups: CellGroup[] = [];

    for (let x = 0; x < cells[0].length; x++) {
        const start: CellConfig = { x, y: yOffset };
        const end: CellConfig = { x, y: cells.length - 1 + yOffset };
        const group: CellGroup = {
            cells: groupCellsInStraightLine(start, end, preventTriggerPredicate),
            contentProps: (contentProps && contentProps[x]) ? contentProps[x] : '',
            contentBuilder: contentBuilder
        };
        groups.push(group);
    }

    return groups;
}

export interface GridSpan {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
}

export function buildColumnGroupsCoords(span: GridSpan, contentProps?: any[], yOffset = 0, contentBuilder?: any, preventTriggerPredicate?: PreventTriggerPredicate): CellGroup[] {
    const {startX, endX, startY, endY} = span;
    if (startX >= endX) return [];

    const groups: CellGroup[] = [];

    for (let x = startX; x < endX; x++) {
        const start: CellConfig = { x, y: startY + yOffset };
        const end: CellConfig = { x, y: endY + yOffset };
        const group: CellGroup = {
            cells: groupCellsInStraightLine(start, end, preventTriggerPredicate),
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

function getStartEndRowCoords(row: GridCellConfig[], rowIndex: number): [CellConfig, CellConfig] {
    const start: CellConfig = { x: 0, y: rowIndex };
    const end: CellConfig = { x: row.length - 1, y: rowIndex };
    return [start, end];
}

export type PreventTriggerPredicate = (cell: CellConfig) => boolean;


function isPredicate(value: any): value is PreventTriggerPredicate {
    return isFunction(value);
}

export function groupCellsInStraightLine(a: CellConfig, b: CellConfig, preventGroupTrigger?: boolean | PreventTriggerPredicate): CellConfig[] {
    const horizontalLine = a.y === b.y;
    const verticalLine = a.x === b.x;

    if (horizontalLine) {
        const { start, range } = getCellRange(a.x, b.x);
        return range.map((x) => {
            const coords: CellConfig = { x: start + x, y: a.y };
            const shouldPrevent = isPredicate(preventGroupTrigger)
                ? preventGroupTrigger(coords)
                : preventGroupTrigger;

            return ({ x: start + x, y: a.y, preventGroupTrigger: shouldPrevent });
        });
    }

    if (verticalLine) {
        const { start, range } = getCellRange(a.y, b.y);
        return range.map((y) => {
            const coords: CellConfig = { y: start + y, x: a.x };
            const shouldPrevent = isPredicate(preventGroupTrigger)
                ? preventGroupTrigger(coords)
                : preventGroupTrigger;

            return ({ y: start + y, x: a.x, preventGroupTrigger: shouldPrevent });
        });
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


export function getOutlierAtPosition(cellGroup: CellGroup, position: CellPosition): CellConfig {
    if (!cellGroup.cells) return { x: -1, y: -1 };

    switch (position) {
        case CellPosition.TopLeft:
            return getTopLeftOutlier(cellGroup);
        case CellPosition.Top:
            return getTopMiddleOutlier(cellGroup);
        case CellPosition.TopRight:
            return getTopRightOutlier(cellGroup);
        case CellPosition.Bottom:
            return getBottomMiddleOutlier(cellGroup);
        case CellPosition.Right:
        case CellPosition.BottomRight:
        case CellPosition.BottomLeft:
        case CellPosition.Left:
            return getTopRightOutlier(cellGroup);
    }
}

function getTopMiddleOutlier(cellGroup: CellGroup): CellConfig {
    const topmost = getTopMostCells(cellGroup);
    return topmost[Math.floor((topmost.length - 1) / 2)];
}

function getTopMostCells(cellGroup: CellGroup): CellConfig[] {
    return getOutliers(cellGroup, Math.min, 'y');
}

function getBottomMiddleOutlier(cellGroup: CellGroup): CellConfig {
    const bottommost = getBottommostCells(cellGroup);
    return bottommost[Math.floor((bottommost.length - 1) / 2)];
}

function getBottommostCells(cellGroup: CellGroup): CellConfig[] {
    return getOutliers(cellGroup, Math.max, 'y');
}

function getRightmostCells(cellGroup: CellGroup): CellConfig[] {
    return getOutliers(cellGroup, Math.max, 'x');
}

function getLeftmostCells(cellGroup: CellGroup): CellConfig[] {
    return getOutliers(cellGroup, Math.min, 'x');
}

function getTopRightOutlier(cellGroup: CellGroup): CellConfig {
    const topmost = getTopMostCells(cellGroup);
    const rightmost = getRightmostCells(cellGroup);
    const [topRight] = intersect(topmost, rightmost, coordsEqual);
    return topRight || topmost[0];
}

function getTopLeftOutlier(cellGroup: CellGroup): CellConfig {
    const topmost = getTopMostCells(cellGroup);
    const leftmost = getLeftmostCells(cellGroup);

    const [topRight] = intersect(topmost, leftmost, coordsEqual);
    return topRight || topmost[0];
}

export function coordsEqual(a: CellConfig, b: CellConfig): boolean {
    return a.x === b.x && a.y === b.y;
}

function getOutliers(cellGroup: CellGroup, minmax: (...values: number[]) => number, key: string): CellConfig[] {
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

export interface ResultMeta {
    mostSignificantPosition: number;
    totalWidth: number;
    numOperands: number;
    fractionDesiredWidth: number;
    numResultIntegerPartDigits: number;
    numResultFractionalPartDigits: number;
}

export function extractResultMeta(result: OperationResult<Digit, PositionResult<Digit>>): ResultMeta {
    const maxDigitsInRow = maxNumOfDigitsInRow(result);

    return {
        totalWidth: maxDigitsInRow + 1,
        fractionDesiredWidth: result.numberResult.numFractionPartDigits(),
        mostSignificantPosition: mostSignificantPosition(result),
        numResultIntegerPartDigits: result.numberResult.numIntegerPartDigits(),
        numResultFractionalPartDigits: result.numberResult.numFractionPartDigits(),
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
            content: content
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

export enum CellPaddingPolicy {
    PadWithZeros = 'PadWithZeros',
    PadWithEmptyCells = 'PadWithEmptyCells',
    PadWithComplementExtension = 'PadWithComplementExtension'
}

export function operandDigitsToCellConfig<T extends Digit>(digits: T[], info: ResultMeta, base: number, fractionPaddingPolicy: CellPaddingPolicy = CellPaddingPolicy.PadWithZeros): GridCellConfig[] {
    const indexOfZeroPositionDigit = digits.findIndex((digit) => digit.position === 0);
    if (indexOfZeroPositionDigit === -1) return [];

    const integerPartDigits = digits.slice(0, indexOfZeroPositionDigit + 1);
    const fractionalPartDigits = digits.slice(indexOfZeroPositionDigit + 1);

    const integerPaddingContent = '';
    const fractionPaddingContent = getPaddingContentForPolicy(base, fractionPaddingPolicy);

    const paddedIntegerPartDigits = padDigitsWithContent(integerPartDigits, info.numResultIntegerPartDigits + 2, integerPaddingContent, 'Left');
    const paddedFractionalPartDigits = padDigitsWithContent(fractionalPartDigits, info.fractionDesiredWidth, fractionPaddingContent, 'Right');

    return padWithEmptyCells([...paddedIntegerPartDigits, ...paddedFractionalPartDigits], info.totalWidth, 'Left');
}

function getPaddingContentForPolicy(base: number, policy: CellPaddingPolicy): string {
    switch (policy) {
        case CellPaddingPolicy.PadWithZeros:
            return BaseDigits.getRepresentation(0, base);
        case CellPaddingPolicy.PadWithEmptyCells:
            return '';
    }
}

export function eraseContentEnd(cells: GridCellConfig[], count: number): GridCellConfig[] {
    const totalLength = cells.length;
    return cells.map((cell, index) => {
        if (index + count >= totalLength) {
            return {
                ...cell,
                content: ''
            };
        }
        return cell;
    });
}


export type PaddingGenerator = <T extends Digit>(digits: T[], index: number, desiredWidth: number) => string;

export function padDigitsWithContent<T extends Digit>(digits: T[], desiredWidth: number, padding: string | PaddingGenerator, direction: 'Left' | 'Right'): GridCellConfig[] {
    const cells = digitsToCellConfig(digits);
    if (desiredWidth <= digits.length) return cells;

    const missingCellsCount = desiredWidth - digits.length;
    const newEmptyCells: GridCellConfig[] = [...Array(missingCellsCount).keys()].map((index) => {
        return ({ content: isString(padding) ? padding : padding(digits, index, desiredWidth) });
    });

    return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

export function findGroupTriggeredByCell(cell: CellConfig | GridCellEvent, groups: CellGroup[]): CellGroup | undefined {
    const { x, y } = cell;
    return groups.find((group) => {
        return group.cells.find((cell) => {
            return cell.x === x && cell.y === y && !cell.preventGroupTrigger;
        });
    });
}
