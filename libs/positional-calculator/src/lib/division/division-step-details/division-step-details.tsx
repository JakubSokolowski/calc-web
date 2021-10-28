import React, { FC } from 'react';
import { digitsToStr, DivisionPositionResult, PositionalNumber, trimLeadingZeros } from '@calc/calc-arithmetic';
import { InlineMath, TranslationWithLatex } from '@calc/common-ui';
import { posNumToLatexStrWithBase } from '@calc/positional-ui';

interface P {
    result: DivisionPositionResult;
    divisor: PositionalNumber;
}

export const DivisionStepResultDetails: FC<P> = ({ result, divisor }) => {
    const dividendSlice = result.dividendSlice.slice;
    const sliceStr = posNumToLatexStrWithBase(dividendSlice);
    const sliceWithBase = posNumToLatexStrWithBase(result.dividendSlice.slice);
    const divisorWithBase = posNumToLatexStrWithBase(divisor);
    const remainderStr = digitsToStr(trimLeadingZeros(result.remainder));
    const quotientStr = result.valueAtPosition.representationInBase;
    const minuendStr = result.subtractionResult.numberOperands[0].toStringWithoutExcessZeros();
    const subtrahendStr = result.subtractionResult.numberOperands[1].toStringWithoutExcessZeros();
    const subResultStr = result.subtractionResult.numberResult.toStringWithoutExcessZeros();

    return (
        <div data-test={`division-step-${result.divisionIndex}-${result.valueAtPosition.representationInBase}`}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <InlineMath math={`D_s=${sliceWithBase}, d=${divisorWithBase}`}/>
                <TranslationWithLatex
                    tKey={'positionalCalculator.divisorWillFit'}
                    values={
                        {
                            divisor: divisor.toString(),
                            slice: sliceStr,
                            numTimes: quotientStr
                        }
                    }
                />
                <TranslationWithLatex
                    tKey={'positionalCalculator.nextDivisionResultDigit'}
                    values={{ digit: quotientStr}}
                />
                <InlineMath math={`${divisor} * ${quotientStr} = ${subtrahendStr}`}/>
                <InlineMath math={`${minuendStr} - ${subtrahendStr} = ${subResultStr}`}/>
                <InlineMath math={`D_s/d=${sliceWithBase} / ${divisorWithBase} = ${quotientStr} r ${remainderStr}`}/>
            </div>
        </div>
    );
};
