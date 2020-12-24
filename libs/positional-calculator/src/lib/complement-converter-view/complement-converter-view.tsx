import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Section } from '@calc/common-ui';
import { addPositionalNumbers, fromNumber, fromStringDirect, subtractPositionalNumbers } from '@calc/calc-arithmetic';
import { buildAdditionGrid, buildSubtractionGrid, PaddedGrid } from '@calc/grid';
import { SubtractAtPositionResult } from '../subtraction/subtraction-position-result/subtraction-position-result';
import { AddAtPositionHoverContent } from '../addition/addition-position-result/add-at-position-hover-content';

export const useStyles = makeStyles((theme: Theme) => {
    return createStyles(
        {
            root: {
                [theme.breakpoints.up('lg')]: {
                    maxWidth: 900,
                },
                margin: 'auto'
            }
        }
    )
});

export const ComplementConverterView: FC = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const b = fromStringDirect('9999999', 10).result;
    const a = fromStringDirect('2123123', 10).result;
    const subResult = subtractPositionalNumbers([b, a]);
    const subGrid = buildSubtractionGrid(subResult);
    const builder = (result) => <SubtractAtPositionResult positionResult={result}/>;

    const one = fromStringDirect('1', 10).result;

    const addRes = addPositionalNumbers([subResult.numberResult, one]);
    const addGrid = buildAdditionGrid(addRes);
    const additionBuilder = (result) => <AddAtPositionHoverContent positionResult={result}/>;

    return (
        <div className={classes.root}>
            <Section title={t('complementConverter.title')}/>
            <PaddedGrid desiredWidth={25} values={subGrid.values} groups={subGrid.groups} lines={subGrid.lines} groupBuilder={builder}/>
            <div style={{ height: '36px' }}/>
            <PaddedGrid desiredWidth={25} values={addGrid.values} groups={addGrid.groups} lines={addGrid.lines} groupBuilder={additionBuilder}/>
        </div>
    );
};
