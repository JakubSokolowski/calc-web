import { extractResultMeta, ResultMeta } from '@calc/grid';
import { MultiplicationResult, MultiplicationType } from '@calc/calc-arithmetic';

export interface MultiplicationResultMeta extends ResultMeta {
    numMultiplicandFractionalDigits: number;
    numMultiplierDigits: number;
    numMultiplicandDigits:  number;
    numMultiplierFractionalDigits: number;
    maxOperandsFractionDigits: number;
    algorithmType: MultiplicationType;
    hasMultiplicandComplement: boolean;
    totalHeight: number;
}

export function extractMultiplicationResultMeta(result: MultiplicationResult): MultiplicationResultMeta {
    const metaBuilder = getMetaBuilder(result);
    return metaBuilder.buildMeta();
}

export class DefaultMultiplicationMeta {
    result: MultiplicationResult;

    constructor(result: MultiplicationResult) {
        this.result = result;
    }

    buildMeta(): MultiplicationResultMeta {
        const [multiplicand, multiplier] = this.result.numberOperands;

        const numMultiplicandFractionalDigits = multiplicand.numFractionPartDigits();
        const numMultiplierFractionalDigits = multiplier.numFractionPartDigits();

        const maxOperandsFractionDigits = Math.max(numMultiplicandFractionalDigits, numMultiplierFractionalDigits);

        return {
            ...extractResultMeta(this.result),
            fractionDesiredWidth: maxOperandsFractionDigits,
            totalWidth: this.totalWidth(),
            numMultiplicandDigits: multiplicand.numDigits(),
            numMultiplicandFractionalDigits,
            numMultiplierDigits: multiplier.numDigits(),
            numMultiplierFractionalDigits,
            maxOperandsFractionDigits,
            algorithmType: this.result.algorithmType as MultiplicationType,
            totalHeight: this.totalHeight(),
            hasMultiplicandComplement: !!this.result.multiplicandComplement
        };
    }

    protected totalHeight() {
        const multiplicandComplementOffset = this.result.multiplicandComplement ? 1 : 0;
        const operandsOffset = this.result.numberOperands.length;
        const multiplicationRowsOffset = this.result.stepResults.length;
        return multiplicandComplementOffset + operandsOffset + multiplicationRowsOffset;
    }

    protected totalWidth() {
        const resultLength = this.result.resultDigits.length;
        const operandsSpan = this.getMinOperandsSpan();
        return Math.max(resultLength, operandsSpan) + 1;
    }

    protected getMinOperandsSpan(): number {
        const [multiplicand, multiplier] = this.result.operands.map((row) => {
            return row.filter(d => !d.isComplementExtension);
        });

        return multiplicand.length + multiplier.length - 1;
    }
}


class WithoutExtensionMeta extends DefaultMultiplicationMeta {
    protected getMinOperandsSpan(): number {
        const correctionOffset = 1;
        return super.getMinOperandsSpan() + correctionOffset;
    }
}


function getMetaBuilder(result: MultiplicationResult) {
    switch (result.algorithmType) {
        case MultiplicationType.Default:
        case MultiplicationType.WithExtension:
            return new DefaultMultiplicationMeta(result);
        case MultiplicationType.WithoutExtension:
            return new WithoutExtensionMeta(result);
    }
}
