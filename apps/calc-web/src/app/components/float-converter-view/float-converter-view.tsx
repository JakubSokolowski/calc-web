import React, { FC } from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { FloatConverterComponent } from '../float-converter/float-converter-component';

const { Title} = Typography;

export const FloatConverterView: FC = () => {
    const {t} = useTranslation();

    return (
        <div>
            <Title>
                {t("floatConverter.title")}
            </Title>
            <FloatConverterComponent/>
        </div>
    );
};
