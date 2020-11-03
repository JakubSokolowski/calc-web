import React, { FC } from 'react';
import { InlineMath } from 'react-katex';
import { Tooltip } from '@material-ui/core';
import { fromString } from '@calc/calc-arithmetic';
import { replaceAll } from '@calc/utils';

interface P {
    base: number;
    representation: string;
    tooltipBase?: number;
    className?: string;
}

function formatWithLatexSpaces(rep: string): string {
    const hardSpace = '\\;';
    return replaceAll(rep, ' ', hardSpace)
}

export const PositionalNumberComponent: FC<P>  = ({base, representation, tooltipBase, className}) => {

    const formattedRepresentation = formatWithLatexSpaces(representation);

    if(tooltipBase) {
        const tooltipRes = fromString(representation, base, tooltipBase).result;
        const formattedTooltipRes = formatWithLatexSpaces(tooltipRes.valueInBase);

        return (
            <Tooltip
                title={
                    <React.Fragment>
                        <PositionalNumberComponent base={tooltipRes.base} representation={formattedTooltipRes}/>
                    </React.Fragment>
                }
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
            <InlineMath math={`${formattedRepresentation}_{${base}}`}/>
        </div>
    )
};


