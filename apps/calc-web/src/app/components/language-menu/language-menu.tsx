import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { availableThemes } from '../../../assets/i18n/i18n';
import { Badge, Button, Popover } from '@material-ui/core';

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
    };

    const options = availableThemes.map((language, index) => {
        const isChosenLanguage = language === i18n.language;
        return (
            <div key={index}>
                <Button
                    className="user-menu-button"
                    data-language={language}
                    onClick={(async () => {
                        await handleClick(language);
                    })}
                >
                    {language}
                </Button>
                {isChosenLanguage && <Badge/>}
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
                <div style={{ marginLeft: '-10px' }}>
                    {options}
                </div>
            </Popover>
            <Button aria-describedby={id} variant="contained" color="default" onClick={handlePopoverClick}>
                {i18n.language}
            </Button>
        </div>
    );
};
