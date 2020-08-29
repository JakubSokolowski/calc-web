import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme } from '../../store/selectors/options.selectors';
import { AppTheme } from '@calc/ui';
import { setTheme } from '../../store/actions/options.actions';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

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
