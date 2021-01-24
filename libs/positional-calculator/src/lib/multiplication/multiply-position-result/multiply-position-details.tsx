import React, { FC } from 'react';
import { fromNumber, MultiplicationPositionResult } from '@calc/calc-arithmetic';
import { InlineMath } from '@calc/common-ui';

interface P {
    result: MultiplicationPositionResult;
}

export const MultiplyPositionDetails: FC<P> = ({ result }) => {
    const base = result.valueAtPosition.base;
    const [multiplicand, multiplier, carry] = result.operands;

    const resultInBase = fromNumber(result.decimalProduct, base).result.toString();

    return (
        <div>
            <div  style={{ display: 'flex', flexDirection: 'row' }}>
                <InlineMath math={`P=${multiplicand.representationInBase}*${multiplier.representationInBase}`}/>
                {
                    carry &&  <InlineMath math={`+${carry.representationInBase}_C`}/>
                }
                <InlineMath math={`=${resultInBase}`}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {result.carry &&   <InlineMath math={`C=${result.carry.representationInBase},\\;`}/>}
                <InlineMath math={`P=${result.valueAtPosition.representationInBase}`}/>
            </div>
        </div>
    );
};
