import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppTheme } from '@calc/common-ui';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { selectAppTheme, setTheme } from '@calc/core';

export const ThemeMenu: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(selectAppTheme);
    const buttonId = currentTheme === AppTheme.Light
        ? 'toggle-dark-theme'
        : 'toggle-light-theme';

    const toggleTheme = () => {
        const theme = currentTheme === AppTheme.Light ? AppTheme.Dark : AppTheme.Light;
        dispatch(setTheme(theme))
    };

    return (
        <Tooltip title={currentTheme === AppTheme.Light ? t('appBar.toggleDark') : t('appBar.toggleLight')}>
            <IconButton color="default" onClick={toggleTheme} id={buttonId} size="large">
                {
                    currentTheme === AppTheme.Light
                    ? <Brightness4Icon/>
                    : <Brightness7Icon/>
                }
            </IconButton>
        </Tooltip>
    );
};
