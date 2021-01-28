import React, { FC } from 'react';
import { PositionalNumber } from '@calc/calc-arithmetic';
import { DisplayBase } from '../../models';
import { InfoForBase } from '../info-for-base/info-for-base';

interface P {
    input: PositionalNumber;
    additionalBases?: DisplayBase[];
}


export const AdditionalInfo: FC<P> = ({ input, additionalBases }) => {
    const defaultBases = getDefaultBases(input);
    const bases = additionalBases || defaultBases;

    const info = bases.map((base, index) => {
        return <InfoForBase key={index} input={input} display={base}/>
    });

    return (
        <div>
            {info}
        </div>
    )
};

function getDefaultBases(input: PositionalNumber): DisplayBase[] {
    if(input.base() === 10) return [ {base: 10, showComplement: true}];
    return [{base: input.base(), showComplement: true}, {base: 10}]
}

