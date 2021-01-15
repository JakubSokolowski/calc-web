import { BaseDigits } from './base-digits';
import { Borrow, Digit, SubtractionOperand, SubtractionPositionResult, SubtractionResult } from '../models';
import {
    buildLookup,
    extractResultDigitsFromSubtraction,
    findPositionRange,
    NUM_ADDITIONAL_EXTENSIONS
} from './operation-utils';
import { areSameBaseNumbers, buildPositionalNumberFromDigits } from './addition';
import { OperationType } from '../models/operation';
import { SubtractionType } from '../models/operation-algorithm';
import { fromNumber } from './base-converter';
import { PositionalNumber } from './positional-number';
import { alignFractions } from './digits';


export function subtractPositionalNumbers(numbers: PositionalNumber[]): SubtractionResult {
    if (!areSameBaseNumbers(numbers)) {
        throw Error('Numbers to add must have same base');
    }
    const numbersAsDigits = alignFractions( numbers.map((number) => number.complement.asDigits()));
    const result = subtractDigitArrays(numbersAsDigits);
    return {...result, numberOperands: numbers};
}

export function subtractDigitsAtPosition(operands: SubtractionOperand[], position: number, globalBase: number): SubtractionPositionResult {
    const base = operands[0] ? operands[0].base : globalBase;

    if (!operands.length) {
        return {
            valueAtPosition: {
                representationInBase: BaseDigits.getRepresentation(0, base),
                valueInDecimal: 0,
                position: position,
                base: globalBase
            },
            operands: []
        };
    }

    const [minuend, ...subtrahends] = operands;

    const subtrahendsSum = subtrahends.reduce((sum, digit) => {
        return sum + digit.valueInDecimal;
    }, 0);

    const needsToBorrow = subtrahendsSum > minuend.valueInDecimal;

    if (!needsToBorrow) {
        const decimalPositionValue = minuend.valueInDecimal - subtrahendsSum;
        const valueInBase = BaseDigits.getRepresentation(decimalPositionValue, base);

        return {
            operands,
            valueAtPosition: {
                valueInDecimal: decimalPositionValue,
                representationInBase: valueInBase,
                position,
                base
            }
        };
    }

    const borrow = getBorrow(minuend.valueInDecimal, subtrahendsSum, base, position);
    const positionDifference = borrow.fromPosition - position;
    const newMinuend = minuend.valueInDecimal + (borrow.amount * Math.pow(base, positionDifference));
    const decimalPositionValue = newMinuend - subtrahendsSum;
    const valueInBase = BaseDigits.getRepresentation(decimalPositionValue, base);

    return {
        operands,
        valueAtPosition: {
            valueInDecimal: decimalPositionValue,
            representationInBase: valueInBase,
            position,
            base
        },
        borrow: borrow
    };
}


export function subtractDigitArrays(operands: SubtractionOperand[][]): SubtractionResult {
    const { mostSignificantPosition, leastSignificantPosition } = findPositionRange(operands);
    const positionResults: SubtractionPositionResult[] = [];
    const base = operands[0][0].base;
    const digitsPositionLookup: Record<number, SubtractionOperand>[] = buildLookup(operands, mostSignificantPosition);

    let currentPosition = leastSignificantPosition;

    while (currentPosition <= mostSignificantPosition + NUM_ADDITIONAL_EXTENSIONS - 1) {
        const allDigitsAtCurrentPosition: SubtractionOperand[] = digitsPositionLookup
            .map((digits) => digits[currentPosition])
            .filter((digit) => !!digit);

        const digitsToSubtract = [...allDigitsAtCurrentPosition];
        const positionResult = subtractDigitsAtPosition(digitsToSubtract, currentPosition, base);

        if (positionResult.borrow) {
            const minuend = digitsPositionLookup[0];
            const minuendDigits = operands[0];
            borrowFromPosition(base, positionResult.borrow, minuend, minuendDigits);
            borrowToSource(base, positionResult.borrow, minuend, minuendDigits);

            // after transforms, save proper borrow chain to position result
            const positionResultMinuendDigit = positionResult.operands[0];
            const digitAfterApplyingBorrow =  minuendDigits.find((d) => d.position === currentPosition);

            if(digitAfterApplyingBorrow) {
                positionResultMinuendDigit.borrowChain = digitAfterApplyingBorrow.borrowChain
            }
        }

        positionResults.push(positionResult);
        currentPosition += 1;
    }

    const resultDigits = extractResultDigitsFromSubtraction(positionResults);
    const numberResult = buildPositionalNumberFromDigits(resultDigits);

    return {
        operands,
        stepResults: positionResults,
        resultDigits,
        numberResult,
        operation: OperationType.Subtraction,
        algorithmType: SubtractionType.Default,
        numberOperands: []
    };
}

