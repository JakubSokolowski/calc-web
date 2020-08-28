import React, { FC, useState } from 'react';
import { AssociatedBaseConversion, Conversion } from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';
import { AssociatedBaseConverter } from '../associated-base-converter/associated-base-converter';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';
import { Typography } from '@material-ui/core';

export const AssociatedBaseConverterView: FC = () => {
    const { t } = useTranslation();
    const [conversion, setConv] = useState<Conversion>();

    const onChange = (newConversion: Conversion) => {
        if (newConversion) {
            setConv(newConversion);
        }
    };

    return (
        <div>
            <Typography variant={'h3'}>
                {t('associatedBaseConverter.title')}
            </Typography>
            <AssociatedBaseConverter onConversionChange={onChange}/>
            {conversion &&
                <Typography variant={'h3'} style={{paddingTop: '20px'}}>
                    {t('baseConverter.result')}
                </Typography>
            }
            {conversion &&
                <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
            }
        </div>
    );
};
