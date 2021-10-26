import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { styled, Typography } from '@mui/material';
import { MainTools } from '../main-tools/main-tools';

const PREFIX = "HomeView";

const classes = {
    root: `${PREFIX}-root`,
    navTileWrapper: `${PREFIX}-navTileWrapper`,
    spacer: `${PREFIX}-spacer`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        [theme.breakpoints.up('lg')]: {
            maxWidth: 900
        },
        margin: 'auto'
    },
    [`& .${classes.navTileWrapper}`]: {
        display: 'flex',
        flexDirection: 'row'
    },
    [`& .${classes.spacer}`]: {
        width: '100%',
        height: theme.spacing(4)
    },
}));

export const HomeView: FC = () => {
    const { t } = useTranslation();
    return (
        <Root>
            <div className={classes.root}>
                <Typography data-test='home-appname' variant={'h3'}>
                    {t('home.appName')}
                </Typography>
                <Typography data-test='home-caption' variant='caption'>
                    {t('home.appNameExpanded')}
                </Typography>
                <div className={classes.spacer}/>
                <MainTools/>
            </div>
        </Root>
    );
};
