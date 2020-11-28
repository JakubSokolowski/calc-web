import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { NumberSubscript } from '@calc/ui';

interface P {
    conversion: Conversion;
    firstStage: number;
    lastStage: number;
}

export const ResultEquation: FC<P> = ({ conversion, firstStage, lastStage }) => {
    if (!conversion) return null;

    const input = conversion.getStage(firstStage);
    const output = conversion.getStage(lastStage);

    const [num, base] = input.input;
    return (
        <span>
            <NumberSubscript value={num} subscript={base}/>
            &nbsp;=&nbsp;
            <NumberSubscript value={output.result.toString()} subscript={output.result.base}/>
        </span>
    );
};
