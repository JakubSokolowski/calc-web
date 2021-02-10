import { FC } from 'react';
import React from 'react';
import { InlineMath } from '@calc/common-ui';
import { MultiplicationOperand } from '@calc/calc-arithmetic';
import { useTranslation } from 'react-i18next';


interface P {
    multiplierNegative: boolean;
    lastMultiplierDigit?: MultiplicationOperand;
}

export const WithoutExtensionCorrectionDetails: FC<P> = ({multiplierNegative, lastMultiplierDigit}) => {
    const {t} = useTranslation();

    if(multiplierNegative) {
        const {base, valueInDecimal} = lastMultiplierDigit;
        const value = -(lastMultiplierDigit.base - lastMultiplierDigit.valueInDecimal);
        const absValue = Math.abs(value);
        const correctionStr = `${absValue}\\overline{M}`;
        const valueConversionStr = `-(${base} - ${valueInDecimal})=${value}, ${value}M=${correctionStr}`;

        return (
            <div data-test="correction-without-extension-negative">
                <div>
                    {t('positionalCalculator.lastDigitPositive', {value: lastMultiplierDigit.valueInDecimal})}
                    &nbsp;
                    <InlineMath math={correctionStr}/>
                </div>
                <div>
                    <InlineMath math={valueConversionStr}/>
                </div>
            </div>
        )
    }

    return (
        <div data-test="correction-without-extension-positive">
            <div>
                {t('positionalCalculator.lastDigitPositive', {value: lastMultiplierDigit.valueInDecimal})}
                &nbsp;
                <InlineMath math={`${lastMultiplierDigit.valueInDecimal}M`}/>
            </div>

        </div>
    )
};
