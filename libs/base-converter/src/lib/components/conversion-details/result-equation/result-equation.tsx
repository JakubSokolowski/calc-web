import React, { FC } from 'react';
import { Conversion, fromStringDirect } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { styled } from '@mui/material';
import { InlineMath } from '@calc/common-ui';

interface P {
    conversion: Conversion;
    firstStage: number;
    lastStage: number;
}

const PREFIX = 'ResultEquation';

const classes = {
    row: `${PREFIX}-row`,
    operand: `${PREFIX}-operand`,
    symbol: `${PREFIX}-symbol`
};


const Root = styled('div')(({ theme }) => ({
    [`& .${classes.row}`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    [`& .${classes.operand}`]: {
        padding: '2px'
    },
    [`& .${classes.symbol}`]: {
        padding: '2px'
    }
}));


export const ResultEquation: FC<P> = ({ conversion, firstStage, lastStage }) => {
    if (!conversion) return null;

    const output = conversion.getStage(lastStage);
    const [inputRep, inputBase] = conversion.getStage(firstStage).input;
    const inputNumber = fromStringDirect(inputRep, inputBase);

    return (
        <Root>
            <div className={classes.row} data-test='result-equation'>
                <PositionalNumberComponent input={inputNumber}/>
                <div className={classes.symbol}>
                    <InlineMath math={'='}/>
                </div>
                <PositionalNumberComponent input={output.result}/>
            </div>
        </Root>
    );
};
