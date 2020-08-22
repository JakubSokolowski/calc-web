import { AdditionResult, BaseDigits, Digit } from '@calc/calc-arithmetic';
import { highlightedCellPreset } from './conversion-grid';
import { GridCellConfig } from '../models/grid-cell-config';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { buildColumnGroups } from './grid-utils';
import { LineType } from '../models/line-type';
import { GridLine } from '../..';
import { LineDefinition } from '../models/grid-line';
import { AxisConfig } from '../models/axis-config';
import { buildAxis } from './axis-utils';

interface DigitsInfo {
    totalWidth: number;
    numIntegerPartDigits: number;
    numFractionalDigits: number;
}

export function buildAdditionGrid(result: AdditionResult): HoverOperationGrid {
    const rows: GridCellConfig[][] = [];
    const base = result.resultDigits[0].base;
    const info = extractDelimiterInfo(result);
    const verticalLineIndex = info.numIntegerPartDigits;

    const carryRows = carriesToCellConfig(result);
    rows.push(...carryRows);
    const horizontalLineIndex = result.operands.length - 1 + carryRows.length;

    result.operands.forEach((operandDigits, index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, info, base);
        if (index === result.operands.length - 1) cells[0].content = '+';
        rows.push(cells);
    });

    const resultRow: GridCellConfig[] = digitsToCellConfig(result.resultDigits);
    rows.push(padWithEmptyCells(resultRow, info.totalWidth + 1, 'Left'));
    const groups = buildColumnGroups(rows, [undefined, ...result.positionResults.reverse()]);

    const xAxis: AxisConfig = buildAxis(result.resultDigits[0].position + 1, result.resultDigits.length + 1);

    return {
        values: rows,
        groups,
        lines: [
            {
                type: LineType.Vertical,
                index: verticalLineIndex,
            },
            {
                type: LineType.Horizontal,
                index: horizontalLineIndex
            },
            getUnderlineForCarries(carryRows)
        ],
        xAxis
    };
}

function getUnderlineForCarries(carryRows: GridCellConfig[][]): GridLine {
    const index = carryRows.length - 1;
    const span: LineDefinition = {
        from: carryRows[index].findIndex((cell) => cell.content !== '')
    };

    return {
        type: LineType.Horizontal,
        index,
        span
    }
}

function carriesToCellConfig(result: AdditionResult): GridCellConfig[][] {
    const width = result.resultDigits.length + 1;
    const positionCarryLookup: Record<number, Digit[]> = {};
    const positionIndexLookup: Record<number, number> = {};

    result.resultDigits.forEach((posDigit, index) => {
        positionIndexLookup[posDigit.position] = index + 1;
    });

    let mostCarriesPerPosition = 0;

    result.positionResults.forEach((posResult) => {
        posResult.carry.forEach((carry) => {
            if (positionCarryLookup[carry.position]) {
                positionCarryLookup[carry.position].push(carry);
            } else {
                positionCarryLookup[carry.position] = [carry];
            }

            const numCarries = positionCarryLookup[carry.position].length;

            if (mostCarriesPerPosition < numCarries) {
                mostCarriesPerPosition = numCarries;
            }
        });
    });

    const emptyCarryGrid = buildEmptyGrid(width, mostCarriesPerPosition);

    Object.entries(positionCarryLookup).forEach(([strPosition, positionCarries]) => {
        const numPosition = parseInt(strPosition);
        positionCarries.forEach((carry, carryIndex) => {
            const positionIndex = positionIndexLookup[numPosition];
            emptyCarryGrid[carryIndex][positionIndex].content = carry.valueInBase;
            emptyCarryGrid[carryIndex][positionIndex].preset = highlightedCellPreset;
        });
    });


    return emptyCarryGrid;
}

function buildEmptyGrid(width: number, height: number): GridCellConfig[][] {
    return [...Array(height).keys()].map(() => buildEmptyRow(width));
}

function buildEmptyRow(width: number): GridCellConfig[] {
    return [...Array(width).keys()].map(() => ({ content: '' }));
}

function operandDigitsToCellConfig(digits: Digit[], info: DigitsInfo, base: number): GridCellConfig[] {
    const indexOfZeroPositionDigit = digits.findIndex((digit) => digit.position === 0);
    if (indexOfZeroPositionDigit === -1) {
        return [];
    }

    const integerPartDigits = digits.slice(0, indexOfZeroPositionDigit + 1);
    const fractionalPartDigits = digits.slice(indexOfZeroPositionDigit + 1);

    const paddedIntegerPartDigits = padWithEmptyCellDigits(integerPartDigits, info.numIntegerPartDigits + 1, base, 'Left');
    const paddedFractionalPartDigits = padWithEmptyCellDigits(fractionalPartDigits, info.numFractionalDigits, base, 'Right');

    return [...paddedIntegerPartDigits, ...paddedFractionalPartDigits];
}

function extractDelimiterInfo(result: AdditionResult): DigitsInfo {
    return {
        totalWidth: result.resultDigits.length,
        numIntegerPartDigits: result.numberResult.integerPart.length,
        numFractionalDigits: result.numberResult.fractionalPart.length
    };
}

export function padWithEmptyCells(cells: GridCellConfig[], desiredWidth: number, direction?: 'Left' | 'Right'): GridCellConfig[] {
    if (desiredWidth <= cells.length) return cells;
    const missingCellsCount = desiredWidth - cells.length;
    const newEmptyCells: GridCellConfig[] = [...Array(missingCellsCount).keys()].map(() => ({ content: '' }));

    return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

export function padWithEmptyCellDigits(digits: Digit[], desiredWidth: number, base: number, direction?: 'Left' | 'Right'): GridCellConfig[] {
    const cells = digitsToCellConfig(digits);
    if (desiredWidth <= digits.length) return cells;

    const missingCellsCount = desiredWidth - digits.length;
    const newEmptyCells: GridCellConfig[] = [...Array(missingCellsCount).keys()].map(() => {
        const value = direction === 'Left' ? '' : BaseDigits.getDigit(0, base);
        return ({ content: value });
    });

    return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

function digitsToCellConfig(digits: Digit[]): GridCellConfig[] {
    return digits.map((digit) => {
        const celLValue = digit.position === 0
            ? `${digit.valueInBase}.`
            : digit.valueInBase;
        return ({ content: celLValue });
    });
}
