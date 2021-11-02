import {
    AdditionResult, BaseDigits,
    digitsToStr,
    DivisionOperand,
    DivisionPositionResult,
    DivisionResult,
    DivisionType,
    fromDigits, getComplement, leastSignificantPosition, mostSignificantPosition, multiplyDefault,
    OperationType,
    PositionalNumber, PositionResult, subtractPositionalNumbers,
    trimLeadingZeros
} from '@calc/calc-arithmetic';
import {
    getDividendSlice,
    integerPartOnly, integerQuotient,
    keepDividing,
    positionResultsDigitsToNumber, positionResultsToNumber,
    reindexToLsp
} from './division';
import { applyTransformsByType } from '../transform/apply-by-type';
import { OperandsTransformType } from '../transform/preprocessor-type';
import { addDigitsArrays } from '../addition';
import { NumberComplement } from '../number-complement';
import { shiftRight } from '../digits';
import { getComplementExtension } from '../complement-extension';


export function divideComplement(numbers: PositionalNumber[], fractionPrecision = 5): DivisionResult {
    const [dividend, divisor] = numbers;
    const [dividendDigits, divisorDigits] = prepareDivisionOperands(dividend, divisor);
    const signsDiffer = dividend.isNegative() != divisor.isNegative();
    const result = divideComplementDigits(dividendDigits, divisorDigits, signsDiffer, fractionPrecision);

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
            dividend.complement.asDigits(),
            divisor.complement.asDigits()
        ],
        [OperandsTransformType.TrimExcessZeros, OperandsTransformType.ScaleToDivisor]
    );
}

interface FirstPositionSumOperands {
    dividendComplement: NumberComplement;
    shiftedDivisor: DivisionOperand[];
    positionShift: number;
}

export interface FirstPositionInfo extends FirstPositionSumOperands {
    dividendSlice: DivisionOperand[];
    nextDividendSlice: DivisionOperand[];
    sum: AdditionResult;
    positionResult: DivisionPositionResult;
}



export function adjustInitialPosition(dividend: DivisionOperand[], divisor: DivisionOperand[]): FirstPositionInfo {
    const {dividendComplement, shiftedDivisor, positionShift} = getInitialPositionSumOperands(dividend, divisor);
    const dividendSlice = reindexToLsp(dividend.slice(0, shiftedDivisor.length));
    const sum = addDigitsArrays([dividendSlice, shiftedDivisor]);

    const initialRemainder = sum.resultDigits;
    const restOfDividend = dividend.slice(shiftedDivisor.length);
    const nextDividendSlice = prepNextDividendSlice([...initialRemainder, ...restOfDividend]);
    const base = sum.numberResult.base();

    return {
        dividendComplement,
        sum,
        shiftedDivisor,
        dividendSlice,
        nextDividendSlice,
        positionShift,
        positionResult: {
            divisionIndex: 0,
            valueAtPosition: {
                position: leastSignificantPosition(dividendSlice),
                valueInDecimal: base-1,
                base: sum.numberResult.base(),
                representationInBase: BaseDigits.getRepresentation(base-1, base, true)
            },
            dividendSlice: {
                sliceSourceLsp: leastSignificantPosition(dividendSlice),
                slice: fromDigits(dividendSlice).result,
            },
            remainder: initialRemainder,

        } as DivisionPositionResult
    }
}

function prepNextDividendSlice(digits: DivisionOperand[]) {
    const withoutExtension = digits.filter(d => !d.isComplementExtension);
    const withoutLeadingZeros = trimLeadingZeros(withoutExtension);
    return reindexToLsp(withoutLeadingZeros, 0);
}

export function getInitialPositionSumOperands(dividend: DivisionOperand[], divisor: DivisionOperand[]): FirstPositionSumOperands {
    const dividendComplement = getComplement(new NumberComplement(dividend));
    const numPositionShifted = 1;
    const shiftedDivisor = reindexToLsp(shiftRight(divisor, numPositionShifted), 0);

    return {
        dividendComplement,
        shiftedDivisor,
        positionShift: numPositionShifted
    }
}



export function divideComplementDigits(dividend: DivisionOperand[], divisor: DivisionOperand[], signsDiffer: boolean, fractionPrecision = 5): DivisionResult {
    if (!integerPartOnly(divisor)) {
        throw Error(
            `For divideDigits(...) divisor: ${digitsToStr(divisor)} cannot have fraction.`
        );
    }
    const firstDivision = adjustInitialPosition(dividend, divisor);
    const positionResults = divideRestOfDigits(firstDivision.nextDividendSlice, divisor, firstDivision.positionResult, fractionPrecision);
    const resultDigits = positionResultsToNumber(positionResults);
    const numberResult = fromDigits(trimLeadingZeros(resultDigits)).result;

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



export function divideRestOfDigits(dividend: DivisionOperand[], divisor: DivisionOperand[], firstPositionRes: DivisionPositionResult, fractionPrecision = 5): DivisionPositionResult[] {
    if (!integerPartOnly(divisor)) {
        throw Error(
            `For divideDigits(...) divisor: ${digitsToStr(divisor)} cannot have fraction.`
        );
    }

    const positionResults: DivisionPositionResult[] = [firstPositionRes];
    let prevResult: DivisionPositionResult = firstPositionRes;
    let firstDividendSliceLength = firstPositionRes.dividendSlice.slice.numDigits() - 2;
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

   return positionResults;
}


export function divideAtPosition(dividend: DivisionOperand[], divisor: DivisionOperand[], prev?: DivisionPositionResult, firstDividendSliceLength?: number): DivisionPositionResult {
    const divisionIndex = prev ? prev.divisionIndex + 1 : 0;
    const dividendSlice = getDividendSlice(dividend, divisor, prev, firstDividendSliceLength);
    const { slice, sliceSourceLsp } = dividendSlice;
    console.log(slice.complement.toString(), digitsToStr(dividend))
    const divisorPosNum = fromDigits(divisor).result;


    // estimate how many times the divisor will fit in dividend slice
    const outputPosition = prev ? prev.valueAtPosition.position - 1 : sliceSourceLsp;
    const quotient = integerQuotient(slice, divisorPosNum, outputPosition);
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
        dividendSlice,
        valueAtPosition: quotient
    };
}





