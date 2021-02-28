import { FC } from 'react'
import { MultiplicationRowResult } from '@calc/calc-arithmetic';
import React from 'react';
import { InlineMath } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';

interface P {
    result: MultiplicationRowResult;
}

export const WithoutExtensionU2MultiplicationRow: FC<P> = ({result}) => {
    const {t} = useTranslation();
    const multiplier = result.multiplier;

    if(multiplier.valueInDecimal === 0) {
        return (
            <div data-test="without-extension-u2-row-by-0">
                <div>
                    {t('positionalCalculator.withoutExtensionU2Zero')}
                </div>
                <div>
                    {t('positionalCalculator.add')}
                    <InlineMath math={'0'}/>
                    {t('positionalCalculator.withNegated')}
                    <InlineMath math={'MSP'}/>
                </div>
            </div>
        )
    } else {
        return (
            <div data-test="without-extension-u2-row-by-1">
                <div>
                    {t('positionalCalculator.withoutExtensionU2One')}
                </div>
                <div>
                    {t('positionalCalculator.add')}
                    <InlineMath math={'M'}/>
                    {t('positionalCalculator.withNegated')}
                    <InlineMath math={'MSP'}/>
                </div>
            </div>
        )
    }
};
