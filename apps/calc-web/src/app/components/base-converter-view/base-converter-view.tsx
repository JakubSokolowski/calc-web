import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

export const BaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConv] = useState<Conversion>();
    const [precision, setPrecision] = useState(5);

    const onChange = (newConversion: Conversion, precision: number) => {
        if (newConversion) {
            setConv(newConversion);
            setPrecision(precision);
        }
    };

    return (
        <div>
            <Typography variant={'h4'} >
                {t('baseConverter.title')}
            </Typography>
            <BaseConverterComponent onConversionChange={onChange}/>
            {conversion && <ConversionDetails conversion={conversion} precision={precision}/>}
        </div>
    );
};
