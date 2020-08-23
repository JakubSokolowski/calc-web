import React, { FC, useState } from 'react';
import { AssociatedBaseConversion, Conversion } from '@calc/calc-arithmetic';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { AssociatedBaseConverter } from '../associated-base-converter/associated-base-converter';
import { AssociatedBaseConversionDetails } from '../associated-base-conversion-details/associated-base-conversion-details';
const { Title } = Typography;

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
            <Title level={2}>
                {t('associatedBaseConverter.title')}
            </Title>
            <AssociatedBaseConverter onConversionChange={onChange}/>
            {conversion &&
                <Title level={3} style={{paddingTop: '20px'}}>
                    {t('baseConverter.result')}
                </Title>
            }
            {conversion &&
                <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
            }
        </div>
    );
};
