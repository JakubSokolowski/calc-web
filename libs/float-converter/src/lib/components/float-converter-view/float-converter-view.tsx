import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FloatConverterComponent } from '../float-converter/float-converter-component';
import { Section, ViewWrapper } from '@calc/common-ui';
import Alert from '@mui/material/Alert';

export const FloatConverterView: FC = () => {
    const { t } = useTranslation();

    return (
        <ViewWrapper path='/tools/floating/float-converter' theoryPath='/theory/floating'>
            <Alert severity="warning">{t("common.toolNotFinished")}</Alert>
            <Section title={t('floatConverter.title')}>
                <FloatConverterComponent/>
            </Section>
        </ViewWrapper>
    );
};
