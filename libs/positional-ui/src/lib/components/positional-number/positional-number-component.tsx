import React, { FC } from 'react';
import { Tooltip } from '@mui/material';
import { replaceAll } from '@calc/utils';
import { InlineMath } from '@calc/common-ui';
import { AdditionalInfo } from '../additional-info/additional-info';
import { PositionalNumber } from '@calc/calc-arithmetic';
import { DisplayBase } from '../../models';

interface P {
    input: PositionalNumber;
    showAdditionalInfo?: boolean;
    additionalBases?: DisplayBase[];
    className?: string;
}

function formatWithLatexSpaces(rep: string): string {
    const hardSpace = '\\;';
    return replaceAll(rep, ' ', hardSpace)
}

export const PositionalNumberComponent: FC<P>  = ({input, showAdditionalInfo = true, additionalBases, className}) => {
    const formattedRepresentation = formatWithLatexSpaces(input.toString());
    const base = input.base();

    if(showAdditionalInfo) {
        return (
            <Tooltip
                title={<AdditionalInfo input={input} additionalBases={additionalBases}/>}
                placement={'top-end'}
                arrow
            >
                <div className={className}>
                    <InlineMath math={`${formattedRepresentation}_{${base}}`}/>
                </div>
            </Tooltip>
        )
    }

    return (
        <div className={className}>
            <InlineMath math={`${formattedRepresentation}_{${input.base()}}`}/>
        </div>
    )
};


