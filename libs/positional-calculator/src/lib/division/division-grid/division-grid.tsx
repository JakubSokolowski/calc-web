import {
    digitsToStr,
    DivisionOperand,
    DivisionPositionResult,
    DivisionResult, fromDigits,
    leastSignificantPosition
} from '@calc/calc-arithmetic';
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

export function buildResultRow(result: DivisionResult, meta: DivisionResultMeta): GridCellConfig[] {
    const { resultRowLeftOffset, totalWidth } = meta;

    const resultCells = toCellsWithFractionSeparator(result.resultDigits);

    const leftPadded = padWithEmptyCells(
        resultCells,
        result.resultDigits.length + resultRowLeftOffset + 1,
        'Left'
    );

    return padWithEmptyCells(
        leftPadded,
        totalWidth,
        'Right'
    );
}

function toCellsWithFractionSeparator(digits: DivisionOperand[], fractionPointClass = 'defaultCellWithVerticalAndHorizontalLine'): GridCellConfig[] {
    const resultLsp = leastSignificantPosition(digits);
    const digitCells = digitsToCellConfig(digits);
    const hasFractionPart = resultLsp < 0;

    if(hasFractionPart) {
        const fractionPointIndex = digitCells.length -1 - (Math.abs(resultLsp));
        // Usually, separators for fraction point are defined as
        // separate vertical line in grid lines but there is an
        // an issue with line definition for lines tha start at 0
        // (ex. line span from 0 to 1) The first cell will not have
        // vertical line. This should be fixed at some point, but for
        // now we can use the cell config to define cell preset that
        // has vertical line on its own, regardless of grid line
        // definitions
        digitCells[fractionPointIndex].preset = {
            ...digitCells[fractionPointIndex].preset,
            default: fractionPointClass
        }
    }

    return digitCells
}

function getGridLines(result: DivisionResult): GridLine[] {
    const lines: GridLine[] = [];
    const resultSeparatorLine: GridLine = { type: LineType.Horizontal, index: 0, span: { from: 1 } };

    lines.push(resultSeparatorLine);

    let prevTo: number | undefined = undefined;
    result.stepResults.forEach((step, idx) => {
        const [minuend, subtrahend] = step.subtractionResult.numberOperands;
        const subtrahendDigits = subtrahend.toNumber() === 0
            ? subtrahend.asDigits().slice(0, 1)
            : subtrahend.asDigits();
        const maxOpDigits = Math.max(minuend.numDigits(), subtrahendDigits.length);
        const lineLength = maxOpDigits + 1;
        const lineFrom = prevTo
            ? prevTo - maxOpDigits + 1
            : idx;
        const to = lineFrom + lineLength - 1;
        prevTo = to;
        const span: LineDefinition = { from: lineFrom, to };
        const stepLine: GridLine = {
            type: LineType.Horizontal,
            index: 2 + step.divisionIndex + idx,
            span
        };
        lines.push(stepLine);
    });

    return lines;
}

interface SubtractionRowCells {
    cells: GridCellConfig[][];
    maxCellWithContentIndex: number;
}

function buildSubtractionRows(result: DivisionResult, totalWidth: number): GridCellConfig[][] {
    const subtractionRows: GridCellConfig[][] = [];
    let prevMaxCellWithContentIndex: number | undefined = undefined;
    result.stepResults.forEach((step: DivisionPositionResult, index) => {
        const isInitialStep = index === 0;
        if (isInitialStep) {
            const { maxCellWithContentIndex, cells } = buildInitialSubtractionRow(step, totalWidth, result.stepResults.length);
            prevMaxCellWithContentIndex = maxCellWithContentIndex;
            subtractionRows.push(...cells);
            return;
        }

        const isLastStep = index === result.stepResults.length - 1;
        if (isLastStep) {
            const { maxCellWithContentIndex, cells } = buildLastSubtractionRows(step, totalWidth, prevMaxCellWithContentIndex);
            subtractionRows.push(...cells);
            prevMaxCellWithContentIndex = maxCellWithContentIndex;
            return;
        }

        const { maxCellWithContentIndex, cells } = buildDefaultSubtractionRows(step, totalWidth, prevMaxCellWithContentIndex);
        prevMaxCellWithContentIndex = maxCellWithContentIndex;
        subtractionRows.push(...cells);
    });

    return subtractionRows;
}


function buildDefaultSubtractionRows(step: DivisionPositionResult, totalWidth: number, prevMaxIndex?: number): SubtractionRowCells {
    const subtractionRows: GridCellConfig[][] = [];
    const { divisionIndex } = step;
    const [minuend, subtrahend] = step.subtractionResult.numberOperands;
    const minuendDigits = minuend.asDigits();
    const subtrahendDigits = subtrahend.toNumber() === 0
        ? subtrahend.asDigits().slice(0, 1)
        : subtrahend.asDigits();

    const leftPaddingLength = prevMaxIndex ?
        prevMaxIndex - minuendDigits.length + 2
        : divisionIndex + 1;


    const minuendRow = padWithEmptyCells(
        digitsToCellConfig(minuendDigits),
        minuendDigits.length + leftPaddingLength,
        'Left'
    );


    const subtrahendRow = padWithEmptyCells(
        digitsToCellConfig(subtrahendDigits),
        minuendDigits.length + leftPaddingLength,
        'Left'
    );
    subtrahendRow[leftPaddingLength - 1].content = '-';

    subtractionRows.push(padWithEmptyCells(minuendRow, totalWidth));
    subtractionRows.push(padWithEmptyCells(subtrahendRow, totalWidth));
    const maxCellWithContentIndex = minuendRow.length - 1;

    return {
        cells: subtractionRows,
        maxCellWithContentIndex
    };
}

