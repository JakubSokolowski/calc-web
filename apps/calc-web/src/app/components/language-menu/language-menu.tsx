import React, { FC } from 'react';
import { Badge, Button, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from '../../../assets/i18n/i18n';

export const LanguageMenu: FC = () => {
    const { i18n, t } = useTranslation();

    const handleClick = async (language) => {
        if (language && i18n.language !== language) {
            await i18n.changeLanguage(language);
        }
    };

    const options = availableLanguages.map((language, index) => {
        const isChosenLanguage = language === i18n.language;
        return (
            <div key={index}>
                <Button
                    type="link"
                    className="user-menu-button"
                    data-language={language}
                    onClick={(async () => {
                        await handleClick(language);
                    })}
                >
                    {language}
                </Button>
                {isChosenLanguage && <Badge dot/>}
            </div>
        );
    });

    return (
        <Popover
            style={{padding: '0px'}}
            trigger="click"
            placement="bottomRight"
            content={
                <div style={{marginLeft: '-10px'}} >
                    {options}
                </div>
            }
            title={t('languageMenu.choose')}>
            <Button shape={'circle'} >
                {i18n.language}
            </Button>
        </Popover>
    );
};
