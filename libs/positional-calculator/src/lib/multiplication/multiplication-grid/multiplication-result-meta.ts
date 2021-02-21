import { extractResultMeta, ResultMeta } from '@calc/grid';
import { MultiplicationOperand, MultiplicationResult, MultiplicationType } from '@calc/calc-arithmetic';

export interface MultiplicationResultMeta extends ResultMeta {
    numMultiplicandFractionalDigits: number;
    numMultiplierDigits: number;
    numMultiplierFractionalDigits: number;
    maxOperandsFractionDigits: number;
    algorithmType: MultiplicationType;
    hasMultiplicandComplement: boolean;
    totalHeight: number;
}

export function extractMultiplicationResultMeta(result: MultiplicationResult): MultiplicationResultMeta {
    const [multiplicand, multiplier] = result.numberOperands;

    const numMultiplicandFractionalDigits = multiplicand.numFractionPartDigits();
    const numMultiplierFractionalDigits = multiplier.numFractionPartDigits();

    const maxOperandsFractionDigits = Math.max(numMultiplicandFractionalDigits, numMultiplierFractionalDigits);

    return {
        ...extractResultMeta(result),
        numMultiplierDigits: multiplier.numDigits(),
        fractionDesiredWidth: maxOperandsFractionDigits,
        totalWidth: getTotalWidth(result),
        numMultiplicandFractionalDigits,
        numMultiplierFractionalDigits,
        maxOperandsFractionDigits,
        algorithmType: result.algorithmType as MultiplicationType,
        totalHeight: getTotalHeight(result),
        hasMultiplicandComplement: !!result.multiplicandComplement
    };
}

function getTotalHeight(result: MultiplicationResult): number {
    const multiplicandComplementOffset = result.multiplicandComplement ? 1 : 0;
    const operandsOffset = result.numberOperands.length;
    const multiplicationRowsOffset = result.stepResults.length;
    return multiplicandComplementOffset + operandsOffset + multiplicationRowsOffset;
}

function getTotalWidth(result: MultiplicationResult): number {
    const resultLength = result.resultDigits.length;
    const operandsSpan = getMinOperandsSpan(result.operands);
    return Math.max(resultLength, operandsSpan) + 1;
}

function getMinOperandsSpan(operands: MultiplicationOperand[][]): number {
    const [multiplicand, multiplier] = operands.map((row) => {
        return row.filter(d => !d.isComplementExtension);
    });

    return multiplicand.length + multiplier.length - 1;
}
