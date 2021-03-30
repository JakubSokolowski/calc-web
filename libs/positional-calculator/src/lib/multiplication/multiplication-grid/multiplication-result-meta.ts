import { extractResultMeta, ResultMeta } from '@calc/grid';
import { Digit, MultiplicationResult, MultiplicationType } from '@calc/calc-arithmetic';

export interface MultiplicationResultMeta extends ResultMeta {
    numMultiplicandFractionalDigits: number;
    numMultiplierDigits: number;
    numMultiplicandDigits: number;
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

class WithExtensionMeta extends DefaultMultiplicationMeta {
    protected totalWidth() {
        const resultLength = this.result.resultDigits.length;
        const operandsSpan = this.getMinOperandsSpan();
        return Math.max(resultLength, operandsSpan) + 1;
    }

    protected getMinOperandsSpan(): number {
        if (!this.operandsHaveFractionPart() || !this.areOperandsBinary()) {
            return super.getMinOperandsSpan();
        }
        const [multiplicand, multiplier] = this.result.operands;
        return this.countSignificantForSpan(multiplicand) + this.countSignificantForSpan(multiplier);
    }

    private countSignificantForSpan(digits: Digit[]): number {
        const [extension, ...rest] = digits;
        return (extension.valueInDecimal === 0 ? 0 : 1) + rest.length;
    }

    private operandsHaveFractionPart() {
        const [multiplicand, multiplier] = this.result.numberOperands;
        return multiplicand.numFractionPartDigits() > 0 || multiplier.numFractionPartDigits() > 0;
    }

    private areOperandsBinary() {
        return this.result.numberResult.base().toString() === `${2}`;
    }
}

class WithoutExtensionMeta extends DefaultMultiplicationMeta {
    protected getMinOperandsSpan(): number {
        const correctionOffset = 1;
        return super.getMinOperandsSpan() + correctionOffset;
    }
}

class BoothMeta extends DefaultMultiplicationMeta {
}

class BoothMcSorleyMeta extends BoothMeta {
}


function getMetaBuilder(result: MultiplicationResult) {
    switch (result.algorithmType) {
        case MultiplicationType.Default:
            return new DefaultMultiplicationMeta(result);
        case MultiplicationType.WithExtension:
            return new WithExtensionMeta(result);
        case MultiplicationType.WithoutExtension:
            return new WithoutExtensionMeta(result);
        case MultiplicationType.BoothMcSorley:
            return new BoothMeta(result);
        case MultiplicationType.Booth:
            return new BoothMcSorleyMeta(result)
    }
}
