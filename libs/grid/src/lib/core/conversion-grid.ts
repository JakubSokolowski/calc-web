import { Conversion, ConversionToArbitrary } from '@calc/calc-arithmetic';
import { walk } from '@calc/utils';
import { GridCellDisplayPreset } from '../models/grid-cell-display-preset';
import { GridCellConfig } from '../models/grid-cell-config';
import { CellGroup } from '../models/cell-group';
import { GridLine } from '../models/grid-line';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { buildRowGroup } from './grid-utils';
import { LineType } from '../models/line-type';
import { RowConversionOperation } from '../models/row-conversion-operation';
import { FloatingPartConversionInfo } from '../models/floating-part-conversion-info';

export const defaultCellPreset: GridCellDisplayPreset = {
    default: 'default-cell',
    hover: 'hover-cell'
};

export const highlightedCellPreset: GridCellDisplayPreset = {
    default: 'highlighted-cell',
    hover: 'highlighted-cell-hover'
};

export function buildFractionalConversionGrid(conversion: Conversion, precision = 5): HoverOperationGrid {
    const { fractionalMultipliers } = extractConversionToArbitrary(conversion);
    const rows: GridCellConfig[][] = [];
    const groups: CellGroup[] = [];
    const lines: GridLine[] = [ ];

    let multiplicandMaxLength = 0;
    let resultMaxLength = 0;

    walk(fractionalMultipliers.slice(0, precision * 2), 2, ([leftMultiplicand, rightResult]: [string, string], index) => {
        /*
           Grid row for single operation below:
           0.1234 x 2 = 0.2468
           Will look like that:
           |0.|1|2|3|4| ----------- |0.| ------------- |2|4|6|8| --------- |2|
           multiplicand   fraction digit result   multiplication result   base
                                     |                      |
                                     |------- result -------|
         */
        if (index === fractionalMultipliers.length - 1) return;

        const multiplicandCells = buildMultiplicandCells(leftMultiplicand, multiplicandMaxLength);
        const multiplicationResultCells = buildMultiplicationResultCells(rightResult, resultMaxLength);
        const baseCell = { content: conversion.result.base.toString() };

        const newRow: GridCellConfig[] = [
            ...multiplicandCells,
            ...multiplicationResultCells,
            baseCell
        ];

        const propContent: FloatingPartConversionInfo = {
            base: conversion.result.base.toString(),
            multiplier: leftMultiplicand,
            result: rightResult
        };

        groups.push(buildRowGroup(newRow, index / 2, propContent));
        rows.push(newRow);

        if (index === 0) {
            multiplicandMaxLength = multiplicandCells.length - 1;
            resultMaxLength = multiplicationResultCells.length - 1;
            const separatorLine: GridLine = {
                index: multiplicandCells.length - 1,
                type: LineType.Vertical
            };
            lines.push(separatorLine)
        }
    });

    return {
        values: rows,
        lines,
        groups
    };
}

function buildMultiplicandCells(multiplicand: string, desiredLength: number): GridCellConfig[] {
    const delimiterIndex = multiplicand.indexOf('.');
    const multiplicandWithoutDelimiter = multiplicand.replace('.', '');
    const cellsWithContent: GridCellConfig[] = [...multiplicandWithoutDelimiter.split('').map((val, index) => {
        return index === delimiterIndex - 1
            ? { preset: defaultCellPreset, content: val + '.' }
            : { preset: defaultCellPreset, content: val };
    })];

    const leftEmptyCells: GridCellConfig[] = getEmptyCellsPadding(desiredLength, cellsWithContent.length);

    return [...leftEmptyCells, ...cellsWithContent]
}

function buildMultiplicationResultCells(rightResult: string, desiredLength: number): GridCellConfig[] {
    const [beforeRightDelimiter, afterRightDelimiter] = rightResult.split('.');
    const digitResultCell: GridCellConfig = { content: beforeRightDelimiter + '.', preset: highlightedCellPreset };
    const restOfMultiplicationResultCells = afterRightDelimiter
        ? [...afterRightDelimiter.split('').map((val) => ({ content: val, preset: defaultCellPreset }))]
        : [];
    const allRightCells: GridCellConfig[] = [digitResultCell].concat(restOfMultiplicationResultCells);
    const defaultRightEmptyCell: GridCellConfig[] = [{ content: ' ' }];
    const rightEmptyCells: GridCellConfig[] = getEmptyCellsPadding(desiredLength, allRightCells.length).concat(defaultRightEmptyCell);

    return [...allRightCells, ...rightEmptyCells];
}

export function buildIntegralConversionGrid(conversion: Conversion): HoverOperationGrid {
    const firstStage = extractConversionToArbitrary(conversion);
    const reversedResultDigits = [...firstStage.result.integerPart.digits].reverse();
    const rows: GridCellConfig[][] = [];
    let initialEmptyCellOffset = [[], []];
    const divisors = firstStage.integralDivisors;
    const bias = firstStage.result.isNegative ? 2 : 1;
    const lines: GridLine[] = [
        {
            type: LineType.Vertical,
            index: conversion.inputIntegralPartNumDigits - bias
        }
    ];


    const rowGroups: CellGroup[] = [];


    divisors.forEach((value, index) => {
        if (index === divisors.length - 1) return;
        const [emptyLeft, emptyRight] = initialEmptyCellOffset;

        const left: GridCellConfig[] = [...value.split('').map((val) => ({ content: val, preset: defaultCellPreset }))];
        const leftEmptyCells: GridCellConfig[] = getEmptyCellsPadding(emptyLeft.length, left.length);

        let right: GridCellConfig[] = [...divisors[index + 1].split('')].map((val) => ({ content: val, preset: defaultCellPreset }));
        const defaultRightEmptyCell: GridCellConfig[] = [{ content: ' ' }];
        let rightEmptyCells: GridCellConfig[] = getEmptyCellsPadding(emptyRight.length, right.length).concat(defaultRightEmptyCell);

        if (index === divisors.length - 2) {
            right = right.map((val) => ({ content: val.content, preset: highlightedCellPreset }));
            rightEmptyCells = rightEmptyCells.map((val) => ({ content: val.content, preset: highlightedCellPreset }));
        }

        const propContent: RowConversionOperation = {
            base: firstStage.result.base.toString(),
            dividend: value,
            remainder: reversedResultDigits[index],
            result: divisors[index + 1]
        };

        const newRow: GridCellConfig[] = [
            ...leftEmptyCells,
            ...left,
            ...right,
            ...rightEmptyCells,
            { content: reversedResultDigits[index], preset: highlightedCellPreset }
        ];

        rowGroups.push(buildRowGroup(newRow, index, propContent));

        rows.push(newRow);
        if (index === 0) initialEmptyCellOffset = [left, right];
    });

    return {
        values: rows,
        groups: rowGroups,
        lines
    };
}

function extractConversionToArbitrary(conversion: Conversion): ConversionToArbitrary {
    const conversionToArbitrary = conversion.stages.length > 1
        ? conversion.getLastStage()
        : conversion.getFirstStage();

    return conversionToArbitrary as ConversionToArbitrary;
}

function getEmptyCellsPadding(initialLength: number, currentLength: number): GridCellConfig[] {
    const offset = initialLength - currentLength;
    return offset > 0 ? ' '.repeat(offset).split('').map((value) => ({ content: value })) : [];
}
