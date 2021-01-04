import React, { FC, useState } from 'react';
import { AssociatedBaseConversion, Conversion } from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { AssociatedBaseConverter } from '../associated-base-converter/associated-base-converter';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';
import { Section, ViewWrapper } from '@calc/common-ui';
import { AssociatedBaseConversionResult } from '../associated-base-conversion-result/associated-base-conversion-result';

export const AssociatedBaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConversion] = useState<Conversion>();

    const onChange = (newConversion?: Conversion) => {
        if (newConversion) {
            setConversion(newConversion);
        }
    };

    return (
        <ViewWrapper path='/tools/positional/associated-base-converter'
                     theoryPath='/theory/positional/associated-base-conversion'>
            <Section title={t('associatedBaseConverter.title')}>
                <AssociatedBaseConverter onConversionChange={onChange}/>
            </Section>
            {
                conversion &&
                <Section title={t('baseConverter.result')}>
                    <AssociatedBaseConversionResult conversion={conversion.stages[0] as AssociatedBaseConversion}/>
                </Section>
            }
            {
                conversion &&
                <Section title={t('associatedBaseConverter.mappings')}>
                    <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
                </Section>
            }
        </ViewWrapper>

    );
};
