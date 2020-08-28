import { Theme } from '@material-ui/core';
import { darkTheme } from './dark';
import { lightTheme } from './light';

export enum AppTheme {
    Light = 'light',
    Dark = 'dark'
}

export const availableThemes = {
    [AppTheme.Dark]: darkTheme,
    [AppTheme.Light]: lightTheme
};

export function getTheme(theme: AppTheme): Theme {
    return availableThemes[theme]
}
