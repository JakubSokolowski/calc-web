import { leastSignificantPosition, mostSignificantPosition, trimLeadingZeros } from '../digits';
import { OperandsTransformType } from '../transform/preprocessor-type';
import { applyTransformsByType } from '../transform/apply-by-type';
import { PositionalNumber } from '../positional-number';
import { DivisionOperand, DivisionPositionResult, DivisionResult } from '../../models';
import { fromDigits } from '../base-converter';
import { BaseDigits } from '../base-digits';
import { subtractPositionalNumbers } from '../subtraction';
import { multiplyDefault } from '../multiplication/multiplication';
import { digitsToStr } from '../../helpers/conversion-helpers';
import { DivisionType } from '../../models/operation-algorithm';
import { OperationType } from '../../models/operation';


export function divideDefault(numbers: PositionalNumber[], fractionPrecision = 5): DivisionResult {
    const [dividend, divisor] = numbers;
    const [dividendDigits, divisorDigits] = prepareDivisionOperands(dividend, divisor);
    const result = divideDigits(dividendDigits, divisorDigits, fractionPrecision);

    const resultNegative = dividend.isNegative() !== divisor.isNegative();
    const resultWithProperSign = fromDigits(
        result.numberResult.toDigitsList(),
        resultNegative
    ).result;

    return {
        ...result,
        numberResult: resultWithProperSign,
        numberOperands: numbers
    };
}

function prepareDivisionOperands(dividend: PositionalNumber, divisor: PositionalNumber): DivisionOperand[][] {
    return applyTransformsByType(
        [
            dividend.toDigitsList(),
            divisor.toDigitsList()
        ],
        [OperandsTransformType.ScaleToDivisor]
    );
}

export function divideDigits(dividend: DivisionOperand[], divisor: DivisionOperand[], fractionPrecision = 5): DivisionResult {
    if (!integerPartOnly(divisor)) {
        throw Error(
            `For divideDigits(...) divisor: ${digitsToStr(divisor)} cannot have fraction.`
        );
    }

    const positionResults: DivisionPositionResult[] = [];
    let prevResult: DivisionPositionResult | undefined = undefined;

    let firstDividendSliceLength = 0;
    while (keepDividing(dividend, prevResult, fractionPrecision, firstDividendSliceLength)) {
        const res = divideAtPosition(dividend, divisor, prevResult);
        if (!firstDividendSliceLength) {
            firstDividendSliceLength = res.dividendSlice.length;
        }

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
    const positionDigits = positionResults.map((r) => r.valueAtPosition);
    const msp = mostSignificantPosition(positionDigits);
    if (msp < 0) {
        const initialZero = BaseDigits.getDigit(0, positionDigits[0].base, 0);
        return [initialZero, ...positionDigits];
    }
    return trimLeadingZeros(positionDigits);
}

function keepDividing(dividend: DivisionOperand[], prev?: DivisionPositionResult, fractionPrecision = 0, firstSliceLength = 0) {
    if (!prev) return true;

    const hasDividendDigitsToMoveDown = dividend.length - firstSliceLength > prev.divisionIndex;
    if (hasDividendDigitsToMoveDown) return true;
    if (prev.remainderDecimal === 0) return false;
    const numGeneratedFractionDigits = Math.abs(prev.valueAtPosition.position);
    return fractionPrecision > numGeneratedFractionDigits;
}

function integerPartOnly(digits: DivisionOperand[]): boolean {
    return leastSignificantPosition(digits) === 0;
}

export function divideAtPosition(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult): DivisionPositionResult {
    const divisionIndex = prev ? prev.divisionIndex + 1 : 0;
    const { slice, sliceSourceLsp } = getDividendSlice(dividend, divisor, prev);
    const divisorPosNum = fromDigits(divisor).result;

    // estimate how many times the divisor will fit in dividend slice
    const quotient = integerQuotient(slice, divisorPosNum, sliceSourceLsp);
    const quotientNum = fromDigits([quotient]).result;

    // subtraction for position - get subtrahend: dividendSlice * quotient
    const divisorTimesQuotient = multiplyDefault([divisorPosNum, quotientNum]);
    const posSubtraction = subtractPositionalNumbers([slice, divisorTimesQuotient.numberResult]);
    const remainder = posSubtraction.numberResult.toDigitsList();

    return {
        operands: [],
        remainder,
        remainderDecimal: posSubtraction.numberResult.decimalValue.toNumber(),
        divisionIndex,
        multiplicationResult: divisorTimesQuotient,
        subtractionResult: posSubtraction,
        dividendSlice: slice.toDigitsList(),
        valueAtPosition: quotient
    };
}

interface DividendSlice {
    slice: PositionalNumber;
    sliceSourceLsp: number;
}

export function getDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult): DividendSlice {
    if (!prev) return getInitialDividendSlice(dividend, divisor);
    return getNextDividendSlice(dividend, divisor, prev);
}

function getNextDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[], prev: DivisionPositionResult): DividendSlice {
    const nextDigitIndex = prev.divisionIndex + divisor.length;
    const nextDividendDigit = getNextWithZeroFallback(dividend, nextDigitIndex);
    const digitsSlice = [...prev.remainder, nextDividendDigit];
    const reindexedDigitsSlice = reindexToLsp(digitsSlice, 0);

    return {
        slice: fromDigits(reindexedDigitsSlice).result,
        sliceSourceLsp: leastSignificantPosition(digitsSlice)
    };
}

function getNextWithZeroFallback(dividend: DivisionOperand[], digitIndex: number): DivisionOperand {
    const nextDividendDigit = dividend[digitIndex];
    if (nextDividendDigit) return nextDividendDigit;
    const { base } = dividend[0];
    const lsp = leastSignificantPosition(dividend);
    const positionDelta = digitIndex - dividend.length;
    const digitPosition = lsp - positionDelta - 1;
    return BaseDigits.getDigit(0, base, digitPosition);
}

function reindexToLsp(digits: DivisionOperand[], lsp = 0): DivisionOperand[] {
    return digits.map((d, i) => ({ ...d, position: digits.length - i - lsp }));
}

function getInitialDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[]): DividendSlice {
    const numDivisorOps = divisor.length;
    const digitsSlice = dividend.slice(0, numDivisorOps);
    const reindexedDigitsSlice = reindexToLsp(dividend.slice(0, numDivisorOps), 0);
    return {
        slice: fromDigits(reindexedDigitsSlice).result,
        sliceSourceLsp: leastSignificantPosition(digitsSlice)
    };
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
