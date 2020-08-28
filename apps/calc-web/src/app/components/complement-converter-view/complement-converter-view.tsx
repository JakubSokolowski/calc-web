import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

export const ComplementConverterView: FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Typography  variant={'h4'}>
                {t('complementConverter.title')}
            </Typography>
        </div>
    );
};
