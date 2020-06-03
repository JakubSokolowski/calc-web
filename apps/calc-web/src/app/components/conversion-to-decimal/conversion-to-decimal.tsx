import React, { FC } from 'react';
import { ConversionToDecimal } from '@calc/calc-arithmetic';
import { PositionalNumberText } from '../positional-number/positional-number-text';

interface P {
    conversionStage: ConversionToDecimal
}

export const ConversionToDecimalDetails: FC<P> = ({ conversionStage }) => {
    const [inputStr, inputBase] = conversionStage.input;

    const integerParts = conversionStage.result.integerPart.digits.map((digit, index, arr) => {
        return (
            <span key={index}>
                {digit}*
                {inputBase}
                <sup>{arr.length - index - 1}</sup>
                {' + '}
            </span>
        )
    });

    const fractionalParts = conversionStage.result.fractionalPart.digits.map((digit, index, arr) => {
        return (
            <span key={index}>
                {digit}*
                {inputBase}
                <sup>{- 1 * (index + 1)}</sup>
                {index !== arr.length -1 && ' + '}
            </span>
        )
    });

    return (
        <div>
            <div id="decimal-conversion-details" style={{ display: 'inline-block' }}>
                <PositionalNumberText value={inputStr} base={inputBase}/>
                &nbsp;=&nbsp;
                {integerParts} {fractionalParts}
                &nbsp;=&nbsp;
                <PositionalNumberText value={conversionStage.result.valueInBase} base={conversionStage.result.base}/>
            </div>
        </div>
    );
};
