import React, { FC } from 'react';
import { Conversion } from '@calc/calc-arithmetic';
import { buildConversionGrid, RowConversionOperation } from '../../core/operation-grid';
import { NumberGrid } from '../number-grid/number-grid';
import { ResultEquation } from './result-equation/result-equation';
import { Typography } from 'antd';
import { RowHooverContent } from './row-hoover-content/row-hoover-content';

interface P {
    conversion: Conversion
}

export const ConversionDetails: FC<P> = ({ conversion }) => {
    const gridInfo = buildConversionGrid(conversion);

    const popoversContent = gridInfo.hooverContentProps.map((info: RowConversionOperation, index) => {
        return <RowHooverContent key={index} {...info}/>
    });

    return (
        <div style={{display: 'inline-block'}}>
            <Typography>II. Conversion to target base</Typography>
            {gridInfo && <NumberGrid hooverComponents={popoversContent} grid={gridInfo.grid}/>}
            <ResultEquation conversion={conversion}/>
        </div>
    );
};
