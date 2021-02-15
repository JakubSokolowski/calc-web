import {
    AdditionPositionResult,
    MultiplicationOperand,
    MultiplicationPositionResult,
    MultiplicationResult,
    MultiplicationRowResult,
    MultiplicationType
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
import { MultiplicationCorrectionDetails } from '../correction-details/multiplication-correction-details';

export function buildMultiplicationGrid(result: MultiplicationResult): HoverOperationGrid {
    const base = result.resultDigits[0].base;
    const info = extractMultiplicationResultMeta(result);

    const yOffset = info.hasMultiplicandComplement ? 1 : 0;

    const multiplicandComplementRow = result.multiplicandComplement
        ? operandDigitsToCellConfig(result.multiplicandComplement.complement.asDigits(), info, base)
        : [];

    const operandRows: GridCellConfig[][] = buildOperandsRows(result, info, base);
    const multiplicationGroups = buildRowMultiplicationGroups(result.stepResults, info);
    const additionOperandRows: GridCellConfig[][] = buildAdditionOperandsRows(result, info, base);
    const resultDigitsCells = digitsToCellConfig(result.resultDigits);
    const resultRow: GridCellConfig[] = padWithEmptyCells(resultDigitsCells, operandRows[0].length, 'Left');

    const additionGroups = buildAdditionGroups(result.addition.stepResults, info, additionOperandRows, resultRow, yOffset);

    const digitMultiplicationGroups = result.stepResults.map((result, rowIndex) => {
        return buildDigitMultiplicationGroups([...result.rowPositionResults], rowIndex, info);
    });

    let values = [...operandRows, ...additionOperandRows, resultRow];
    let groups = [...additionGroups, ...multiplicationGroups, ...flatten(digitMultiplicationGroups)];

    if (multiplicandComplementRow.length) {
        values = [multiplicandComplementRow, ...values];
    }

    if(info.algorithmType !== MultiplicationType.Default) {
        groups = [...groups, buildMultiplicandComplementGroup(info, result.lastMultiplierDigit)];
    }

    const lines = getGridLines(info, operandRows, additionOperandRows);
    const labels = getLabelForOperands(info, result);

    return {
        lines,
        groups,
        values,
        label: labels
    };
}


function buildOperandsRows(result: MultiplicationResult, info: MultiplicationResultMeta, base: number) {
    return result.operands.map((operandDigits: MultiplicationOperand[], index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, info, base);
        if (index === result.operands.length - 1) cells[0].content = '*';
        return cells;
    });
}

function buildAdditionOperandsRows(result: MultiplicationResult, info: MultiplicationResultMeta, base: number) {
    return result.addition.operands.map((operandDigits: MultiplicationOperand[], index) => {
        const cells: GridCellConfig[] = operandDigitsToCellConfig(operandDigits, info, base);
        const erased = eraseContentEnd(cells, index);
        if (index === result.addition.operands.length - 1) erased[0].content = '+';
        return erased;
    });
}

function buildAdditionGroups(stepResults: AdditionPositionResult[], info: MultiplicationResultMeta, additionOperandRows: GridCellConfig[][], resultRow: GridCellConfig[], yOffset: number) {
    const results = [...stepResults];

    // This fixes some cases when there is more addition position results than
    // addition columns, the results are stacked from left to right and
    // these will leave one addition column without result on hover, so to fix
    // this, remove the additional results
    if (results.length > info.totalWidth) {
        const diff = results.length - info.totalWidth;
        results.splice(-diff);
    }

    return buildColumnGroups(
        [...additionOperandRows, resultRow],
        [...results].reverse(),
        2 + yOffset,
        (value: AdditionPositionResult) => <AddAtPositionHoverContent positionResult={value}/>,
        cell => cell.y < 2 + yOffset + additionOperandRows.length
    );
}


