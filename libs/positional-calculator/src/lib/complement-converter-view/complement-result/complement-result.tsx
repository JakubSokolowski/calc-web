import React, { FC } from 'react';
import { PositionalNumber, PositionalSourceType } from '@calc/calc-arithmetic';
import { styled } from '@mui/material';
import { InlineMath } from '@calc/common-ui';

interface P {
    number: PositionalNumber;
}

const PREFIX = 'ComplementResult';

const classes = {
    row: `${PREFIX}-row`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.row}`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: theme.spacing(0.5)
    },
}));

function serializeForDataTest(value: string): string {
    return value
        .replace('(', '')
        .replace(')', '');
}

export const ComplementResult: FC<P> = ({ number }) => {
    const num = `${number.toString()}_{${number.base()}}`;
    const complement = number.complement.toString();

    const math: string = number.sourceType === PositionalSourceType.ComplementStr
        ? `\\overline{ ${complement} }=${num}`
        : `\\overline{${num}}=${number.complement.toString()}`;

    const dataTest = serializeForDataTest(`cconv-result-${number.complement.toString()}`);

    return (
        <Root>
            <div data-test={dataTest} className={classes.row}>
                <InlineMath math={math}/>
            </div>
        </Root>
    );
};


