import {
    AdditionPositionResult,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult
} from '@calc/calc-arithmetic';
import {
    buildColumnGroups,
    CellConfig,
    CellGroup,
    CellPosition,
    digitsToCellConfig,
    eraseContentEnd,
    extractResultMeta,
    GridCellConfig,
    GridLine,
    groupCellsInStraightLine,
    HoverOperationGrid,
    LineDefinition,
    LineType,
    operandDigitsToCellConfig,
    padWithEmptyCells,
    ResultMeta
} from '@calc/grid';
import { AddAtPositionHoverContent } from '../../addition/addition-position-result/add-at-position-hover-content';
import React from 'react';
import { flatten } from 'lodash';
import { MultiplyRowDetails } from '../multiply-row-result/multiply-row-result';
import { MultiplyPositionDetails } from '../multiply-position-result/multiply-position-details';

export type MultiplicationCellProps = MultiplicationRowResult | MultiplicationPositionResult | AdditionPositionResult;

export function buildMultiplicationGrid(result: MultiplicationResult): HoverOperationGrid {
    const base = result.resultDigits[0].base;
    const info = extractMultiplicationResultMeta(result);

    const operandRows: GridCellConfig[][] = result.operands.map((operandDigits: MultiplicationOperand[], index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, info, base);
        if (index === result.operands.length - 1) cells[0].content = '*';
        return cells;
    });

    const multiplicationGroups = buildRowMultiplicationGroups(result.stepResults, info);

    const additionOperandRows: GridCellConfig[][] = result.addition.operands.map((operandDigits: MultiplicationOperand[], index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, info, base);
        const erased = eraseContentEnd(cells, index);
        if (index === result.addition.operands.length - 1) erased[0].content = '+';
        return erased;
    });

    const resultDigitsCells = digitsToCellConfig(result.resultDigits);
    const resultRow: GridCellConfig[] = padWithEmptyCells(resultDigitsCells, operandRows[0].length, 'Left');

    const additionGroups = buildColumnGroups(
        [...additionOperandRows, resultRow],
        [...result.addition.stepResults].reverse(),
        2,
        (value: AdditionPositionResult) => <AddAtPositionHoverContent positionResult={value}/>,
        cell => cell.y < 2 + additionOperandRows.length
    );

    const digitMultiplicationGroups = result.stepResults.map((result, rowIndex) => {
        return buildDigitMultiplicationGroups([...result.rowPositionResults], rowIndex, info);
    });

    const values = [...operandRows, ...additionOperandRows, resultRow];
    const lines = getGridLines(info, operandRows, additionOperandRows);


    return {
        lines,
        groups: [...additionGroups, ...multiplicationGroups, ...flatten(digitMultiplicationGroups)],
        values: values
    }
}


function getGridLines(info: MultiplicationResultMeta, initialOperandRows: GridCellConfig[][], addOperandRows: GridCellConfig[][]): GridLine[] {
    const lines: GridLine[] = [];

    const multiplicationSeparatorIndex = initialOperandRows.length -1;
    lines.push({ type: LineType.Horizontal, index: multiplicationSeparatorIndex });

    const resultIndex = initialOperandRows.length + addOperandRows.length -1;
    lines.push({ type: LineType.Horizontal, index: resultIndex });

    const operandFractionDigitsMax = Math.max(info.numMultiplicandFractionalDigits, info.numMultiplierFractionalDigits);

    if(operandFractionDigitsMax > 0) {
        const verticalLineIndex = info.totalWidth - operandFractionDigitsMax - 1;
        const span: LineDefinition = {from: 0, to: 1};
        lines.push({type: LineType.Vertical, index: verticalLineIndex, span});

        const resultSepIndex = info.totalWidth - operandFractionDigitsMax * 2 -1;
        const resultSepSpan: LineDefinition = {from: resultIndex + 1, to: resultIndex + 2};
        lines.push({type: LineType.Vertical, index: resultSepIndex, span: resultSepSpan});
    }

    return lines;
}

