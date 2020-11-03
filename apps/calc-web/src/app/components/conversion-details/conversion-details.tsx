import React, { FC } from 'react';
import { Conversion, ConversionToDecimal, ConversionType } from '@calc/calc-arithmetic';
import { buildFractionalConversionGrid, buildIntegralConversionGrid, HoverGrid } from '@calc/grid';
import { ResultEquation } from './result-equation/result-equation';
import { IntegralConversionRow } from './integral-conversion-row/integral-conversion-row';
import { ConversionToDecimalDetails } from '../conversion-to-decimal/conversion-to-decimal';
import { FractionalConversionRow } from './fractional-conversion-row/fractional-conversion-row';
import { InputWithCopy } from '@calc/ui';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useConverterStyles } from '../../core/styles/converter-styles';

interface P {
    conversion: Conversion;
    precision: number;
}

export const ConversionDetails: FC<P> = ({ conversion, precision }) => {
    const { t } = useTranslation();
    const classes = useConverterStyles();

    const fractionalHoverGrid = conversion.result.fractionalPart.length > 0
        ? buildFractionalConversionGrid(conversion, precision)
        : undefined;


    const integralHoverGrid = buildIntegralConversionGrid(conversion);

    const floatingHoverPopover = (hoverProps) => {
        return <FractionalConversionRow {...hoverProps}/>;
    };

    const integralHoverPopover = (hoverProps) => {
        return <IntegralConversionRow {...hoverProps}/>;
    };

    return (
        <div id="integral-conversion-details">
            <InputWithCopy
                readOnly
                className={classes.input}
                label={t('baseConverter.outputNumber')}
                value={conversion.result.toString(precision)}
            />
            {
                conversion.type === ConversionType.DIRECT ?
                    <div className={classes.equation}>
                        <Typography>{`I. ${t('baseConverter.conversionToBase', { base: conversion.result.base })}`}</Typography>
                        <ResultEquation conversion={conversion} firstStage={0} lastStage={0}/>
                    </div> :
                    <div>
                        <div className={classes.equation}>
                            <Typography>{`I. ${t('baseConverter.conversionToDecimal')}`}</Typography>
                            <ConversionToDecimalDetails
                                conversionStage={conversion.getFirstStage() as ConversionToDecimal}/>
                        </div>
                        <div className={classes.equation}>
                            <Typography>{`II. ${t('baseConverter.conversionToBase', { base: conversion.result.base })}`}</Typography>
                            <ResultEquation conversion={conversion} firstStage={1} lastStage={1}/>
                        </div>
                    </div>
            }
            <div className={classes.row}>
                {
                    integralHoverGrid &&
                    <HoverGrid
                        {...integralHoverGrid}
                        title={t('baseConverter.integralConversion')}
                        groupBuilder={integralHoverPopover}
                    />
                }
                <div className={classes.horizontalSpacer}/>
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
    );
};
