import {
    AdditionPositionResult,
    AlgorithmType,
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
    GridLabel,
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

export function buildMultiplicationGrid(result: MultiplicationResult): HoverOperationGrid {
    const base = result.resultDigits[0].base;
    const info = extractMultiplicationResultMeta(result);

    const yOffset = info.hasMultiplicandComplement ? 1 : 0;

    const multiplicandComplementRow = result.multiplicandComplement
        ? operandDigitsToCellConfig(result.multiplicandComplement.complement.asDigits(), info, base)
        : [];

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
        2 + yOffset,
        (value: AdditionPositionResult) => <AddAtPositionHoverContent positionResult={value}/>,
        cell => cell.y < 2 + yOffset + additionOperandRows.length
    );

    const digitMultiplicationGroups = result.stepResults.map((result, rowIndex) => {
        return buildDigitMultiplicationGroups([...result.rowPositionResults], rowIndex, info);
    });

    let values = [...operandRows, ...additionOperandRows, resultRow];
    let groups = [...additionGroups, ...multiplicationGroups, ...flatten(digitMultiplicationGroups)];

    if (multiplicandComplementRow.length) {
        values = [multiplicandComplementRow, ...values];
        groups = [...groups, buildMultiplicandComplementGroup(info)];
    }
    const lines = getGridLines(info, operandRows, additionOperandRows);
    const labels = getLabelForOperands(info);

    return {
        lines,
        groups,
        values,
        label: labels
    };
}

function getGridLines(info: MultiplicationResultMeta, initialOperandRows: GridCellConfig[][], addOperandRows: GridCellConfig[][]): GridLine[] {
    const lines: GridLine[] = [];

    if (info.hasMultiplicandComplement) {
        const complementSeparatorIndex = 0;
        lines.push({ type: LineType.Horizontal, index: complementSeparatorIndex });

        lines.push({ type: LineType.Vertical, index: info.totalWidth - 1 });
    }

    const offset = info.hasMultiplicandComplement ? 1 : 0;


    const multiplicationSeparatorIndex = initialOperandRows.length - 1 + offset;
    lines.push({ type: LineType.Horizontal, index: multiplicationSeparatorIndex });

    const resultIndex = initialOperandRows.length + addOperandRows.length - 1 + offset;
    lines.push({ type: LineType.Horizontal, index: resultIndex });

    const operandFractionDigitsMax = Math.max(info.numMultiplicandFractionalDigits, info.numMultiplierFractionalDigits);

    if (operandFractionDigitsMax > 0) {
        const verticalLineIndex = info.totalWidth - operandFractionDigitsMax - 1;
        const span: LineDefinition = { from: 0, to: 1 + offset };
        lines.push({ type: LineType.Vertical, index: verticalLineIndex, span });

        const resultSepIndex = info.totalWidth - operandFractionDigitsMax * 2 - 1;
        const resultSepSpan: LineDefinition = { from: resultIndex + 1, to: resultIndex + 2 };
        lines.push({ type: LineType.Vertical, index: resultSepIndex, span: resultSepSpan });
    }

    return lines;
}

function getLabelForOperands(info: MultiplicationResultMeta): GridLabel | undefined {
    if (!info.hasMultiplicandComplement) return;

    const labels = Array(info.totalHeight + 2).fill('');

    const multiplicandLabelStr = 'M';
    const multiplierLabelStr = 'm';
    const complementLabelStr = `\\overline{${multiplicandLabelStr}}`;

    const multiplicandComplementIndex = 0;
    const multiplicandIndex = 1;
    const multiplierIndex = 2;
    const addedComplementIndex = labels.length - 2;

    labels[multiplicandComplementIndex] = complementLabelStr;
    labels[multiplicandIndex] = multiplicandLabelStr;
    labels[multiplierIndex] = multiplierLabelStr;
    labels[addedComplementIndex] = complementLabelStr;

    return { labels };
}

interface MultiplicationResultMeta extends ResultMeta {
    numMultiplicandFractionalDigits: number;
    numMultiplierFractionalDigits: number;
    maxOperandsFractionDigits: number;
    algorithmType: AlgorithmType;
    hasMultiplicandComplement: boolean;
    totalHeight: number;
}

function extractMultiplicationResultMeta(result: MultiplicationResult): MultiplicationResultMeta {
    const [multiplicand, multiplier] = result.numberOperands;

    const numMultiplicandFractionalDigits = multiplicand.numFractionPartDigits();
    const numMultiplierFractionalDigits = multiplier.numFractionPartDigits();

    const maxOperandsFractionDigits = Math.max(numMultiplicandFractionalDigits, numMultiplierFractionalDigits);

    return {
        ...extractResultMeta(result),
        fractionDesiredWidth: maxOperandsFractionDigits,
        totalWidth: getTotalWidth(result),
        numMultiplicandFractionalDigits,
        numMultiplierFractionalDigits,
        maxOperandsFractionDigits,
        algorithmType: result.algorithmType,
        totalHeight: getTotalHeight(result),
        hasMultiplicandComplement: !!result.multiplicandComplement
    };
}

