import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildConversionGrid } from '../../core/operation-grid';
import { NumberGrid } from '../number-grid/number-grid';
import { ResultEquation } from './result-equation/result-equation';
import { Typography } from 'antd';

interface P {
    conversion: Conversion
}

export const ConversionDetails: FC<P> = ({ conversion }) => {
    const grid = buildConversionGrid(conversion);

    return (
        <div>
            <Typography>II. Conversion to target base</Typography>
            {grid && <NumberGrid  grid={grid}/>}
            <ResultEquation conversion={conversion}/>
        </div>
    );
};
