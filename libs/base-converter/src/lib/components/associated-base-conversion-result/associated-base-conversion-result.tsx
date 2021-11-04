import React, { FC } from 'react';
import { AssociatedBaseConversion, fromStringDirect } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { styled } from '@mui/material';
import { InlineMath } from '@calc/common-ui';


const PREFIX = 'AsocBconResult';

const classes = {
    row: `${PREFIX}-row`,
    symbol: `${PREFIX}-symbol`
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.row}`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    [`& .${classes.symbol}`]: {
        padding: '2px'
    }
}));

interface P {
    conversion: AssociatedBaseConversion;
}

export const AssociatedBaseConversionResult: FC<P> = ({ conversion }) => {
    const [inputStr, inputBase] = conversion.input;
    const inputNumber = fromStringDirect(inputStr, inputBase);

    return (
        <Root>
            <div className={classes.row}>
                <PositionalNumberComponent input={inputNumber}/>
                <div className={classes.symbol}>
                    <InlineMath math={'='}/>
                </div>
                <PositionalNumberComponent input={conversion.result}/>
            </div>
        </Root>
    );
};