function getTotalHeight(result: MultiplicationResult): number {
    const multiplicandComplementOffset = result.multiplicandComplement ? 1 : 0;
    const operandsOffset = result.numberOperands.length;
    const multiplicationRowsOffset = result.stepResults.length;
    return multiplicandComplementOffset + operandsOffset + multiplicationRowsOffset;
}

function getTotalWidth(result: MultiplicationResult): number {
    const resultLength = result.resultDigits.length;
    const operandsSpan = getMinOperandsSpan(result.operands);
    return Math.max(resultLength, operandsSpan) + 1;
}

function getMinOperandsSpan(operands: MultiplicationOperand[][]): number {
    const [multiplicand, multiplier] = operands.map((row) => {
        return row.filter(d => !d.isComplementExtension);
    });

    return multiplicand.length + multiplier.length - 1;
}

function buildRowMultiplicationGroups(stepResults: MultiplicationRowResult[], info: MultiplicationResultMeta): CellGroup[] {
    return stepResults.map((res, index) => {
        return buildRowMultiplicationGroup(res, index, info);
    });
}

function buildRowMultiplicationGroup(result: MultiplicationRowResult, index: number, info: MultiplicationResultMeta): CellGroup {
    const yOffset = info.hasMultiplicandComplement ? 1 : 0;
    const trigger: CellConfig = { x: info.totalWidth - index - 1, y: 1 + yOffset };

    const multiplicandRowStart: CellConfig = { x: 0, y: 0 + yOffset };
    const multiplicandRowEnd: CellConfig = { x: info.totalWidth - 1, y: 0 + yOffset };
    const multiplicandRow = groupCellsInStraightLine(multiplicandRowStart, multiplicandRowEnd, true);

    const resultRowStart: CellConfig = { x: 0, y: index + 2 + yOffset };
    const resultRowEnd: CellConfig = { x: info.totalWidth - 1, y: index + 2 + yOffset };
    const resultRow = groupCellsInStraightLine(resultRowStart, resultRowEnd, true);

    return {
        cells: [trigger, ...multiplicandRow, ...resultRow],
        contentBuilder: (result: MultiplicationRowResult) => <MultiplyRowDetails result={result}/>,
        anchorPosition: CellPosition.TopRight,
        contentProps: result
    };
}

function buildDigitMultiplicationGroups(stepResults: MultiplicationPositionResult[], rowIndex: number, info: MultiplicationResultMeta): CellGroup[] {
    return stepResults.map((res, positionIndex) => {
        return buildDigitMultiplicationGroup(res, rowIndex, positionIndex, info);
    });
}

function buildDigitMultiplicationGroup(stepResult: MultiplicationPositionResult, rowIndex: number, positionIndex: number, info: MultiplicationResultMeta): CellGroup {
    const offset = info.hasMultiplicandComplement ? 1 : 0;

    const trigger: CellConfig = {
        x: info.totalWidth - 1 - positionIndex - rowIndex,
        y: rowIndex + 2 + offset
    };

    const multiplier: CellConfig = {
        x: info.totalWidth - 1 - rowIndex,
        y: 1 + offset,
        preventGroupTrigger: true
    };

    const multiplicand: CellConfig = {
        x: info.totalWidth - 1 - positionIndex,
        y: 0 + offset,
        preventGroupTrigger: true
    };

    return {
        cells: [trigger, multiplicand, multiplier],
        anchorPosition: CellPosition.Bottom,
        contentProps: stepResult,
        contentBuilder: (result: MultiplicationPositionResult) => <MultiplyPositionDetails result={result}/>,
        popoverPlacement: 'bottom'
    };
}

function buildMultiplicandComplementGroup(info: MultiplicationResultMeta): CellGroup {
    const complementRowStart: CellConfig = { x: 0, y: 0 };
    const complementRowEnd: CellConfig = { x: info.totalWidth - 1, y: 0 };
    const multiplicandRow = groupCellsInStraightLine(complementRowStart, complementRowEnd);


    const resultRowStart: CellConfig = { x: 0, y: info.totalHeight };
    const resultRowEnd: CellConfig = { x: info.totalWidth - 1, y: info.totalHeight };
    const resultRow = groupCellsInStraightLine(resultRowStart, resultRowEnd);

    return {
        anchorPosition: CellPosition.Top,
        cells: [...multiplicandRow, ...resultRow]
    };
}