function getGridLines(info: MultiplicationResultMeta, initialOperandRows: GridCellConfig[][], addOperandRows: GridCellConfig[][]): GridLine[] {
    const lines: GridLine[] = [];

    const labelSeparatorLine: GridLine = { type: LineType.Vertical, index: info.totalWidth - 1 };
    lines.push(labelSeparatorLine);

    if (info.hasMultiplicandComplement) {
        const complementSeparatorIndex = 0;
        lines.push({ type: LineType.Horizontal, index: complementSeparatorIndex });
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

function getLabelForOperands(info: MultiplicationResultMeta, result: MultiplicationResult): GridLabel | undefined {
    const multiplicandLabelStr = 'M';
    const multiplierLabelStr = 'm';

    if (!info.hasMultiplicandComplement) {
        const labels = Array(info.totalHeight + 1).fill('');

        const multiplicandIndex = 0;
        const multiplierIndex = 1;
        labels[multiplicandIndex] = multiplicandLabelStr;
        labels[multiplierIndex] = multiplierLabelStr;
        return {labels};
    }

    const labels = Array(info.totalHeight + 2).fill('');

    const complementLabelStr = `\\overline{${multiplicandLabelStr}}`;
    const correctionLabelMultiplier = getMultiplierForCorrectionLabel(result);

    const multiplicandComplementIndex = 0;
    const multiplicandIndex = 1;
    const multiplierIndex = 2;
    const correctionIndex = labels.length - 2;

    labels[multiplicandComplementIndex] = complementLabelStr;
    labels[multiplicandIndex] = multiplicandLabelStr;
    labels[multiplierIndex] = multiplierLabelStr;
    labels[correctionIndex] = correctionLabelMultiplier + complementLabelStr;

    return { labels };
}

function getMultiplierForCorrectionLabel(result: MultiplicationResult): string {
    if(result.algorithmType === MultiplicationType.WithoutExtension && result.lastMultiplierDigit) {
        const {base, valueInDecimal} = result.lastMultiplierDigit;
        return Math.abs(-(base - valueInDecimal)).toString();
    }
    return ''
}

interface MultiplicationResultMeta extends ResultMeta {
    numMultiplicandFractionalDigits: number;
    numMultiplierDigits: number;
    numMultiplierFractionalDigits: number;
    maxOperandsFractionDigits: number;
    algorithmType: MultiplicationType;
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
        numMultiplierDigits: multiplier.numDigits(),
        fractionDesiredWidth: maxOperandsFractionDigits,
        totalWidth: getTotalWidth(result),
        numMultiplicandFractionalDigits,
        numMultiplierFractionalDigits,
        maxOperandsFractionDigits,
        algorithmType: result.algorithmType as MultiplicationType,
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

function buildMultiplicandComplementGroup(info: MultiplicationResultMeta, lastMultiplierDigit?: MultiplicationOperand): CellGroup {
    const algOffset = info.algorithmType === MultiplicationType.WithExtension
        ? 1
        : 0;

    const lastMultiplierCell: CellConfig = {
        x: info.totalWidth - info.numMultiplierDigits - algOffset,
        y: info.hasMultiplicandComplement ? 2 : 1
    };

    if (!info.hasMultiplicandComplement) {
        return {
            anchorPosition: lastMultiplierCell,
            cells: [lastMultiplierCell],
            contentBuilder: () => (
                <MultiplicationCorrectionDetails
                    multiplierNegative={false}
                    multiplicationType={info.algorithmType}
                    lastMultiplierDigit={lastMultiplierDigit}
                />),
            contentProps: {}
        };
    }

    if (info.hasMultiplicandComplement && lastMultiplierDigit) {
        const complementRowStart: CellConfig = { x: 0, y: 0 };
        const complementRowEnd: CellConfig = { x: info.totalWidth - 1, y: 0 };
        const multiplicandRow = groupCellsInStraightLine(complementRowStart, complementRowEnd);

        const resultRowStart: CellConfig = { x: 0, y: info.totalHeight };
        const resultRowEnd: CellConfig = { x: info.totalWidth - 1, y: info.totalHeight };
        const resultRow = groupCellsInStraightLine(resultRowStart, resultRowEnd);

        return {
            anchorPosition: lastMultiplierCell,
            cells: [...multiplicandRow, ...resultRow, lastMultiplierCell],
            contentBuilder: () => (
                <MultiplicationCorrectionDetails
                    multiplierNegative={true}
                    multiplicationType={info.algorithmType}
                    lastMultiplierDigit={lastMultiplierDigit}
                />
            ),
            contentProps: {},
            popoverPlacement: 'bottom'
        };
    }

}


