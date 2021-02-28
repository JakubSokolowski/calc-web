import React, { FC } from 'react';
import { InlineMath } from '@calc/common-ui';
import { useTranslation } from 'react-i18next';


interface P {
    multiplierNegative: boolean;
}

export const WithoutExtensionU2Last: FC<P> = ({ multiplierNegative }) => {
    const { t } = useTranslation();

    if (multiplierNegative) {
        return (
            <div data-test='last-multiplier-without-extension-u2-negative'>
                <div>
                    {t('positionalCalculator.withoutExtensionU2lastOne')}
                </div>
                <div>
                    {t('positionalCalculator.add')}
                    <InlineMath math={'\\overline{M}'}/>
                    {t('positionalCalculator.withNegated')}
                    <InlineMath math={'MSP'}/>
                </div>
            </div>
        );
    }

    return (
        <div data-test='last-multiplier-without-extension-u2-positive'>
            <div>
                {t('positionalCalculator.withoutExtensionU2lastZero')}
            </div>
            <div>
                {t('positionalCalculator.add')}
                <InlineMath math={'0'}/>
                {t('positionalCalculator.withNegated')}
                <InlineMath math={'MSP'}/>
            </div>
        </div>
    );
};
