import {
    BaseDigits,
    digitsToStr,
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
import { leastSignificantPosition } from '../digits';


export function divideDefault(numbers: PositionalNumber[]): DivisionResult {


    return {
        numberOperands: numbers
    } as DivisionResult;
}


/*
  TODO fraction precision vs extension limit

  fraction precision - how many fraction digits should be generated
  problem: the number can have finite fraction but number of fraction digits can be greater than limit and
           it wont be computed

  extension limit - how many additional extension (moved down fallback zeros) should be generated
  problem: non-intuitive, i can understand - do division with 5 digit precision but division with 5 extension limit
           is not understandable. The plus side is that every finite fraction will be computed
*/
export function divideDigits(dividend: DivisionOperand[], divisor: DivisionOperand[], fractionLimit = 0): DivisionResult {
    if(!integerPartOnly(divisor)) {
        throw Error(
            `For divideDigits(...) divisor: ${digitsToStr(divisor)} cannot have fraction.`
        )
    }

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

function integerPartOnly(digits: DivisionOperand[]): boolean {
    return leastSignificantPosition(digits) === 0;
}

export function divideAtPosition(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult): DivisionPositionResult {
    const divisionIndex = prev ? prev.divisionIndex + 1 : 0;
    const dividendSlicePosNum = getDividendSlice(dividend, divisor, prev);
    const divisorPosNum = fromDigits(divisor).result;


    // estimate how many times the divisor will fit in dividend slice
    const outputPosition = prev
        ? prev.valueAtPosition.position - 1
        : dividend[0].position - divisor.length + 1;

    const quotient = integerQuotient(dividendSlicePosNum, divisorPosNum, outputPosition);
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
    const nextDigitIndex = prev.divisionIndex + divisor.length;
    const nextDividendDigit = getNextWithZeroFallback(dividend, nextDigitIndex);
    const digits = reindexToLsp([...prev.remainder, nextDividendDigit], 0);
    return fromDigits(digits).result;
}

function getNextWithZeroFallback(dividend: DivisionOperand[], digitIndex: number): DivisionOperand {
    const nextDividendDigit = dividend[digitIndex];
    if(nextDividendDigit) return nextDividendDigit;
    const {base} = dividend[0];
    return nextDividendDigit || BaseDigits.getDigit(0, base)
}

function reindexToLsp(digits: DivisionOperand[], lsp = 0): DivisionOperand[] {
    return digits.map((d, i) => ({...d, position: digits.length - i - lsp}))
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
