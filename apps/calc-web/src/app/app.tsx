import React from 'react';

import './app.scss';

import { ReactComponent as Logo } from './logo.svg';
import 'antd/dist/antd.css';
import { BaseConverterComponent } from './components/base-converter/base-converter-component';

export const App = () => {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./app.scss file.
     */
    return (
        <div className="app">
            <header className="flex">
                <Logo width="75" height="75" />
                <h1>Welcome to calc-web!</h1>
            </header>
            <main>
                <BaseConverterComponent />
            </main>
        </div>
    );
};

export default App;
