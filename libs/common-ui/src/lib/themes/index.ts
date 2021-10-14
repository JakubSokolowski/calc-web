import { createTheme, Theme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#333',
        }
    }
});


export const lightTheme = createTheme({
    palette: {
        mode: 'light'
    },
});



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
