import React, { FC } from 'react';
import { digitsToStr, MultiplicationRowResult } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { InlineMath } from '@calc/common-ui';

interface P {
    result: MultiplicationRowResult;
}

export const MultiplyRowDetails: FC<P> = ({ result }) => {
    const base = result.resultDigits[0].base;
    const multiplicandStr = digitsToStr(result.multiplicands);
    const multiplierStr = result.multiplier.representationInBase;
    const resultStr = digitsToStr(result.resultDigits);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <PositionalNumberComponent base={base} representation={multiplicandStr}/>
            <InlineMath math={'*'}/>
            <PositionalNumberComponent base={base} representation={multiplierStr}/>
            <InlineMath math={'='}/>
            <PositionalNumberComponent base={base} representation={resultStr}/>
        </div>
    );
};
