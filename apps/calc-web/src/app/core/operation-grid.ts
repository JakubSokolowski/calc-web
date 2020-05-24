import { Conversion, ConversionToArbitrary } from '@calc/calc-arithmetic';

export interface CellConfig {
    value: string,
    highlight?: boolean
}

export interface OperationGrid {
    values: CellConfig[][];
    horizontalLine?: number;
    verticalLine?: number;
    width: number;
    height: number;
}

export interface OperationGridInfo {
    grid: OperationGrid,
    hooverContentProps?: any[];
}

export interface RowConversionOperation {
    base: string,
    dividend: string,
    result: string,
    remainder: string
}

export interface GridInfo {
    values: CellConfig[][],
    hooverContentProps: RowConversionOperation[]
}

export function buildConversionGrid(conversion: Conversion): OperationGridInfo {
    const conversionToArbitrary = conversion.stages.length > 1
        ? conversion.getLastStage()
        : conversion.getFirstStage();

    const gridInfo =  buildToArbitraryGrid(conversionToArbitrary as ConversionToArbitrary);

    return {
        grid: {
            values: gridInfo.values,
            width: getMaxRowWidth(conversion),
            height: getNumRows(conversion),
            verticalLine: conversion.inputNumDigits - 1
        },
        hooverContentProps: gridInfo.hooverContentProps
    };
}

function buildToArbitraryGrid(firstStage: ConversionToArbitrary): GridInfo {
    const reversedResultDigits = [...firstStage.result.integerPart.digits].reverse();
    const rows: CellConfig[][] = [];
    let initialEmptyCellOffset = [[], []];
    const divisors = firstStage.integralDivisors;
    const props: RowConversionOperation[] = [];

    divisors.forEach((value, index) => {
        if (index === divisors.length - 1) return;
        const [emptyLeft, emptyRight] = initialEmptyCellOffset;

        const left: CellConfig[] = [...value.split('').map((val) => ({ value: val }))];
        const leftEmptyCells: CellConfig[] = getEmptyCellOffset(emptyLeft, left);

        let right: CellConfig[] = [...divisors[index + 1].split('')].map((val) => ({ value: val }));
        const defaultRightEmptyCell: CellConfig[] = [{ value: ' ' }];
        let rightEmptyCells: CellConfig[] = getEmptyCellOffset(emptyRight, right).concat(defaultRightEmptyCell);

        if (index === divisors.length - 2) {
            right = right.map((val) => ({ ...val, highlight: true }));
            rightEmptyCells = rightEmptyCells.map((val) => ({ ...val, highlight: true }));
        }

        props.push({
            base: firstStage.result.base.toString(),
            dividend: value,
            remainder: reversedResultDigits[index],
            result: divisors[index +1]
        });

        const newRow = [
            ...leftEmptyCells,
            ...left,
            ...right,
            ...rightEmptyCells,
            { value: reversedResultDigits[index], highlight: true }
        ];

        rows.push(newRow);
        if (index === 0) initialEmptyCellOffset = [left, right];
    });

    return {
        values: rows,
        hooverContentProps: props
    };
}

function getEmptyCellOffset(initial: CellConfig[], curr: CellConfig[]): CellConfig[] {
    const offset = initial.length - curr.length;
    return offset > 0 ? ' '.repeat(offset).split('').map((value) => ({ value })) : [];
}

function getMaxRowWidth(conversion: Conversion): number {
    const reminderColumnDigits = 3;
    const numDigits = conversion.inputNumDigits;
    const maxDivisionResultLength = conversion.inputNumDigits;

    return numDigits + maxDivisionResultLength + reminderColumnDigits;
}

function getNumRows(conversion: Conversion): number {
    const numDigits = conversion.resultNumDigits;
    return numDigits - 1;
}

export function gridToAscii(grid: OperationGrid): string {
    let ascii = '\n';

    grid.values.forEach((row, rowIndex) => {
        if (rowIndex === grid.horizontalLine) {
            ascii = ascii.concat('-'.repeat(grid.width * 2).concat('\n'));
            return;
        }

        row.forEach((cell, columnIndex) => {
            ascii = ascii.concat(cell.value + ' ');
            if (grid.verticalLine === columnIndex) {
                ascii = ascii.concat('| ');
            }
        });
        ascii = ascii.concat('\n');
    });

    return ascii;
}
