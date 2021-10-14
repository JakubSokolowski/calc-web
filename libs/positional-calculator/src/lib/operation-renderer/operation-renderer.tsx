import { AlgorithmType, fromStringDirect, PositionalNumber } from '@calc/calc-arithmetic';
import React, { FC } from 'react';
import { calculate, OperationParams } from '../core/calculate';
import { PaddedGrid } from '@calc/grid';
import { getGroupBuilder } from '../core/operation-group-builer';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { OperationTemplate } from '../..';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        wrapper: {
            paddingBottom: theme.spacing(2),
        }
    });
});


export const OperationRenderer: FC<OperationTemplate<AlgorithmType>> = ({base, operands, operation, algorithm}) => {
    const classes = useStyles();

    const nums: PositionalNumber[] = operands.map((op) => {
        return fromStringDirect(op, base).result;
    });

    const opParams: OperationParams<AlgorithmType> = {
        algorithm: {
            type: algorithm,
            tKey: ''
        },
        operation: {
            type: operation,
            minOperands: 0,
            maxOperands: 10,
            tKey: ''
        },
        operands: nums,
        base
    };

    const res = calculate(opParams);

    const groupBuilder = (positionResult: any) => {
        return getGroupBuilder(res.operationResult)({ positionResult });
    };

    return (
        <div className={classes.wrapper}>
            <PaddedGrid
                id={`${Date.now()}`}
                desiredWidth={19}
                {...res.grid}
                groupBuilder={groupBuilder}
            />
        </div>
    );
};
