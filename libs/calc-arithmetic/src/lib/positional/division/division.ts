import {
    BaseDigits, digitsToStr,
    DivisionOperand,
    DivisionPositionResult,
    DivisionResult,
    DivisionType,
    fromDigits,
    multiplyDefault,
    OperationType,
    PositionalNumber,
    subtractPositionalNumbers
} from '@calc/calc-arithmetic';


export function divideDefault(numbers: PositionalNumber[]): DivisionResult {


    return {
        numberOperands: numbers
    } as DivisionResult;
}

export function divideDigits(dividend: DivisionOperand[], divisor: DivisionOperand[]): DivisionResult {
    const positionResults: DivisionPositionResult[] = [];
    let prevResult: DivisionPositionResult | undefined = undefined;

    while (keepDividing(dividend, prevResult)) {
        const res = divideAtPosition(dividend, divisor, prevResult);
        positionResults.push(res);
        prevResult = res;
    }

    const resultDigits = positionResultsToNumber(positionResults);
    const numberResult = fromDigits(resultDigits).result;

    return {
        numberOperands: [],
        algorithmType: DivisionType.Default,
        operation: OperationType.Division,
        stepResults: positionResults,
        operands: [dividend, divisor],
        resultDigits,
        numberResult
    };
}

function positionResultsToNumber(positionResults: DivisionPositionResult[]): DivisionOperand[] {
    return positionResults.map((r) => r.valueAtPosition);
}

function keepDividing(dividend: DivisionOperand[], prev?: DivisionPositionResult) {
    if (!prev) return true;
    const hasDividendDigitsToMoveDown = dividend.length -1 > prev.divisionIndex;
    if(hasDividendDigitsToMoveDown) return true;
    return prev.remainderDecimal !== 0;
}


export function divideAtPosition(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult): DivisionPositionResult {
    const divisionIndex = prev ? prev.divisionIndex + 1 : 0;
    const dividendSlicePosNum = getDividendSlice(dividend, divisor, prev);
    const divisorPosNum = fromDigits(divisor).result;

    // estimate how many times the divisor will fit in dividend slice
    const quotient = integerQuotient(dividendSlicePosNum, divisorPosNum, divisionIndex);
    const quotientNum = fromDigits([quotient]).result;

    // subtraction for position - get subtrahend: dividendSlice * quotient
    const divisorTimesQuotient = multiplyDefault([divisorPosNum, quotientNum]);
    const posSubtraction = subtractPositionalNumbers([dividendSlicePosNum, divisorTimesQuotient.numberResult]);
    const remainder = posSubtraction.numberResult.toDigitsList();

    return {
        operands: [],
        remainder,
        remainderDecimal: posSubtraction.numberResult.decimalValue.toNumber(),
        divisionIndex,
        multiplicationResult: divisorTimesQuotient,
        subtractionResult: posSubtraction,
        dividendSlice: dividendSlicePosNum.toDigitsList(),
        valueAtPosition: quotient
    };
}

export function getDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult): PositionalNumber {
    if (!prev) return getInitialDividendSlice(dividend, divisor);
    return getNextDividendSlice(dividend, divisor, prev);
}

function getNextDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[], prev: DivisionPositionResult) {
    const nextDividendDigit = dividend[prev.divisionIndex + divisor.length];
    const digits = [...prev.remainder, nextDividendDigit];
    return fromDigits(digits).result;
}

function getInitialDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[]): PositionalNumber {
    const numDivisorOps = divisor.length;
    return fromDigits(dividend.slice(0, numDivisorOps)).result;
}

export interface RemDivResult {
    integerQuotient: DivisionOperand;
    remainder: DivisionOperand;
}

export function integerQuotient(dividend: PositionalNumber, divisor: PositionalNumber, resultPosition = 0): DivisionOperand {
    const base = dividend.base();
    const decimalDividend = dividend.decimalValue;
    const decimalDivisor = divisor.decimalValue;
    const integerQuotient = decimalDividend.dividedToIntegerBy(decimalDivisor);

    return {
        ...BaseDigits.getDigit(integerQuotient.toNumber(), base, resultPosition)
    };
}
