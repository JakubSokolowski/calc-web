import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { availableThemes, getNativeName } from '../../../assets/i18n/i18n';
import { Button, Popover } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
export const LanguageMenu: FC = () => {
    const { i18n, t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = async (language) => {
        if (language && i18n.language !== language) {
            await i18n.changeLanguage(language);
        }
        handleClose();
    };

    const options = availableThemes.map((languageKey, index) => {
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
                {getNativeName(i18n.language)}
            </Button>
        </div>
    );
};
