import React, { FC } from 'react';
import { Conversion, ConversionToDecimal, ConversionType } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, buildIntegralConversionGrid, HoverGrid } from '@calc/ui';
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
    const fractionalHooverGrid = conversion.result.fractionalPart.length > 0
        ? buildFractionalConversionGrid(conversion, precision): undefined;

    const integralHooverGrid = buildIntegralConversionGrid(conversion);

    const floatingHooverPopover = (hooverProps) => {
        return <FractionalConversionRow {...hooverProps}/>
    };

    const integralHooverPopover = (hooverProps) => {
        return <IntegralConversionRow {...hooverProps}/>
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
                                <ConversionToDecimalDetails
                                    conversionStage={conversion.getFirstStage() as ConversionToDecimal}/>
                            </div>
                            <div style={{ paddingTop: '12px' }}>
                                <Typography>{`II. Conversion to base ${conversion.result.base}`}</Typography>
                                <ResultEquation conversion={conversion} firstStage={1} lastStage={1}/>
                            </div>
                        </div>
                }
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {
                        integralHooverGrid &&
                        <HoverGrid
                            {...integralHooverGrid}
                            title={'Integral part conversion:'}
                            groupBuilder={integralHooverPopover}
                        />
                    }
                    <div style={{ width: '20px', flexGrow: 1 }}/>
                    {
                        fractionalHooverGrid &&
                        <HoverGrid
                            {...fractionalHooverGrid}
                            title={'Floating part conversion:'}
                            groupBuilder={floatingHooverPopover}
                        />
                    }
                </div>
            </div>


        </div>
    );
};
