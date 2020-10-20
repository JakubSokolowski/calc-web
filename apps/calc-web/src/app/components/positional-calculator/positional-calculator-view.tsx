import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addPositionalNumbers, fromStringDirect, PositionResult } from '@calc/calc-arithmetic';
import { AddAtPositionHoverContent } from './add-at-position-hover-content';
import { buildAdditionGrid, HoverGrid, HoverOperationGrid } from '@calc/grid';
import { createStyles, Theme, Typography } from '@material-ui/core';
import { CalculatorOptions } from './calculator-options/calculator-options';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatedOperand } from './operand-list/operand-list';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        options: {
            paddingTop: theme.spacing(2)
        },
        result: {
            maxWidth: 600
        }
    })
);


export const PositionalCalculatorView: FC = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [grid, setGrid] = useState<HoverOperationGrid | undefined>();

    const onSubmit = (base: number, representations: ValidatedOperand[]) => {
        console.log(representations);
        const nums = representations.map((num) =>  fromStringDirect(num.representation, base).result);
        const res = addPositionalNumbers(nums);
        const grid = buildAdditionGrid(res);
        setGrid(grid);
    };

    const groupBuilder = (positionResult: PositionResult) => {
        return (
            <AddAtPositionHoverContent positionResult={positionResult}/>
        );
    };

    return (
        <div>
           <Typography variant={'h5'}>
               {t('positionalCalculator.title')}
           </Typography>
            <div className={classes.options}>
                <CalculatorOptions onSubmit={onSubmit}/>
            </div>
            {
                grid &&
                <div className={classes.result}>
                    <HoverGrid {...grid} title={'Addition details'} groupBuilder={groupBuilder}/>
                </div>
            }
        </div>
    );
};
