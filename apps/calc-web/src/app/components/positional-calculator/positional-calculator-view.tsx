import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { addPositionalNumbers, fromString, PositionResult } from '@calc/calc-arithmetic';
import { AddAtPositionHoverContent } from './add-at-position-hover-content';
import { buildAdditionGrid, HoverGrid } from '@calc/grid';
import { Typography } from '@material-ui/core';

export const PositionalCalculatorView: FC = () => {
    const { t } = useTranslation();

    const a = fromString('1234.123', 16, 16).result;
    const b = fromString('266756.323', 16, 16).result;
    const c = fromString('AAAAAA.BBBB', 16, 16).result;
    const d = fromString('CCCFFFFFFE', 16, 16).result;
    const res = addPositionalNumbers([a, b, c, d]);
    const grid = buildAdditionGrid(res);
    console.log(res);

    const groupBuilder = (positionResult: PositionResult) => {
        return (
            <AddAtPositionHoverContent positionResult={positionResult}/>
        );
    };

    return (
        <div>
           <Typography variant={'h3'}>
               {t('positionalCalculator.title')}
           </Typography>
            <HoverGrid {...grid} title={'Addition details'} groupBuilder={groupBuilder}/>
        </div>
    );
};
