import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';

interface P {
    conversion: Conversion
}

export const ResultEquation: FC<P> = ({ conversion }) => {
    if (!conversion) return null;

    const input = conversion.getFirstStage();
    const output = conversion.getLastStage();

    const [num, base] = input.input;
    return (
        <span>
            {num}<sub>({base})</sub>
            &nbsp;=&nbsp;
            {output.result.toString()}<sub>({output.result.base})</sub>
        </span>
    );
};
