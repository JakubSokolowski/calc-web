import React, { FC } from 'react';
import { PositionalNumber } from '@calc/calc-arithmetic';
import { InlineMath } from 'react-katex';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { PositionalNumberComponent } from '@calc/ui';

interface P {
    operands: PositionalNumber[];
    result: PositionalNumber;
    joinSymbol: string;
    tooltipBase: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        operand: {
            padding: '2px'
        },
        symbol: {
            padding: '2px'
        }
    })
);

export const OperandRow: FC<P> = ({ operands, joinSymbol, tooltipBase, result }) => {
    const classes = useStyles();
    const operandsWithSymbols = [];

    operands.forEach((op, index) => {
        const num = (
            <PositionalNumberComponent
                className={classes.operand}
                base={op.base}
                representation={op.valueInBase}
                tooltipBase={tooltipBase}
                key={index}
            />
        );

        if(index > 0) {
            const symbol = (
                <div className={classes.symbol} key={`${index}-symbol`}>
                    <InlineMath math={joinSymbol}/>
                </div>
            );
            operandsWithSymbols.push(symbol);
        }

        operandsWithSymbols.push(num);
    });

    const res = (
        <PositionalNumberComponent
            className={classes.operand}
            base={result.base}
            representation={result.valueInBase}
            tooltipBase={tooltipBase}
        />
    );

    const equalSign = (
        <div className={classes.symbol}>
            <InlineMath math={'='}/>
        </div>
    );

    return (
        <div className={classes.row}>
            {operandsWithSymbols}
            {equalSign}
            {res}
        </div>
    );
};
