import React from 'react'
import { useTranslation } from 'react-i18next';
import { InlineMath } from '@calc/common-ui';


export const Correction = () => {
    const {t} = useTranslation();

    return (
        <div data-test="without-extension-u2-correction">
            {t('positionalCalculator.correction')}
            <InlineMath math={'1'}/>
            {t('positionalCalculator.withNegated')}
            <InlineMath math={'MSP'}/>
        </div>
    )
};
