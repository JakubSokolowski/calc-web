import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { PositionalNumberText } from '../../positional-number/positional-number-text';

interface P {
    conversion: Conversion
    firstStage: number,
    lastStage: number
}

export const ResultEquation: FC<P> = ({ conversion, firstStage, lastStage }) => {
    if (!conversion) return null;

    const input = conversion.getStage(firstStage);
    const output = conversion.getStage(lastStage);

    const [num, base] = input.input;
    return (
        <span>
            <PositionalNumberText value={num} base={base}/>
            &nbsp;=&nbsp;
            <PositionalNumberText value={output.result.toString()} base={output.result.base}/>
        </span>
    );
};
