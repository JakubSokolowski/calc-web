import React, { FC } from 'react';
import { ConversionToDecimal } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from '@calc/positional-ui';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { InlineMath } from '@calc/common-ui';

interface P {
    conversionStage: ConversionToDecimal;
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


export const ConversionToDecimalDetails: FC<P> = ({ conversionStage }) => {
    const classes  = useStyles();
    const [inputStr, inputBase] = conversionStage.input;

    const digits = conversionStage.inputDigitList.map((digit, index, arr) => {
        const joinSymbol = index !== arr.length -1 ? ' + ' : '';
        const mathStr = `(${digit.representationInBase} * ${digit.base}^{${digit.position}}) ${joinSymbol}`;

        return <InlineMath key={index} math={mathStr}/>
    });

    return (
        <div id="decimal-conversion-details" className={classes.row}>
            <PositionalNumberComponent base={inputBase} representation={inputStr}/>
            <div className={classes.symbol}>
                <InlineMath math={'='}/>
            </div>
            {digits}
            <div className={classes.symbol}>
                <InlineMath math={'='}/>
            </div>
            <PositionalNumberComponent base={conversionStage.result.base()} representation={conversionStage.result.valueInBase}/>
        </div>
    );
};
