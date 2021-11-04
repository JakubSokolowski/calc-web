import { leastSignificantPosition, mostSignificantPosition, padWithZeroDigits, trimLeadingZeros } from '../digits';
import { OperandsTransformType } from '../transform/preprocessor-type';
import { applyTransformsByType } from '../transform/apply-by-type';
import { PositionalNumber } from '../positional-number';
import { Digit, DividendSlice, DivisionOperand, DivisionPositionResult, DivisionResult } from '../../models';
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
        result.numberResult.asDigits(),
        resultNegative
    );

    return {
        ...result,
        numberResult: resultWithProperSign,
        numberOperands: numbers
    };
}

function prepareDivisionOperands(dividend: PositionalNumber, divisor: PositionalNumber): DivisionOperand[][] {
    return applyTransformsByType(
        [
            dividend.asDigits(),
            divisor.asDigits()
        ],
        [OperandsTransformType.TrimExcessZeros, OperandsTransformType.ScaleToDivisor]
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
    let numIterations = 0;
    const maxNumIterations = 100;
    while (keepDividing(dividend, prevResult, fractionPrecision, firstDividendSliceLength)) {
        numIterations += 1;
        if (numIterations > maxNumIterations) {
            throw Error('Possible infinite loop in division, stopping');
        }
        const res = divideAtPosition(dividend, divisor, prevResult, firstDividendSliceLength);
        if (!firstDividendSliceLength) {
            firstDividendSliceLength = res.dividendSlice.slice.numDigits();
        }

        positionResults.push(res);
        prevResult = res;
    }

    const resultDigits = positionResultsToNumber(positionResults);
    const numberResult = fromDigits(trimLeadingZeros(resultDigits));

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
    assertContinuous(positionDigits);
    return addMissingLeadingZeros(positionDigits);
}

function addMissingLeadingZeros(digits: DivisionOperand[]): DivisionOperand[] {
    const msp = mostSignificantPosition(digits);
    if(msp >= 0) return digits;
    const numMissing = Math.abs(msp);
    return padWithZeroDigits(digits, digits[0].base, digits.length + numMissing, 'Left');
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

export function divideAtPosition(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult, firstDividendSliceLength?: number): DivisionPositionResult {
    const divisionIndex = prev ? prev.divisionIndex + 1 : 0;
    const dividendSlice = getDividendSlice(dividend, divisor, prev, firstDividendSliceLength);
    const { slice, sliceSourceLsp } = dividendSlice;
    const divisorPosNum = fromDigits(divisor);

    // estimate how many times the divisor will fit in dividend slice
    const outputPosition = prev ? prev.valueAtPosition.position - 1 : sliceSourceLsp;
    const quotient = integerQuotient(slice, divisorPosNum, outputPosition);
    const quotientNum = fromDigits([quotient]);

    // subtraction for position - get subtrahend: dividendSlice * quotient
    const divisorTimesQuotient = multiplyDefault([divisorPosNum, quotientNum]);
    const posSubtraction = subtractPositionalNumbers([slice, divisorTimesQuotient.numberResult]);
    const remainder = posSubtraction.numberResult.asDigits();

    return {
        operands: [],
        remainder,
        remainderDecimal: posSubtraction.numberResult.decimalValue.toNumber(),
        divisionIndex,
        multiplicationResult: divisorTimesQuotient,
        subtractionResult: posSubtraction,
        dividendSlice,
        valueAtPosition: quotient
    };
}


export function getDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult, firstSliceLength?: number): DividendSlice {
    if (!prev) return getInitialDividendSlice(dividend, divisor);
    return getNextDividendSlice(dividend, divisor, prev, firstSliceLength);
}

function assertContinuous<T extends Digit>(digits: T[]) {
    digits.reduce((prevPosition: number | null, currDigit: T, index: number) => {
        const currPosition = currDigit.position;
        if (prevPosition == null) return currPosition;
        const expectedPosition = prevPosition - 1;
        if (currPosition !== expectedPosition) {
            const message = `Digits ${digitsToStr(digits)} are not continous at index: ${index}`
                + `\nExpected position: ${expectedPosition} Actual position: ${currPosition}`;
            throw Error(message);
        }
        return currPosition;
    }, null);
}


function getNextDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[], prev: DivisionPositionResult, firstSliceLength?: number): DividendSlice {
    const nextDigitIndex = prev.divisionIndex + firstSliceLength || 0;
    const nextDividendDigitPosition = prev.dividendSlice.sliceSourceLsp -1;
    const nextDividendDigit = getNextWithZeroFallback(dividend, nextDigitIndex, nextDividendDigitPosition);
    const digitsSlice = [...prev.remainder, nextDividendDigit];
    const reindexedDigitsSlice = reindexToLsp(digitsSlice, 0);

    return {
        slice: fromDigits(reindexedDigitsSlice),
        sliceSourceLsp: leastSignificantPosition(digitsSlice)
    };
}

function getNextWithZeroFallback(dividend: DivisionOperand[], digitIndex: number, digitPosition: number): DivisionOperand {
    const nextDividendDigit = dividend[digitIndex];
    if (nextDividendDigit) return nextDividendDigit;
    const { base } = dividend[0];
    return BaseDigits.getDigit(0, base, digitPosition);
}

function reindexToLsp(digits: DivisionOperand[], lsp = 0): DivisionOperand[] {
    return digits.map((d, i) => ({ ...d, position: digits.length - i - lsp }));
}

function getInitialDividendSlice(dividend: DivisionOperand[], divisor: DivisionOperand[]): DividendSlice {
    const sliceLength = initialSliceLength(dividend, divisor);
    const digitsSlice = dividend.slice(0, sliceLength);
    const reindexedDigitsSlice = reindexToLsp(dividend.slice(0, sliceLength), 0);
    return {
        slice: fromDigits(trimLeadingZeros(reindexedDigitsSlice)),
        sliceSourceLsp: leastSignificantPosition(digitsSlice)
    };
}

function initialSliceLength(dividend: DivisionOperand[], divisor: DivisionOperand[]): number {
    const dividendAsNum = fromDigits(dividend).toNumber();
    const divisorNum = fromDigits(divisor).toNumber();
    if(divisorNum > dividendAsNum) return 1;
    const numDivisorDigits = divisor.length;
    const sliceAsNum = fromDigits(dividend.slice(0, numDivisorDigits)).toNumber();
    const divisorAsNum = fromDigits(divisor).toNumber();
    return divisorAsNum > sliceAsNum
        ? numDivisorDigits + 1
        : numDivisorDigits;
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
