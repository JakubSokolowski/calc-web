import React, { FC } from 'react';
import { AssociatedBaseConversion } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { InlineMath } from 'react-katex';

interface P {
    conversion: AssociatedBaseConversion;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        symbol: {
            padding: '2px'
        }
    })
);

export const AssociatedBaseConversionResult: FC<P> = ({ conversion }) => {
    const classes = useStyles();

    const [inputStr, inputBase] = conversion.input;
    const outputStr = conversion.result.valueInBase;
    const outputBase = conversion.result.base;

    return (
        <div className={classes.row}>
            <PositionalNumberComponent base={inputBase} representation={inputStr} tooltipBase={10}/>
            <div className={classes.symbol}>
                <InlineMath math={'='}/>
            </div>
            <PositionalNumberComponent base={outputBase} representation={outputStr} tooltipBase={10}/>
        </div>
    );
};
