
import { leastSignificantPosition, trimExcessZeros } from '../digits';
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

    while (keepDividing(dividend, prevResult, fractionPrecision)) {
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
    const positionDigits = positionResults.map((r) => r.valueAtPosition);
    return trimExcessZeros(positionDigits);
}

function keepDividing(dividend: DivisionOperand[], prev?: DivisionPositionResult, fractionPrecision = 0) {
    if (!prev) return true;

    const hasDividendDigitsToMoveDown = dividend.length - 2 > prev.divisionIndex;
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
    if (nextDividendDigit) return nextDividendDigit;
    const { base } = dividend[0];
    return nextDividendDigit || BaseDigits.getDigit(0, base);
}

function reindexToLsp(digits: DivisionOperand[], lsp = 0): DivisionOperand[] {
    return digits.map((d, i) => ({ ...d, position: digits.length - i - lsp }));
}

function getInitialDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[]): PositionalNumber {
    const numDivisorOps = divisor.length;
    return fromDigits(dividend.slice(0, numDivisorOps)).result;
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
