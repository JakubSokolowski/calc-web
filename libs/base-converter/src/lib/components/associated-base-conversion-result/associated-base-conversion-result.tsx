import React, { FC } from 'react';
import { AssociatedBaseConversion, fromStringDirect } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { InlineMath } from '@calc/common-ui';

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
    const inputNumber = fromStringDirect(inputStr, inputBase).result;

    return (
        <div className={classes.row}>
            <PositionalNumberComponent input={inputNumber}/>
            <div className={classes.symbol}>
                <InlineMath math={'='}/>
            </div>
            <PositionalNumberComponent input={conversion.result} />
        </div>
    );
};
