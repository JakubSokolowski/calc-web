import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, Typography } from '@mui/material';
import { NavTile, NavTileProps } from '../nav-tile/nav-tile';
import { calculate, OperationParams } from '@calc/positional-calculator';
import {
    fromStringDetailed,
    fromStringDirect,
    MultiplicationType,
    OperationType
} from '@calc/calc-arithmetic';
import { buildIntegralConversionGrid, HoverOperationGrid } from '@calc/grid';

const PREFIX = 'MainTools';

const classes = {
    navTileWrapper: `${PREFIX}-navTileWrapper`
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.navTileWrapper}`]: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
}));

const getCalculatorGrid: () => HoverOperationGrid = () => {
    const params: OperationParams = {
        algorithm: MultiplicationType.WithExtension,
        operation: OperationType.Multiplication,
        operands: [fromStringDirect("FD", 16), fromStringDirect("-7", 16)],
        base: 16
    };
    const res = calculate(params);

    return res.grid;
};


const getBaseConverterGrid: () => HoverOperationGrid = () => {
    const conversion = fromStringDetailed('64', 10, 2);
    return buildIntegralConversionGrid(conversion);
};


export const MainTools: FC = () => {
    const { t } = useTranslation();

    const tiles: NavTileProps[] = [
        {
            route: '/tools/positional/positional-calculator',
            title: t('positionalCalculator.title'),
            subtitle: t('positionalCalculator.subtitle'),
            grid: getCalculatorGrid(),
            'data-test': 'positional-calculator-nav'
        },
        {
            route: '/tools/positional/base-converter',
            title: t('baseConverter.title'),
            subtitle: t('baseConverter.subtitle'),
            grid: getBaseConverterGrid(),
            'data-test': 'base-converter-nav'
        }
    ];

    return (
        <Root>
            <Typography variant={'h4'}>
                {t('routes.tools.title')}
            </Typography>
            <div className={classes.navTileWrapper}>
                {tiles.map((t) => <NavTile key={t.route} {...t}/>)}
            </div>
        </Root>
    );
};
