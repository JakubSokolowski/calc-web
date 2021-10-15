import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';

interface P {
    expected: string;
    actual: string;
}

export const SanityCheckFailed: FC<P> = ({expected, actual}) => {
    const {t} = useTranslation();

    return (
        <div data-test="sanity-check-failed">
            <div>
                {t('positionalCalculator.sanityCheck')}
            </div>
            <div>
                {t('positionalCalculator.expected', {expected})}
            </div>
            <div>
                {t('positionalCalculator.actual', {actual})}
            </div>
        </div>
    )
};
