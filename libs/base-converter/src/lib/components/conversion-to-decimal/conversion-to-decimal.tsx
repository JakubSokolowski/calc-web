import React, { FC } from 'react';
import { ConversionToDecimal } from '@calc/calc-arithmetic';
import { NumberSubscript } from '@calc/ui';

interface P {
    conversionStage: ConversionToDecimal;
}

export const ConversionToDecimalDetails: FC<P> = ({ conversionStage }) => {
    const [inputStr, inputBase] = conversionStage.input;

    const digits = conversionStage.inputDigitList.map((digit, index, arr) => {
        return (
            <span key={index}>
                {digit.representationInBase}*
                {digit.base}
                <sup>{digit.position}</sup>
                {index !== arr.length -1 && ' + '}
            </span>
        )
    });

    return (
        <div>
            <div id="decimal-conversion-details" style={{ display: 'inline-block' }}>
                <NumberSubscript value={inputStr} subscript={inputBase}/>
                &nbsp;=&nbsp;
                {digits}
                &nbsp;=&nbsp;
                <NumberSubscript value={conversionStage.result.valueInBase} subscript={conversionStage.result.base}/>
            </div>
        </div>
    );
};
