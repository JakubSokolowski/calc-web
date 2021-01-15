import React, { FC } from 'react';
import { PositionalNumber } from '@calc/calc-arithmetic';
import { InlineMath } from 'react-katex';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { PositionalNumberComponent } from '@calc/positional-ui';

interface P {
    operands: PositionalNumber[];
    result: PositionalNumber;
    joinSymbol: string;
    tooltipBase: number;
    showAsComplement?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: theme.spacing(0.5)
        },
        operand: {
            padding: '2px'
        },
        symbol: {
            padding: '2px'
        }
    })
);

export const OperandRow: FC<P> = ({ operands, joinSymbol, tooltipBase, result, showAsComplement }) => {
    const classes = useStyles();
    const operandsWithSymbols = [];

    operands.forEach((op, index) => {
        const num = (
            <PositionalNumberComponent
                className={classes.operand}
                base={op.base()}
                representation={showAsComplement ? op.complement.toString() : op.valueInBase}
                tooltipBase={tooltipBase}
                key={index}
                showAsComplement={showAsComplement}
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
            base={result.base()}
            representation={showAsComplement ? result.complement.toString() : result.valueInBase}
            tooltipBase={tooltipBase}
            showAsComplement={showAsComplement}
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
            {
                showAsComplement && <span style={{display: 'inline-flex'}} className="non-complement-result">
                    {equalSign}
                    <PositionalNumberComponent
                        className={classes.operand}
                        base={result.base()}
                        representation={result.valueInBase}
                        tooltipBase={tooltipBase}
                    />
                </span>
            }
        </div>
    );
};
