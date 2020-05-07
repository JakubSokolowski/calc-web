import React, { useMemo, useState } from 'react';

import './app.scss';

import { ReactComponent as Logo } from './logo.svg';
import 'antd/dist/antd.css';
import { BaseConverterComponent } from './components/base-converter/base-converter-component';
import { buildConversionGrid, gridToAscii, OperationGrid } from './core/operation-grid';
import { Conversion } from '@calc/calc-arithmetic';
import { ConversionDetails } from './components/conversion-details/conversion-details';

export const App = () => {
    /*
     * Replace the elements below with your own.
     *
     * Note: The corresponding styles are in the ./app.scss file.
     */
    const [grid, setGrid] = useState<OperationGrid>();
    const [conversion, setConv] = useState<Conversion>();
    const onChange = (conv) => {
        const newGrid = buildConversionGrid(conv);
        setGrid(newGrid);
        setConv(conv);

        console.log(gridToAscii(newGrid))
    };

    return (
        <div className="app">
            <header className="flex">
                <Logo width="75" height="75"/>
                <h1>Welcome to calc-web!</h1>
            </header>
            <main>
                <BaseConverterComponent onConversionChange={onChange}/>
                <ConversionDetails conversion={conversion}/>
            </main>
        </div>
    );
};

export default App;
