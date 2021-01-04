import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { useTranslation } from 'react-i18next';
import { Section, ViewWrapper } from '@calc/common-ui';
import { ConversionResult } from '../conversion-result/conversion-result';
import { FloatingConversionDetails } from '../floating-conversion-details/floating-conversion-details';
import { IntegralConversionDetails } from '../integral-conversion-details/integral-conversion-details';


export const BaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConversion] = useState<Conversion>();
    const [precision, setPrecision] = useState(5);

    const onChange = (newConversion: Conversion, precision: number) => {
        if (newConversion) {
            setConversion(newConversion);
            setPrecision(precision);
        }
    };

    return (
        <ViewWrapper path='/tools/positional/base-converter' theoryPath='/theory/positional/base-conversion'>
            <Section title={t('baseConverter.title')}>
                <BaseConverterComponent onConversionChange={onChange}/>
            </Section>
            {conversion &&
            <Section title={t('baseConverter.result')}>
                <ConversionResult conversion={conversion}/>
            </Section>
            }
            {conversion &&
            <Section title={t('baseConverter.integralConversion')}>
                <IntegralConversionDetails conversion={conversion}/>
            </Section>
            }
            {conversion && conversion.result.fractionalPart.length > 0 &&
            <Section title={t('baseConverter.floatingConversion')}>
                <FloatingConversionDetails conversion={conversion} precision={precision}/>
            </Section>
            }
        </ViewWrapper>

    );
};
