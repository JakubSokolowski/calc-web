import React, { FC } from 'react';
import { ComplementConversionResult } from '@calc/calc-arithmetic';
import { InlineMath } from 'react-katex';

interface P {
    result: ComplementConversionResult;
}

export const ComplementResult: FC<P> = ({ result }) => {
    const num = `${result.inputNumber.toString()}_{${result.inputNumber.base}}`;
    const math = `\\overline{${num}}=${result.inputNumber.complement.toString()}`;
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <InlineMath math={math}/>
        </div>
    );
};
