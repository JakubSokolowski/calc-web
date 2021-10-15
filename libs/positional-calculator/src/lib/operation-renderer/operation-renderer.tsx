import { AlgorithmType, fromStringDirect, PositionalNumber } from '@calc/calc-arithmetic';
import React, { FC } from 'react';
import { calculate, OperationParams } from '../core/calculate';
import { PaddedGrid } from '@calc/grid';
import { getGroupBuilder } from '../core/operation-group-builer';
import { styled } from '@mui/material/styles';
import { OperationTemplate } from '../..';

const PREFIX = 'OperationRenderer';

const classes = {
    wrapper: `${PREFIX}-wrapper`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.wrapper}`]: {
        paddingBottom: theme.spacing(2),
    },
}));

export const OperationRenderer: FC<OperationTemplate<AlgorithmType>> = ({base, operands, operation, algorithm}) => {
    const nums: PositionalNumber[] = operands.map((op) => {
        return fromStringDirect(op, base).result;
    });

    const opParams: OperationParams = {
        algorithm,
        operation,
        operands: nums,
        base
    };

    const res = calculate(opParams);

    const groupBuilder = (positionResult: any) => {
        return getGroupBuilder(res.operationResult)({ positionResult });
    };

    return (
        <Root>
            <div className={classes.wrapper}>
                <PaddedGrid
                    id={`${Date.now()}`}
                    desiredWidth={19}
                    {...res.grid}
                    groupBuilder={groupBuilder}
                />
            </div>
        </Root>
    );
};
