import React, { FC } from 'react';
import { InlineMath } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';


interface P {
    multiplierNegative: boolean;
}

export const WithExtensionCorrectionDetails: FC<P> = ({ multiplierNegative }) => {
    const { t } = useTranslation();

    if (multiplierNegative) {
        return (
            <div data-test='correction-with-extension-negative'>
                <div>
                    {t('positionalCalculator.extensionDigitNegative')}
                </div>
                <div>
                    {t('positionalCalculator.addMultiplicandComplement')} <InlineMath math={'\\overline{M}'}/>
                </div>
            </div>
        );
    }

    return (
        <div data-test='correction-with-extension-positive'>
            <div>
                {t('positionalCalculator.extensionDigitPositive')}
            </div>
            <div>
                {t('positionalCalculator.nothingToDo')}
            </div>
        </div>
    );
};
