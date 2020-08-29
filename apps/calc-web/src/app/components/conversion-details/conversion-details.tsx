import React, { FC } from 'react';
import { Conversion, ConversionToDecimal, ConversionType } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, buildIntegralConversionGrid, HoverGrid } from '@calc/grid';
import { ResultEquation } from './result-equation/result-equation';
import { IntegralConversionRow } from './integral-conversion-row/integral-conversion-row';
import { ConversionToDecimalDetails } from '../conversion-to-decimal/conversion-to-decimal';
import { FractionalConversionRow } from './fractional-conversion-row/fractional-conversion-row';
import { InputWithCopy } from '@calc/ui';
import { Card, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface P {
    conversion: Conversion;
    precision: number;
}

export const ConversionDetails: FC<P> = ({ conversion, precision }) => {
    const { t } = useTranslation();
    const fractionalHoverGrid = conversion.result.fractionalPart.length > 0
        ? buildFractionalConversionGrid(conversion, precision) : undefined;

    const integralHoverGrid = buildIntegralConversionGrid(conversion);

    const floatingHoverPopover = (hoverProps) => {
        return <FractionalConversionRow {...hoverProps}/>;
    };

    const integralHoverPopover = (hoverProps) => {
        return <IntegralConversionRow {...hoverProps}/>;
    };

    return (
        <div style={{paddingTop: '20px'}}>
            <Typography variant={'h4'} >
                {t('baseConverter.result')}
            </Typography>
            <Card style={{ 'padding': '20px' }}>
                <div id="integral-conversion-details">
                    <div style={{ marginBottom: '20px' }}>
                        <InputWithCopy
                            readOnly
                            label={t('baseConverter.outputNumber')}
                            value={conversion.result.toString(precision)}
                        />
                    </div>
                    {
                        conversion.type === ConversionType.DIRECT ?
                            <div>
                                <Typography>{`I. ${t('baseConverter.conversionToBase', {base: conversion.result.base})}`}</Typography>
                                <ResultEquation conversion={conversion} firstStage={0} lastStage={0}/>
                            </div> :
                            <div>
                                <div>
                                    <Typography>{`I. ${t('baseConverter.conversionToDecimal')}`}</Typography>
                                    <ConversionToDecimalDetails
                                        conversionStage={conversion.getFirstStage() as ConversionToDecimal}/>
                                </div>
                                <div style={{ paddingTop: '12px' }}>
                                    <Typography>{`II. ${t('baseConverter.conversionToBase', {base: conversion.result.base})}`}</Typography>
                                    <ResultEquation conversion={conversion} firstStage={1} lastStage={1}/>
                                </div>
                            </div>
                    }
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {
                            integralHoverGrid &&
                            <HoverGrid
                                {...integralHoverGrid}
                                title={t('baseConverter.integralConversion')}
                                groupBuilder={integralHoverPopover}
                            />
                        }
                        <div style={{ width: '20px' }}/>
                        {
                            fractionalHoverGrid &&
                            <HoverGrid
                                {...fractionalHoverGrid}
                                title={t('baseConverter.floatingConversion')}
                                groupBuilder={floatingHoverPopover}
                            />
                        }
                    </div>
                </div>
            </Card>
        </div>
    );
};
