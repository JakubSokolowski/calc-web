import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { InlineMath } from 'react-katex';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

interface P {
    conversion: Conversion;
    firstStage: number;
    lastStage: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        operand: {
            padding: '2px'
        },
        symbol: {
            padding: '2px'
        }
    })
);

export const ResultEquation: FC<P> = ({ conversion, firstStage, lastStage }) => {
    const classes = useStyles();
    if (!conversion) return null;

    const output = conversion.getStage(lastStage);
    const [inputRep, inputBase] = conversion.getStage(firstStage).input;

    return (
        <div className={classes.row}>
            <PositionalNumberComponent base={inputBase} representation={inputRep} tooltipBase={inputBase === 10 ? undefined : 10}/>
            <div className={classes.symbol}>
                <InlineMath math={'='}/>
            </div>
            <PositionalNumberComponent base={output.result.base()} representation={output.result.toString()}/>
        </div>
    );
};
