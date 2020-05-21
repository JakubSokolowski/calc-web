import React, { FC, useState } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildConversionGrid, gridToAscii, OperationGrid } from '../../core/operation-grid';
import { BaseConverterComponent } from '../base-converter/base-converter-component';
import { ConversionDetails } from '../conversion-details/conversion-details';


export const BaseConverterView: FC = () => {
    const [grid, setGrid] = useState<OperationGrid>();
    const [conversion, setConv] = useState<Conversion>();

    const onChange = (conv) => {
        if (conv) {
            console.log('onChange');
            const newGrid = buildConversionGrid(conv);
            setGrid(newGrid);
            setConv(conv);
            console.log(gridToAscii(newGrid));
        }
    };
    return (
        <div>
            <BaseConverterComponent onConversionChange={onChange}/>
            {conversion && <ConversionDetails conversion={conversion}/>}
        </div>
    );
};
