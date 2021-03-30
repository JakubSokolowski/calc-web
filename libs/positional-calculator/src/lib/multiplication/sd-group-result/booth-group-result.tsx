import { FC } from 'react';
import React from 'react';
import { SDConversionGroupResult } from '@calc/calc-arithmetic';
import { InlineMath } from '@calc/common-ui';
import { SdAddRow } from './sd-add-row';

interface P {
    result: SDConversionGroupResult;
}

export const BoothGroupResult: FC<P> = ({ result }) => {
    const resultDigit = result.output[0];
    const position = resultDigit.position;
    const prevPosition = resultDigit.position - 1;
    const [curr, prev] = [...result.input].reverse();

    const positionEquation = `SD_{${position}} = x_{${prevPosition}} - x_{${position}}`;
    const equationResult = `SD_{${position}} = ${prev.valueInDecimal} - ${curr.valueInDecimal} = ${resultDigit.valueInDecimal}`;

    return (
        <div data-test="booth-group">
            <div>
                <InlineMath math={positionEquation} />
            </div>
            <div>
                <InlineMath math={equationResult} />
            </div>
            <div>
                <SdAddRow digitValue={resultDigit.valueInDecimal} />
            </div>
        </div>
    );
};
