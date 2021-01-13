import React, { FC } from 'react';
import { PositionalNumber, PositionalSourceType } from '@calc/calc-arithmetic';
import { InlineMath } from 'react-katex';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

interface P {
    number: PositionalNumber;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: theme.spacing(0.5)
        }
    })
);

export const ComplementResult: FC<P> = ({ number }) => {
    const classes = useStyles();

    const num = `${number.toString()}_{${number.base}}`;
    const complement = number.complement.toString();

    const math: string = number.sourceType === PositionalSourceType.ComplementStr
        ? `\\overline{ ${complement} }=${num}`
        : `\\overline{${num}}=${number.complement.toString()}`;

    return (
        <div className={classes.row}>
            <InlineMath math={math}/>
        </div>
    );
};


