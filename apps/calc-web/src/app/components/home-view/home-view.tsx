import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const HomeView: FC = () => {
    const { t } = useTranslation();
    return (
        <div>
            {t('home.header')}
        </div>
    );
};
