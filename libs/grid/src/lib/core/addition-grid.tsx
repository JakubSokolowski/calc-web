import { AdditionOperand, AdditionResult } from '@calc/calc-arithmetic';
import { GridCellConfig } from '../models/grid-cell-config';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import {
    buildColumnGroups,
    digitsToCellConfig,
    extractResultMeta,
    operandDigitsToCellConfig,
    padWithEmptyCells
} from './grid-utils';
import { buildAxis } from './axis-utils';
import React from 'react';
import { getGridLines } from './grid-line-utils';

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

    const groups = buildColumnGroups(rows, [...result.stepResults.reverse()]);
    const lines = getGridLines(info, carryRows);
    const xAxis = buildAxis(info.mostSignificantPosition + 1, info.totalWidth);

    return {
        values: [...carryRows, ...operandRows, resultRow],
        groups,
        lines,
        xAxis
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

    result.stepResults.forEach((posResult) => {
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


