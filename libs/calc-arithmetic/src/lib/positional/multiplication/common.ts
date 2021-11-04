import { BaseDigits } from '../base-digits';
import { AdditionOperand, AdditionResult, MultiplicationOperand, MultiplicationPositionResult } from '../../models';
import { leastSignificantPosition, shiftRight } from '../digits';
import { trimEndByPredicate } from '@calc/utils';
import { fromDigits } from '../base-converter';
import { PositionalNumber } from '@calc/calc-arithmetic';

export function multiplyDigits(
    multiplicand: MultiplicationOperand,
    multiplier: MultiplicationOperand,
    carry?: MultiplicationOperand
): MultiplicationPositionResult {
    const base = multiplicand.base;
    const position = multiplicand.position;
    const shiftedPosition = multiplicand.position + multiplier.position;

    const decimalProduct = multiplicand.valueInDecimal * multiplier.valueInDecimal;
    const decimalProductWithCarry = decimalProduct + (carry ? carry.valueInDecimal : 0);

    const decimalPositionValue = decimalProductWithCarry % base;
    const representationInBase = BaseDigits.getRepresentation(decimalPositionValue, base);
    const decimalCarry = (decimalProductWithCarry - decimalPositionValue) / base;

    const valueAtPosition: MultiplicationOperand = {
        base,
        representationInBase: representationInBase,
        valueInDecimal: decimalPositionValue,
        position: position
    };

    const operands = [multiplicand, multiplier];
    if (carry) operands.push(carry);

    if (!decimalCarry) return {
        valueAtPosition,
        operands: operands,
        shiftedPosition,
        decimalProduct: decimalProductWithCarry
    };

    const carryRep = BaseDigits.getRepresentation(decimalCarry, base);

    const nextPositionCarry: MultiplicationOperand = {
        position: position + 1,
        carrySourcePosition: position,
        base,
        valueInDecimal: decimalCarry,
        representationInBase: carryRep,
        isCarry: true
    };

    return {
        valueAtPosition,
        operands,
        carry: nextPositionCarry,
        shiftedPosition,
        decimalProduct: decimalProductWithCarry
    };
}

export function adjustForMultiplierFraction(additionResult: AdditionResult, multiplierRow: MultiplicationOperand[]): AdditionResult {
    const leastSignificantPosition = multiplierRow[multiplierRow.length - 1].position;
    const numFractionDigits = Math.abs(leastSignificantPosition);
    if (numFractionDigits < 1) return additionResult;

    const shiftedDigits = shiftRight(additionResult.resultDigits, numFractionDigits);
    const trimmedDigits = trimEndByPredicate(shiftedDigits, (digit) => digit.position < -1 && digit.valueInDecimal === 0);
    const shiftedNum = fromDigits(trimmedDigits);

    return {
        ...additionResult,
        resultDigits: shiftedDigits,
        numberResult: shiftedNum
    };
}

export function extractResultDigitsFromMultiplicationRow(positionResults: MultiplicationPositionResult[]): MultiplicationOperand[] {
    const digitsFromPositions: AdditionOperand[] = positionResults.map((res) => {
        return { ...res.valueAtPosition };
    });
    const carryDigitsNotConsideredInResult: AdditionOperand[] = [];

    positionResults.forEach((result) => {
        if (result.carry && !digitsFromPositions.find((posDgt) => result.carry.position === posDgt.position)) {
            carryDigitsNotConsideredInResult.push(result.carry);
        }
    });

    return [...carryDigitsNotConsideredInResult.reverse(), ...digitsFromPositions.reverse()];
}

export function getMultiplicationResultPositionCap(multiplicandRow: MultiplicationOperand[], multiplierRow: MultiplicationOperand[]) {
    const multiplicandLSP = leastSignificantPosition(multiplicandRow);
    const multiplierLSP = leastSignificantPosition(multiplierRow);
    const globalLSP = Math.min(multiplicandLSP, multiplierLSP);

    return globalLSP + multiplicandRow.length + multiplierRow.length;
}

export class Multiplication {
    protected readonly multiplicand: PositionalNumber;
    protected readonly multiplier: PositionalNumber;

    constructor(numbers: PositionalNumber[]) {
        const [multiplicand, multiplier] = numbers;
        this.multiplicand = multiplicand;
        this.multiplier = multiplier;
    }

    multiplyDigits(multiplicand: MultiplicationOperand, multiplier: MultiplicationOperand, carry?: MultiplicationOperand) {
        return multiplyDigits(multiplicand, multiplier, carry);
    }

    protected extractResultDigitsFromMultiplicationRow(positionResults: MultiplicationPositionResult[]): MultiplicationOperand[] {
        return extractResultDigitsFromMultiplicationRow(positionResults);
    }

    protected adjustForMultiplierFraction(additionResult: AdditionResult, multiplierRow: MultiplicationOperand[]): AdditionResult {
        return adjustForMultiplierFraction(additionResult, multiplierRow);
    }
}
