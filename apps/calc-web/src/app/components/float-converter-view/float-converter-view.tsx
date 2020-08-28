import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FloatConverterComponent } from '../float-converter/float-converter-component';
import { Typography } from '@material-ui/core';


export const FloatConverterView: FC = () => {
    const {t} = useTranslation();

    return (
        <div>
            <Typography variant={'h3'}>
                {t('floatConverter.title')}
            </Typography>
            <FloatConverterComponent/>
        </div>
    );
};
