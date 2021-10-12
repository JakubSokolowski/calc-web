import { ComplementConversionResult, Digit } from '@calc/calc-arithmetic';
import { GridLine, HoverOperationGrid, LineType, padDigitsWithContent } from '@calc/grid';
import React from 'react';

export function buildComplementGrid(result: ComplementConversionResult): HoverOperationGrid {
    const { inputDigits, minuendDigits, afterSubtraction, one, complementDigits } = result;
    const totalWidth = inputDigits.length + 2;

    const minuendCells = padDigitsWithContent(minuendDigits, totalWidth, '', 'Left');
    const inputCells = getInputDigitsCells(inputDigits, totalWidth);
    const afterSubCells = padDigitsWithContent(afterSubtraction, totalWidth, '', 'Left');
    const oneRow = getOneDigitsCells(one, totalWidth);
    const complementRow = padDigitsWithContent(complementDigits, totalWidth, '', 'Left');

    return {
        values: [
            minuendCells,
            inputCells,
            afterSubCells,
            oneRow,
            complementRow
        ],
        lines: getGridLines(),
        groups: []
    };

}

function getGridLines(): GridLine[] {
    return [
        { type: LineType.Horizontal, index: 1 },
        { type: LineType.Horizontal, index: 3 }
    ];
}

function getInputDigitsCells(inputDigits: Digit[], totalWidth: number) {
    const inputCells = padDigitsWithContent(inputDigits, totalWidth, '', 'Left');
    inputCells[0].content = '-';
    return inputCells;
}

function getOneDigitsCells(one: Digit, totalWidth: number) {
    const oneRow = padDigitsWithContent([one], totalWidth, '', 'Left');
    oneRow[0].content = '+';
    return oneRow;
}
