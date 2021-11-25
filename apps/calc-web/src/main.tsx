import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from '@calc/core';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { AppWithTheme } from './app/app-with-theme';
import { environment } from '@calc/env';

Sentry.init({
    dsn: environment.sentryDsn,
    environment: environment.sentryEnvironment,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
});

ReactDOM.render(
    <Provider store={store}>
        <AppWithTheme>
            <App />
        </AppWithTheme>
    </Provider>,
    document.getElementById('root')
);
