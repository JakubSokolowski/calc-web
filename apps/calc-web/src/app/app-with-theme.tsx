import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '@calc/core';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { getTheme } from '@calc/common-ui';


export const AppWithTheme: FC = ({ children }) => {
    const theme = useSelector(selectAppTheme);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
