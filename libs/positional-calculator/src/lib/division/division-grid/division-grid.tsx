import { DivisionPositionResult, DivisionResult } from '@calc/calc-arithmetic';
import {
    digitsToCellConfig,
    extractResultMeta,
    GridCellConfig,
    GridLine,
    HoverOperationGrid,
    LineDefinition,
    LineType,
    padWithEmptyCells,
    ResultMeta
} from '@calc/grid';


export function buildDivisionGrid(result: DivisionResult): HoverOperationGrid {
    const meta = extractDivisionResultMeta(result);
    const { totalWidth } = meta;

    const resultRow: GridCellConfig[] = buildResultRow(result, meta);
    const operationRow: GridCellConfig[] = buildOperationRow(result, totalWidth);
    const subtractionRows = buildSubtractionRows(result, totalWidth);

    const values: GridCellConfig[][] = [
        resultRow,
        operationRow,
        ...subtractionRows
    ];

    const lines: GridLine[] = getGridLines(result);

    return {
        lines,
        values,
        groups: []
    };
}

function buildResultRow(result: DivisionResult, meta: DivisionResultMeta): GridCellConfig[] {
    const { totalWidth, numDividendIntegerPartDigits, numResultIntegerPartDigits } = meta;
    const leftOffset = Math.abs(numDividendIntegerPartDigits - numResultIntegerPartDigits) + 1;

    const leftPadded = padWithEmptyCells(
        digitsToCellConfig(result.resultDigits),
        result.resultDigits.length + leftOffset,
        'Left'
    );

    return padWithEmptyCells(
        leftPadded,
        totalWidth,
        'Right'
    );
}

function getGridLines(result: DivisionResult): GridLine[] {
    const lines: GridLine[] = [];
    const resultSeparatorLine: GridLine = { type: LineType.Horizontal, index: 0, span: { from: 1 } };

    lines.push(resultSeparatorLine);

    result.stepResults.forEach((step, idx) => {
        const [minuend, subtrahend] = step.subtractionResult.numberOperands;
        const lineLength = Math.max(minuend.numDigits(), subtrahend.numDigits()) + 1;
        const span: LineDefinition = {
            from: idx,
            to: idx + lineLength -1
        };
        const stepLine: GridLine = {
            type: LineType.Horizontal,
            index: 2 + step.divisionIndex + idx,
            span
        };
        lines.push(stepLine);
    });

    return lines;
}

function buildSubtractionRows(result: DivisionResult, totalWidth: number): GridCellConfig[][] {
    const subtractionRows: GridCellConfig[][] = [];

    result.stepResults.forEach((step: DivisionPositionResult, index) => {
        const isInitialStep = index === 0;
        if (isInitialStep) {
            subtractionRows.push(...buildInitialSubtractionRow(step, totalWidth));
            return;
        }

        const isLastStep = index === result.stepResults.length - 1;
        if (isLastStep) {
            subtractionRows.push(...buildLastSubtractionRows(step, totalWidth));
            return;
        }

        subtractionRows.push(...buildDefaultSubtractionRows(step, totalWidth));
    });

    return subtractionRows;
}

function buildDefaultSubtractionRows(step: DivisionPositionResult, totalWidth: number): GridCellConfig[][] {
    const subtractionRows: GridCellConfig[][] = [];
    const { divisionIndex } = step;
    const [minuend, subtrahend] = step.subtractionResult.numberOperands;
    const minuendDigits = minuend.asDigits();
    const subtrahendDigits = subtrahend.asDigits();

    const leftPaddingLength = divisionIndex + 1;

    const minuendRow = padWithEmptyCells(
        digitsToCellConfig(minuendDigits),
        minuendDigits.length + leftPaddingLength,
        'Left'
    );

    const subtrahendRow = padWithEmptyCells(
        digitsToCellConfig(subtrahendDigits),
        subtrahendDigits.length + leftPaddingLength,
        'Left'
    );
    subtrahendRow[leftPaddingLength - 1].content = '-';

    subtractionRows.push(padWithEmptyCells(minuendRow, totalWidth));
    subtractionRows.push(padWithEmptyCells(subtrahendRow, totalWidth));

    return subtractionRows;
}

