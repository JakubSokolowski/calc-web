import { AdditionResult, BaseDigits, Digit, AdditionOperand } from '@calc/calc-arithmetic';
import { GridCellConfig } from '../models/grid-cell-config';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { buildColumnGroups } from './grid-utils';
import { LineType } from '../models/line-type';
import { GridLine, LineDefinition } from '../models/grid-line';
import { buildAxis } from './axis-utils';
import React from 'react';

interface DigitsInfo {
    mostSignificantPosition: number;
    totalWidth: number;
    numOperands: number;
    numIntegerPartDigits: number;
    numFractionalDigits: number;
}

export function buildAdditionGrid(result: AdditionResult): HoverOperationGrid {
    const base = result.resultDigits[0].base;
    const info = extractResultMeta(result);

    const operandRows: GridCellConfig[][] = result.operands.map((operandDigits, index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, info, base);
        if (index === result.operands.length - 1) cells[0].content = '+';
        return cells;
    });

    const resultDigitsCells = digitsToCellConfig(result.resultDigits);
    const resultRow: GridCellConfig[] = padWithEmptyCells(resultDigitsCells, operandRows[0].length, 'Left');

    const carryRows: GridCellConfig[][] = carriesToCellConfig(result).map((row) => {
        return padWithEmptyCells(row, operandRows[0].length, 'Left');
    }).reverse();

    const rows: GridCellConfig[][] = [...carryRows, ...operandRows, resultRow];

    const groups = buildColumnGroups(rows, [...result.positionResults.reverse()]);
    const lines = getGridLines(info, carryRows);
    const xAxis = buildAxis(info.mostSignificantPosition + 1, info.totalWidth);

    return {
        values: [...carryRows, ...operandRows, resultRow],
        groups,
        lines,
        xAxis
    };
}

function getGridLines(info: DigitsInfo, carryRows: GridCellConfig[][]): GridLine[] {
    const lines: GridLine[] = [];

    const horizontalLineIndex = info.numOperands - 1 + carryRows.length;
    lines.push({ type: LineType.Horizontal, index: horizontalLineIndex });

    const hasFractionalPart = info.numFractionalDigits > 0;

    if (hasFractionalPart) {
        const verticalLineIndex = info.numIntegerPartDigits + 1;
        lines.push({ type: LineType.Vertical, index: verticalLineIndex });
    }

    if (carryRows.length > 0) {
        lines.push(getUnderlineForCarries(carryRows));
    }

    return lines;
}

function getUnderlineForCarries(carryRows: GridCellConfig[][]): GridLine {
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

function carriesToCellConfig(result: AdditionResult): GridCellConfig[][] {
    const width = result.resultDigits.length + 1;
    const positionCarryLookup: Record<number, AdditionOperand[]> = {};
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
            if (positionIndex) {
                emptyCarryGrid[carryIndex][positionIndex].content = (
                    <div>
                        {carry.representationInBase}
                        <sub style={{fontSize: 8}}>
                            {carry.carrySourcePosition}
                        </sub>
                    </div>
                );
            }
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
    if (indexOfZeroPositionDigit === -1) return [];

    const integerPartDigits = digits.slice(0, indexOfZeroPositionDigit + 1);
    const fractionalPartDigits = digits.slice(indexOfZeroPositionDigit + 1);

    const paddedIntegerPartDigits = padWithZeroDigitCells(integerPartDigits, info.numIntegerPartDigits + 2, base, 'Left');
    const paddedFractionalPartDigits = padWithZeroDigitCells(fractionalPartDigits, info.numFractionalDigits, base, 'Right');

    if (fractionalPartDigits.length > 0) {
        paddedIntegerPartDigits[paddedIntegerPartDigits.length - 1].content += '.';
    }

    return padWithEmptyCells([...paddedIntegerPartDigits, ...paddedFractionalPartDigits], info.totalWidth, 'Left');
}

function extractResultMeta(result: AdditionResult): DigitsInfo {
    const maxDigitsInRow = maxNumOfDigitsInRow(result);

    return {
        totalWidth: maxDigitsInRow + 1,
        mostSignificantPosition: mostSignificantPosition(result),
        numIntegerPartDigits: result.numberResult.integerPart.length,
        numFractionalDigits: result.numberResult.fractionalPart.length,
        numOperands: result.operands.length
    };
}

function maxNumOfDigitsInRow(result: AdditionResult): number {
    const resultLength = result.resultDigits.length;
    const maxOperandLength = Math.max(...result.operands.map((op) => op.length));

    return Math.max(resultLength, maxOperandLength);
}

function mostSignificantPosition(result: AdditionResult): number {
    const resultMSP = result.resultDigits[0].position;
    const operandMSP =  Math.max(...result.operands.map((op) => op[0].position));

    return Math.max(resultMSP, operandMSP);
}


function padWithEmptyCells(cells: GridCellConfig[], desiredWidth: number, direction?: 'Left' | 'Right'): GridCellConfig[] {
    if (desiredWidth <= cells.length) return cells;
    const missingCellsCount = desiredWidth - cells.length;
    const newEmptyCells: GridCellConfig[] = [...Array(missingCellsCount).keys()].map(() => ({ content: '' }));

    return direction === 'Left' ? [...newEmptyCells, ...cells] : [...cells, ...newEmptyCells];
}

function padWithZeroDigitCells(digits: Digit[], desiredWidth: number, base: number, direction?: 'Left' | 'Right'): GridCellConfig[] {
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
    const leastSignificandDigit = digits[digits.length - 1];
    const hasFractionalPart = leastSignificandDigit && leastSignificandDigit.position < 0;

    return digits.map((digit) => {
        const shouldAddDelimiter = digit.position === 0 && hasFractionalPart;
        const content = shouldAddDelimiter
            ? `${digit.representationInBase}.`
            : digit.representationInBase;
        return { content };
    });
}
