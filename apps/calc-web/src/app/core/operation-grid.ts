import { Conversion, ConversionToArbitrary } from '@calc/calc-arithmetic';

export interface CellConfig {
    value: string;
    highlight?: boolean;
}

export interface OperationGrid<T> {
    cellDisplayValues: T[][];
    rowHooverContentProps?: any[];
    horizontalLine?: number;
    verticalLine?: number;
    width: number;
    height: number;
}

export interface OperationGridInfo<T> {
    grid: OperationGrid<T>;
    hooverContentProps?: any[];
}

export interface RowConversionOperation {
    base: string;
    dividend: string;
    result: string;
    remainder: string;
}

export interface FloatingPartConversionInfo {
    multiplier: string;
    base: string;
    result: string;
}

export interface GridInfo {
    values: CellConfig[][];
    hooverContentProps?: RowConversionOperation[];
}

export function buildIntegralPartConversionGrid(conversion: Conversion): OperationGrid<CellConfig> {
    const conversionToArbitrary = extractConversionToArbitrary(conversion);

    const gridInfo = buildToArbitraryGrid(conversionToArbitrary as ConversionToArbitrary);

    const bias = conversion.result.isNegative ? 2 : 1;

    return {
        cellDisplayValues: gridInfo.values,
        width: getMaxRowWidth(conversion),
        height: getNumRows(conversion),
        verticalLine: conversion.inputIntegralPartNumDigits - bias,
        rowHooverContentProps: gridInfo.hooverContentProps
    };
}

export function buildFloatingPartConversionGrid(conversion: Conversion, precision = 5): OperationGrid<CellConfig> {
    const { result, fractionalMultipliers } = extractConversionToArbitrary(conversion);
    console.log(result, fractionalMultipliers);
    const rows: CellConfig[][] = [];
    let initialEmptyCellOffset = [[], []];
    const rowProps: FloatingPartConversionInfo[] = [];
    const verticalLine = fractionalMultipliers
        .reduce((a, b) => a.length > b.length ? a : b)
        .length - 2;

    walk(fractionalMultipliers, 2, ([leftMultiplier, rightResult], index) => {
        if (index === fractionalMultipliers.length - 1) return;
        const [emptyLeft, emptyRight] = initialEmptyCellOffset;
        const multiplierWithoutDelimiter = leftMultiplier.replace('.', '');
        const left: CellConfig[] = [...multiplierWithoutDelimiter.split('').map((val) => ({ value: val }))];
        const right: CellConfig[] = [...rightResult.replace('.', '').split('').map((val, index) => {
            return index === 0 ? { value: val, highlight: true } : { value: val };
        })];
        const leftEmptyCells: CellConfig[] = getEmptyCellOffset(emptyLeft, left);
        const defaultRightEmptyCell: CellConfig[] = [{ value: ' ' }];
        const rightEmptyCells: CellConfig[] = getEmptyCellOffset(emptyRight, right).concat(defaultRightEmptyCell);
        const newRow = [
            ...leftEmptyCells,
            ...left,
            ...right,
            ...rightEmptyCells,
            { value: conversion.result.base.toString() }
        ];

        rowProps.push({
            base: conversion.result.base.toString(),
            multiplier: leftMultiplier,
            result: rightResult
        });

        rows.push(newRow);
        if (index === 0) initialEmptyCellOffset = [left, right];
    });

    return {
        cellDisplayValues: rows.slice(0, precision),
        height: rows.length,
        width: rows[0].length,
        verticalLine,
        rowHooverContentProps: rowProps
    };
}

function walk(arr, n, fn) {
    for (let i = 0; i < arr.length; i += n)
        fn(arr.slice(i, i + n), i);
}


function extractConversionToArbitrary(conversion: Conversion): ConversionToArbitrary {
    const conversionToArbitrary = conversion.stages.length > 1
        ? conversion.getLastStage()
        : conversion.getFirstStage();

    return conversionToArbitrary as ConversionToArbitrary;
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
            result: divisors[index + 1]
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

export function gridToAscii(grid: OperationGrid<CellConfig>): string {
    let ascii = '\n';

    grid.cellDisplayValues.forEach((row, rowIndex) => {
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
