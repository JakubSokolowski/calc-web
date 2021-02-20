import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from '@calc/core';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
    dsn: 'https://70bd26cd51234ad587dd3b9b2864f8a0@o528188.ingest.sentry.io/5645379',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
