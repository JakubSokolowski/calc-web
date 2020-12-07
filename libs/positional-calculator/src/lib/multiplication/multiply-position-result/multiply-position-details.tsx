import React, { FC } from 'react';
import { InlineMath } from 'react-katex';
import { MultiplicationPositionResult } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';

interface P {
    result: MultiplicationPositionResult;
}

export const MultiplyPositionDetails: FC<P> = ({ result }) => {
    const base = result.valueAtPosition.base;
    const [multiplicand, multiplier, carry] = result.operands;

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <InlineMath math={'S='}/>
            <PositionalNumberComponent base={base} representation={multiplicand.representationInBase}/>
            <InlineMath math={'*'}/>
            <PositionalNumberComponent base={base} representation={multiplier.representationInBase}/>
            {
                carry &&
                <>
                    <InlineMath math={'+'}/>
                    <PositionalNumberComponent
                        base={carry.carrySourcePosition}
                        representation={carry.representationInBase}
                    />
                </>
            }
            <InlineMath math={'='}/>
            <PositionalNumberComponent base={base} representation={result.valueAtPosition.representationInBase}/>
            {
                result.carry &&
                <>
                    <InlineMath math={'+'}/>
                    <PositionalNumberComponent base={base} representation={result.carry.representationInBase}/>
                </>
            }
        </div>
    );
};
