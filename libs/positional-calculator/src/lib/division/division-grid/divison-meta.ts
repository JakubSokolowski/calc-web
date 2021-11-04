import { extractResultMeta, ResultMeta } from '@calc/grid';
import { DivisionResult, fromDigits } from '@calc/calc-arithmetic';

export interface DivisionResultMeta extends ResultMeta {
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
    const numResultDigits = result.resultDigits.length;

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

    const isDivisionByOne = fromDigits(scaledDivisor).toNumber() === 1;
    if (isDivisionByOne) return 0;

    const dividendGreater = Math.abs(dividend.toNumber()) >= Math.abs(divisor.toNumber());
    if (!dividendGreater) return 0;

    return Math.abs(scaledDividend.length - baseMeta.numResultIntegerPartDigits);
}
