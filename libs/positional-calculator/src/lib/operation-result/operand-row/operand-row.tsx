import React, { FC } from 'react';
import { PositionalNumber } from '@calc/calc-arithmetic';
import { styled } from '@mui/material';
import { DisplayBase, PositionalNumberComponent } from '@calc/positional-ui';
import { InlineMath } from '@calc/common-ui';

interface P {
    operands: PositionalNumber[];
    result: PositionalNumber;
    joinSymbol: string;
    tooltipBases?: DisplayBase[];
    showAsComplement?: boolean;
}


const PREFIX = 'OperationRenderer';

const classes = {
    row: `${PREFIX}-row`,
    operand: `${PREFIX}-operand`,
    symbol: `${PREFIX}-symbol`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.row}`]: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: theme.spacing(0.5)
    },
    [`& .${classes.operand}`]: {
        padding: '2px'
    },
    [`& .${classes.symbol}`]: {
        padding: '2px'
    },
}));

export const OperandRow: FC<P> = ({ operands, joinSymbol, tooltipBases, result, showAsComplement }) => {
    const operandsWithSymbols = [];

    operands.forEach((op, index) => {
        const num = (
            <PositionalNumberComponent
                input={op}
                className={classes.operand}
                key={index}
                additionalBases={tooltipBases}
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
            input={result}
        />
    );

    const equalSign = (
        <div className={classes.symbol}>
            <InlineMath math={'='}/>
        </div>
    );

    return (
        <Root>
            <div className={classes.row}>
                {operandsWithSymbols}
                {equalSign}
                {res}
                {
                    showAsComplement && <span style={{display: 'inline-flex'}} className="non-complement-result">
                    {equalSign}
                        <PositionalNumberComponent
                            input={result}
                            className={classes.operand}
                            additionalBases={tooltipBases}
                        />
                </span>
                }
            </div>
        </Root>
    );
};