function buildInitialSubtractionRow(step: DivisionPositionResult, totalWidth: number, numSteps: number): SubtractionRowCells {
    const subtractionRows: GridCellConfig[][] = [];
    const [minuend, subtrahend] = step.subtractionResult.numberOperands;
    const subtrahendDigits = subtrahend.toNumber() === 0
        ? subtrahend.asDigits().slice(0, 1)
        : subtrahend.asDigits();
    const minuendDigits = minuend.asDigits();
    const leftPaddingLength = 1;
    const desiredWidth = Math.max(subtrahendDigits.length, minuendDigits.length) + leftPaddingLength;

    const subtrahendRow = padWithEmptyCells(
        digitsToCellConfig(subtrahendDigits),
        desiredWidth,
        'Left'
    );
    subtrahendRow[leftPaddingLength - 1].content = '-';

    subtractionRows.push(padWithEmptyCells(subtrahendRow, totalWidth));

    const initialStepAlsoLast = numSteps === 1;
    if (initialStepAlsoLast) {
        const resultDigits = step.subtractionResult.numberResult.toDigitsList();
        const subtractionResultRow = padWithEmptyCells(
            digitsToCellConfig(resultDigits),
            desiredWidth,
            'Left'
        );
        subtractionRows.push(padWithEmptyCells(subtractionResultRow, totalWidth));
    }

    return {
        cells: subtractionRows,
        maxCellWithContentIndex: subtrahendRow.length - 1
    };
}


function buildLastSubtractionRows(step: DivisionPositionResult, totalWidth: number, prevMaxIndex: number): SubtractionRowCells {
    const [minuend, subtrahend] = step.subtractionResult.numberOperands;
    const minuendDigits = minuend.asDigits();
    const subtrahendDigits = subtrahend.asDigits();
    const resultDigits = step.subtractionResult.numberResult.toDigitsList();
    const leftPaddingLength = prevMaxIndex - minuendDigits.length + 2;

    const desiredWidth = minuendDigits.length + leftPaddingLength;

    const minuendRow = padWithEmptyCells(
        digitsToCellConfig(minuendDigits),
        desiredWidth,
        'Left'
    );

    const subtrahendRow = padWithEmptyCells(
        digitsToCellConfig(subtrahendDigits),
        desiredWidth,
        'Left'
    );
    subtrahendRow[leftPaddingLength - 1].content = '-';

    const lastSubtractionResultRow = padWithEmptyCells(
        digitsToCellConfig(resultDigits),
        desiredWidth,
        'Left'
    );

    return {
        cells: [
            padWithEmptyCells(minuendRow, totalWidth),
            padWithEmptyCells(subtrahendRow, totalWidth),
            padWithEmptyCells(lastSubtractionResultRow, totalWidth)
        ],
        maxCellWithContentIndex: minuendRow.length - 1
    };
}


function buildOperationRow(result: DivisionResult, totalWidth: number): GridCellConfig[] {
    const [dividend, divisor] = result.operands;
    const leftOffset = 1;

    const operationDigitsCells: GridCellConfig[] = [
        ...toCellsWithFractionSeparator(dividend, 'defaultCellWithVerticalLine'),
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
    numDivisorFractionPartDigits: number;
    numResultDigits: number;
    resultRowLeftOffset: number;
}

export function extractDivisionResultMeta(result: DivisionResult): DivisionResultMeta {
    const baseMeta = extractResultMeta(result);
    const [dividend, divisor] = result.numberOperands;

    const numDividendDigits = dividend.numDigits();
    const numDividendIntegerPartDigits = dividend.numIntegerPartDigits();
    const numDivisorDigits = divisor.numDigits();
    const numDivisorFractionPartDigits = divisor.numFractionPartDigits();
    const numResultDigits = result.numberResult.numDigits();

    const [scaledDividend, scaledDivisor] = result.operands;
    const numOperandsDigits = scaledDividend.length + scaledDivisor.length;
    const resultRowLeftOffset = getResultRowLeftOffset(result);

    const spaceForFirstMinusSign = 1;
    const resultRowLength = spaceForFirstMinusSign + resultRowLeftOffset + numResultDigits;

    const spaceForOperandDivisionSign = 1;
    const operandRowLength = spaceForFirstMinusSign + numOperandsDigits + spaceForOperandDivisionSign;
    const totalWidth = Math.max(resultRowLength, operandRowLength);

    return {
        ...baseMeta,
        numDividendDigits,
        numDividendIntegerPartDigits,
        numDivisorFractionPartDigits,
        numDivisorDigits,
        totalWidth,
        numResultDigits,
        resultRowLeftOffset
    };
}

function getResultRowLeftOffset(result: DivisionResult): number {
    const [dividend, divisor] = result.numberOperands;
    const [scaledDividend, scaledDivisor] = result.operands;
    const baseMeta = extractResultMeta(result);

    const isDivisionByOne = fromDigits(scaledDivisor).result.toNumber() === 1;
    if(isDivisionByOne) return 0;

    const dividendGreater = Math.abs(dividend.toNumber()) >= Math.abs(divisor.toNumber());
    if(!dividendGreater) return 0;

    return Math.abs(scaledDividend.length - baseMeta.numResultIntegerPartDigits);
}