interface MultiplicationResultMeta extends ResultMeta {
    numMultiplicandFractionalDigits: number;
    numMultiplierFractionalDigits: number;
    maxOperandsFractionDigits: number;
}

function extractMultiplicationResultMeta(result: MultiplicationResult): MultiplicationResultMeta {
    const [multiplicand, multiplier] = result.numberOperands;

    const numMultiplicandFractionalDigits = multiplicand.fractionalPart.length;
    const numMultiplierFractionalDigits = multiplier.fractionalPart.length;

    const maxOperandsFractionDigits = Math.max(numMultiplicandFractionalDigits, numMultiplierFractionalDigits);

    return {
        ...extractResultMeta(result),
        fractionDesiredWidth: maxOperandsFractionDigits,
        totalWidth: getTotalWidth(result),
        numMultiplicandFractionalDigits,
        numMultiplierFractionalDigits,
        maxOperandsFractionDigits,
    }
}


function getTotalWidth(result: MultiplicationResult): number {
    const resultLength = result.resultDigits.length;
    const operandsSpan = getMinOperandsSpan(result.operands);
    return Math.max(resultLength, operandsSpan) + 1;
}

function getMinOperandsSpan(operands: MultiplicationOperand[][]): number {
    const [multiplicand, multiplier] = operands;
    return multiplicand.length + multiplier.length;
}


function buildRowMultiplicationGroups(stepResults: MultiplicationRowResult[], info: MultiplicationResultMeta): CellGroup[] {
    return stepResults.map((res, index) => {
        return buildRowMultiplicationGroup(res, index, info)
    });
}

function buildRowMultiplicationGroup(result: MultiplicationRowResult, index: number, info: MultiplicationResultMeta): CellGroup {
    const trigger: CellConfig = { x: info.totalWidth - index - 1, y: 1 };

    const multiplicandRowStart: CellConfig = { x: 0, y: 0 };
    const multiplicandRowEnd: CellConfig = { x: info.totalWidth -1, y: 0 };
    const multiplicandRow = groupCellsInStraightLine(multiplicandRowStart, multiplicandRowEnd, true);

    const resultRowStart: CellConfig = { x: 0, y: index + 2 };
    const resultRowEnd: CellConfig = { x: info.totalWidth -1, y: index + 2 };
    const resultRow = groupCellsInStraightLine(resultRowStart, resultRowEnd, true);

    return {
        cells: [trigger, ...multiplicandRow, ...resultRow],
        contentBuilder: (result: MultiplicationRowResult) => <MultiplyRowDetails result={result}/>,
        anchorPosition: CellPosition.TopRight,
        contentProps: result
    }
}

function buildDigitMultiplicationGroups(stepResults: MultiplicationPositionResult[], rowIndex: number, info: ResultMeta): CellGroup[] {
    return stepResults.map((res, positionIndex) => {
        return buildDigitMultiplicationGroup(res, rowIndex, positionIndex, info)
    });
}

function buildDigitMultiplicationGroup(stepResult: MultiplicationPositionResult, rowIndex: number, positionIndex: number, info: ResultMeta): CellGroup {
    const trigger: CellConfig = {
        x: info.totalWidth - 1 - positionIndex - rowIndex,
        y: rowIndex + 2
    };

    const multiplier: CellConfig = {
        x: info.totalWidth - 1 - rowIndex,
        y: 1,
        preventGroupTrigger: true
    };

    const multiplicand: CellConfig = {
        x: info.totalWidth - 1 - positionIndex,
        y: 0,
        preventGroupTrigger: true
    };

    return {
        cells: [trigger, multiplicand, multiplier],
        anchorPosition: CellPosition.Bottom,
        contentProps: stepResult,
        contentBuilder:  (result: MultiplicationPositionResult) => <MultiplyPositionDetails result={result}/>,
        popoverPlacement: 'bottom'
    }
}