function buildInitialSubtractionRow(step: DivisionPositionResult, totalWidth: number): GridCellConfig[][] {
    const subtractionRows: GridCellConfig[][] = [];
    const [, subtrahend] = step.subtractionResult.numberOperands;
    console.log('Initial', subtrahend.toString());
    const subtrahendDigits = subtrahend.asDigits();

    const leftPaddingLength = 1;

    const subtrahendRow = padWithEmptyCells(
        digitsToCellConfig(subtrahendDigits),
        subtrahendDigits.length + leftPaddingLength,
        'Left'
    );
    subtrahendRow[leftPaddingLength - 1].content = '-';


    subtractionRows.push(padWithEmptyCells(subtrahendRow, totalWidth));

    return subtractionRows;
}


function buildLastSubtractionRows(step: DivisionPositionResult, totalWidth: number): GridCellConfig[][] {
    const { divisionIndex } = step;
    const leftPaddingLength = divisionIndex + 1;

    const [minuend, subtrahend] = step.subtractionResult.numberOperands;
    const minuendDigits = minuend.asDigits();
    const subtrahendDigits = subtrahend.asDigits();
    const resultDigits = step.subtractionResult.numberResult.toDigitsList();

    const minuendRow = padWithEmptyCells(
        digitsToCellConfig(minuendDigits),
        minuendDigits.length + leftPaddingLength,
        'Left'
    );

    const subtrahendRow = padWithEmptyCells(
        digitsToCellConfig(subtrahendDigits),
        subtrahendDigits.length + leftPaddingLength,
        'Left'
    );
    subtrahendRow[leftPaddingLength - 1].content = '-';

    const lastRowOffset = (subtrahendDigits.length - resultDigits.length);
    const lastSubtractionResultRow = padWithEmptyCells(
        digitsToCellConfig(resultDigits),
        resultDigits.length + leftPaddingLength + lastRowOffset,
        'Left'
    );

    return [
        padWithEmptyCells(minuendRow, totalWidth),
        padWithEmptyCells(subtrahendRow, totalWidth),
        padWithEmptyCells(lastSubtractionResultRow, totalWidth)
    ];
}


function buildOperationRow(result: DivisionResult, totalWidth: number): GridCellConfig[] {
    const [dividend, divisor] = result.operands;
    const leftOffset = 1;

    const operationDigitsCells: GridCellConfig[] = [
        ...digitsToCellConfig(dividend),
        { content: ':' },
        ...digitsToCellConfig(divisor)
    ];

    const leftPadded = padWithEmptyCells(
        operationDigitsCells,
        operationDigitsCells.length + leftOffset,
        'Left'
    );

    return padWithEmptyCells(
        leftPadded,
        totalWidth,
        'Right'
    );
}

interface DivisionResultMeta extends ResultMeta {
    totalWidth: number;
    numDividendDigits: number;
    numDividendIntegerPartDigits: number;
    numDivisorDigits: number;
    numResultDigits: number;
}

function extractDivisionResultMeta(result: DivisionResult): DivisionResultMeta {
    const baseMeta = extractResultMeta(result);
    const [dividend, divisor] = result.numberOperands;
    const numDividendDigits = dividend.numDigits();
    const numDividendIntegerPartDigits = dividend.numIntegerPartDigits();
    const numDivisorDigits = divisor.numDigits();
    const numResultDigits = result.numberResult.numDigits();
    const totalWidth = Math.max(numDividendDigits + numDivisorDigits, numResultDigits) + 2;
    return {
        ...baseMeta,
        numDividendDigits,
        numDividendIntegerPartDigits,
        numDivisorDigits,
        totalWidth,
        numResultDigits
    };
}
