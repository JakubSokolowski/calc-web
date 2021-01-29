import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

export const HomeView: FC = () => {
    const { t } = useTranslation();
    return (
        <div style={{margin: 'auto'}}>
            <Typography data-test='home-appname' variant={'h3'}>
                {t('home.appName')}
            </Typography>
            <Typography data-test='home-caption' variant='caption'>
                {t('home.appNameExpanded')}
            </Typography>
        </div>
    );
};
