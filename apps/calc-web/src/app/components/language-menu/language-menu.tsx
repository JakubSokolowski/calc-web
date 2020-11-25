import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Popover } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLanguage } from '../../store/selectors/options.selectors';
import { setLanguage } from '../../store/actions/options.actions';
import { availableLanguages, getNativeName, Language } from '@calc/i18n';

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
    const id = open ? 'simple-popover' : undefined;

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
                    data-language={languageKey}
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
                id={id}
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
            <Button startIcon={<TranslateIcon/>} aria-describedby={id} variant="text" color="default" onClick={handlePopoverClick}>
                {getNativeName(selectedLanguage)}
            </Button>
        </div>
    );
};
