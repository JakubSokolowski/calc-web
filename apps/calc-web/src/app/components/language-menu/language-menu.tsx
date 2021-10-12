import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Popover } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { useDispatch, useSelector } from 'react-redux';
import { availableLanguages, getNativeName, Language } from '@calc/i18n';
import { selectAppLanguage, setLanguage } from '@calc/core';

export const LanguageMenu: FC = () => {
    const { i18n, t } = useTranslation();
    const selectedLanguage = useSelector(selectAppLanguage);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'simple-popover' : undefined;

    const handleClick = async (language: Language) => {
        if (language && i18n.language !== language) {
            await i18n.changeLanguage(language);
            dispatch(setLanguage(language));
        }
        handleClose();
    };

    const options = availableLanguages.map((languageKey, index) => {
        return (
            <div key={index}>
                <Button
                    data-test={`language-${languageKey}`}
                    data-language={languageKey}
                    color={'inherit'}
                    onClick={(async () => {
                        await handleClick(languageKey);
                    })}
                >
                    {getNativeName(languageKey)}
                </Button>
            </div>
        );
    });

    return (
        <div>
            <Popover
                style={{ padding: '0px' }}
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                title={t('languageMenu.choose')}>
                <div>
                    {options}
                </div>
            </Popover>
            <Button
                data-test="change-language"
                startIcon={<TranslateIcon/>}
                aria-describedby={popoverId}
                variant="text"
                color={'inherit'}
                onClick={handlePopoverClick}>
                {getNativeName(selectedLanguage)}
            </Button>
        </div>
    );
};
