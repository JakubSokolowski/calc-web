import React, { FC } from 'react';
import { fromDigits, fromStringDirect, MultiplicationRowResult } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { InlineMath } from '@calc/common-ui';

interface P {
    result: MultiplicationRowResult;
}

export const MultiplyRowDetails: FC<P> = ({ result }) => {
    const multiplicand = fromDigits(result.multiplicands);
    const multiplier = fromStringDirect(result.multiplier.representationInBase, result.multiplier.base);
    const resultNumber = fromDigits(result.resultDigits);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <PositionalNumberComponent input={multiplicand}/>
            <InlineMath math={'*'}/>
            <PositionalNumberComponent input={multiplier}/>
            <InlineMath math={'='}/>
            <PositionalNumberComponent input={resultNumber}/>
        </div>
    );
};
