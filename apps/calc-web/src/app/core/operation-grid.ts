import { Conversion, ConversionToArbitrary, fromNumber } from '@calc/calc-arithmetic';

export interface CellConfig {
    value: string,
    highlight?: boolean
}

export interface OperationGrid {
    values: CellConfig[][]
    horizontalLine?: number
    verticalLine?: number
    width: number,
    height: number
}


export function buildConversionGrid(conversion: Conversion = fromNumber(24, 2)): OperationGrid {
    const maxRowWidth = getMaxRowWidth(conversion);
    const numRows = getNumRows(conversion);
    const firstStage = conversion.stages.length > 1 ? conversion.getStage(1) as ConversionToArbitrary : conversion.getStage(0) as ConversionToArbitrary;
    const resultDigits = firstStage.result.integerPart.digits.reverse();
    const rawRows = [];
    let initial = [[], []];

    firstStage.integralDivisors.forEach((value, index, arr) => {
        if (index === arr.length - 1) return;
        const [initialLeft, initialRight] = initial;

        const currLeft: CellConfig[] = [...value.split('').map((val) => ({value: val}))];
        const leftOffset: CellConfig[] = getOffset(initialLeft, currLeft);

        let currRight: CellConfig[] = [...arr[index + 1].split('')].map((val) => ({value: val}));
        const defaultRight: CellConfig[] = [{value: ' '}];
        let rightOffset: CellConfig[] = getOffset(initialRight, currRight).concat(defaultRight);

        if(index===arr.length -2) {
            currRight = currRight.map((val) => ({...val, highlight: true}));
            rightOffset = rightOffset.map((val) => ({...val, highlight: true}));
        }

        rawRows.push([
            ...leftOffset,
            ...currLeft,
            ...currRight,
            ...rightOffset,
            {value: resultDigits[index], highlight: true}
        ]);
        if (index === 0) initial = [currLeft, currRight];
    });

    return {
        values: rawRows,
        width: maxRowWidth,
        height: numRows,
        verticalLine: conversion.inputNumDigits - 1
    };
}

function getOffset(initial: CellConfig[], curr: CellConfig[]): CellConfig[] {
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
        if(rowIndex === grid.horizontalLine) {
            ascii = ascii.concat('-'.repeat(grid.width * 2).concat('\n'));
            return
        }

        row.forEach((cell, columnIndex )=> {
            ascii = ascii.concat(cell.value + ' ');
            if(grid.verticalLine === columnIndex) {
                ascii = ascii.concat('| ');
            }
        });
        ascii = ascii.concat('\n');
    });

    return ascii;
}
