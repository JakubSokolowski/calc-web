import React, { FC } from 'react';
import { fromNumber, PositionalNumber } from '@calc/calc-arithmetic';
import { DisplayBase } from '@calc/positional-ui';
import { InlineMath } from '@calc/common-ui';
import { formatWithLatexSpaces } from '../../functions/latex-utils';

interface P {
    input: PositionalNumber;
    display: DisplayBase;
}

export const InfoForBase:FC<P> = ({input, display}) => {
    const {base, showComplement} = display;

    const inTargetBase = input.base() === base
        ? input
        : fromNumber(input.decimalValue, base).result;

    const numberRepresentation = `X_{${base}}=${formatWithLatexSpaces(inTargetBase.toString())}`;
    const complementRepresentation = `X_{U${base}}=${formatWithLatexSpaces(inTargetBase.complement.toString())}`;

    return (
        <div>
            <div data-test={`representation-${base}`}>
                <InlineMath math={numberRepresentation}/>
            </div>
            {
                showComplement &&
                <div data-test={`complement-${base}`}>
                    <InlineMath math={complementRepresentation}/>
                </div>
            }
        </div>
    );
};
