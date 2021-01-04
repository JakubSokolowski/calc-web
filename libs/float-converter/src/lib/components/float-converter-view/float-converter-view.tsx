import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FloatConverterComponent } from '../float-converter/float-converter-component';
import { Section, ViewWrapper } from '@calc/common-ui';

export const FloatConverterView: FC = () => {
    const { t } = useTranslation();

    return (
        <ViewWrapper path='/tools/floating/float-converter' theoryPath='/theory/floating'>
            <Section title={t('floatConverter.title')}>
                <FloatConverterComponent/>
            </Section>
        </ViewWrapper>
    );
};
