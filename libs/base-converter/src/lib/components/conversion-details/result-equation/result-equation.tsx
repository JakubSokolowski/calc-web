import React, { FC } from 'react';
import { Conversion, fromStringDirect } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import { InlineMath } from '@calc/common-ui';

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
    const inputNumber = fromStringDirect(inputRep, inputBase).result;

    return (
        <div className={classes.row} data-test='result-equation'>
            <PositionalNumberComponent input={inputNumber}/>
            <div className={classes.symbol}>
                <InlineMath math={'='}/>
            </div>
            <PositionalNumberComponent input={output.result}/>
        </div>
    );
};
