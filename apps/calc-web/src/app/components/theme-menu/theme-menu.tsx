import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppTheme } from '@calc/ui';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { selectAppTheme, setTheme } from '@calc/core';

export const ThemeMenu: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(selectAppTheme);

    const toggleTheme = () => {
        const theme = currentTheme === AppTheme.Light ? AppTheme.Dark : AppTheme.Light;
        dispatch(setTheme(theme))
    };

    return (
        <Tooltip title={currentTheme === AppTheme.Light ? t('appBar.toggleDark') : t('appBar.toggleLight')}>
            <IconButton color="default" onClick={toggleTheme}>
                {currentTheme === AppTheme.Light ? <Brightness4Icon/> : <Brightness7Icon/>}
            </IconButton>
        </Tooltip>
    );
};