function borrowFromPosition(base: number, borrow: Borrow, minuendLookup: Record<number, SubtractionOperand>, minuendDigits: SubtractionOperand[]): void {
    const { fromPosition, amount } = borrow;

    const beforeBorrow: Digit = { ...minuendLookup[fromPosition] };
    const valueBeforeBorrow = beforeBorrow.valueInDecimal;

    const valueAfterBorrow = valueBeforeBorrow - amount;
    const representationAfterBorrow = fromNumber(valueAfterBorrow, base).result.toString();
    const afterBorrow: Digit = {
        ...beforeBorrow,
        valueInDecimal: valueAfterBorrow,
        representationInBase: representationAfterBorrow
    };

    const positionIdx = minuendDigits.findIndex((d) => d.position === fromPosition);
    if (positionIdx >= 0) {
        if (minuendDigits[positionIdx].borrowChain) {
            minuendDigits[positionIdx].borrowChain.push(afterBorrow);
        } else {
            minuendDigits[positionIdx].borrowChain = [beforeBorrow, afterBorrow];
        }
    }
    minuendLookup[fromPosition] = { ...afterBorrow };
}

function borrowToSource(base: number, borrow: Borrow, lookupMinuend: Record<number, SubtractionOperand>, opMinuend: SubtractionOperand[]): void {
    const { sourcePosition, amount, fromPosition } = borrow;

    const beforeBorrow: Digit = { ...lookupMinuend[sourcePosition] };
    const valueBeforeBorrow = beforeBorrow.valueInDecimal;

    const positionDifference = fromPosition - sourcePosition;

    const valueAfterBorrow = valueBeforeBorrow + (amount * Math.pow(base, positionDifference));
    const representationAfterBorrow = fromNumber(valueAfterBorrow, base).result.toString();

    const afterBorrow: Digit = {
        ...beforeBorrow,
        valueInDecimal: valueAfterBorrow,
        representationInBase: representationAfterBorrow
    };

    const positionIdx = opMinuend.findIndex((d) => d.position === sourcePosition);

    if (positionIdx >= 0) {
        if (opMinuend[positionIdx].borrowChain) {
            opMinuend[positionIdx].borrowChain.push(afterBorrow);
        } else {
            opMinuend[positionIdx].borrowChain = [beforeBorrow, afterBorrow];
        }
    }

    lookupMinuend[sourcePosition] = { ...afterBorrow };
}

function getBorrow(minuend: number, subtrahend: number, base: number, position: number): Borrow {
    let borrow = 1;
    let positionDifference = 1;

    while ((borrow * Math.pow(base, positionDifference)) + minuend < subtrahend) {
        const needsToBorrowFromNextPosition = borrow + 1 >= base;

        if (needsToBorrowFromNextPosition) {
            positionDifference += 1;
            borrow = 1;
        } else {
            borrow += 1;
        }
    }

    return {
        amount: borrow,
        fromPosition: position + positionDifference,
        sourcePosition: position
    };
}
