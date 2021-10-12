import React from 'react';

import { SubtractionOperand, SubtractionResult } from '@calc/calc-arithmetic';
import { buildAxis } from './axis-utils';
import { getGridLines } from './grid-line-utils';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import {
    buildColumnGroups,
    buildEmptyGrid,
    digitsToCellConfig,
    extractResultMeta,
    operandDigitsToCellConfig,
    padWithEmptyCells
} from './grid-utils';
import { GridCellConfig } from '../models/grid-cell-config';

export function buildSubtractionGrid(result: SubtractionResult): HoverOperationGrid {
    const base = result.resultDigits[0].base;
    const info = extractResultMeta(result);

    const operandRows: GridCellConfig[][] = result.operands.map((operandDigits: SubtractionOperand[], index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig<SubtractionOperand>(operandDigits, info, base);
        if (index === result.operands.length - 1) cells[0].content = '-';
        return cells;
    });

    const resultDigitsCells = digitsToCellConfig(result.resultDigits);
    const resultRow: GridCellConfig[] = padWithEmptyCells(resultDigitsCells, operandRows[0].length, 'Left');

    const borrowRows: GridCellConfig[][] = borrowsToCellConfig(result).map((row) => {
        return padWithEmptyCells(row, operandRows[0].length, 'Left');
    }).reverse();


    const values: GridCellConfig[][] = [...borrowRows, ...operandRows, resultRow];

    const groups = buildColumnGroups(values, [...result.stepResults.reverse()].slice(1));
    const xAxis = buildAxis(info.mostSignificantPosition + 1, info.totalWidth);
    const lines = getGridLines({ ...info, numResultIntegerPartDigits: info.numResultIntegerPartDigits }, borrowRows);

    return { values, lines, xAxis, groups };
}

export function borrowsToCellConfig(result: SubtractionResult): GridCellConfig[][] {
    const width = result.resultDigits.length + 1;
    const positionBorrowLookup: Record<number, SubtractionOperand[]> = {};
    const positionIndexLookup: Record<number, number> = {};

    result.resultDigits.forEach((posDigit, index) => {
        positionIndexLookup[posDigit.position] = index + 1;
    });

    let mostBorrowsPerPosition = 0;

    const [minuend] = result.operands;

    minuend.forEach((minuendDigit) => {
        if (minuendDigit.borrowChain) {
            const [, ...borrows] = minuendDigit.borrowChain;
            borrows.forEach((borrow) => {
                if (positionBorrowLookup[borrow.position]) {
                    positionBorrowLookup[borrow.position].push(borrow);
                } else {
                    positionBorrowLookup[borrow.position] = [borrow];
                }

                const numBorrows = positionBorrowLookup[borrow.position].length;

                if (mostBorrowsPerPosition < numBorrows) {
                    mostBorrowsPerPosition = numBorrows;
                }
            });
        }
    });

    const emptyCarryGrid = buildEmptyGrid(width, mostBorrowsPerPosition);

    Object.entries(positionBorrowLookup).forEach(([strPosition, positionBorrows]) => {
        const numPosition = parseInt(strPosition);

        positionBorrows.forEach((borrow, borrowIndex) => {
            const positionIndex = positionIndexLookup[numPosition];
            if (positionIndex) {
                emptyCarryGrid[borrowIndex][positionIndex].content = borrow.representationInBase;
                if (borrowIndex !== positionBorrows.length - 1) {
                    emptyCarryGrid[borrowIndex][positionIndex].preset = {
                        default: 'crossedOutCell',
                        hover: 'crossedOutHoverCell'
                    };
                }
            }
        });
    });

    return emptyCarryGrid;
}
