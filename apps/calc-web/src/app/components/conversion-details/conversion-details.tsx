import React, { FC } from 'react';
import { Conversion, ConversionToDecimal, ConversionType } from '@calc/calc-arithmetic';
import {
    buildFloatingPartConversionGrid,
    buildIntegralPartConversionGrid, FloatingPartConversionInfo,
    RowConversionOperation
} from '../../core/operation-grid';
import { NumberGrid } from '../number-grid/number-grid';
import { ResultEquation } from './result-equation/result-equation';
import { Typography } from 'antd';
import { IntegralConversionRow } from './integral-conversion-row/integral-conversion-row';
import { ConversionToDecimalDetails } from '../conversion-to-decimal/conversion-to-decimal';
import { FractionalConversionRow } from './fractional-conversion-row/fractional-conversion-row';

interface P {
    conversion: Conversion;
    precision: number;
}

export const ConversionDetails: FC<P> = ({ conversion, precision }) => {
    const gridInfo = buildIntegralPartConversionGrid(conversion);

    const floatingGrid = conversion.result.fractionalPart.length > 0 ?
        buildFloatingPartConversionGrid(conversion, precision)
    : undefined;

    const integralPopoverContent = (_, hooverProps: RowConversionOperation) => {
        return <IntegralConversionRow {...hooverProps}/>;
    };

    const floatingPopoverContent = (_, hooverProps: FloatingPartConversionInfo) => {
        return <FractionalConversionRow {...hooverProps}/>
    };

    return (
        <div>
            <div id="integral-conversion-details" style={{ display: 'inline-block' }}>
                {
                    conversion.type === ConversionType.DIRECT ?
                        <div>
                            <Typography>{`I. Conversion to base ${conversion.result.base}`}</Typography>
                            <ResultEquation conversion={conversion} firstStage={0} lastStage={0}/>
                        </div> :
                        <div>
                            <div>
                                <Typography>I. Conversion to decimal</Typography>
                                <ConversionToDecimalDetails conversionStage={conversion.getFirstStage() as ConversionToDecimal}/>
                            </div>
                            <div style={{paddingTop: '12px'}}>
                                <Typography>{`II. Conversion to base ${conversion.result.base}`}</Typography>
                                <ResultEquation conversion={conversion} firstStage={1} lastStage={1}/>
                            </div>
                        </div>
                }
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {gridInfo && <NumberGrid title={'Integral part conversion:'} rowHooverBuilder={integralPopoverContent} grid={gridInfo}/>}
                    <div style={{width: '20px'}}/>
                    {floatingGrid && <NumberGrid title={'Floating part conversion:'} rowHooverBuilder={floatingPopoverContent} grid={floatingGrid}/>}
                </div>
            </div>
        </div>
    );
};
