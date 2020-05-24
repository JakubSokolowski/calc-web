import React, { FC } from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

export const ComplementConverterView: FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Title>
                {t('complementConverter.title')}
            </Title>
        </div>
    );
};
