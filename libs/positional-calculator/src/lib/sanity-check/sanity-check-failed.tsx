import { Alert } from '@calc/common-ui';
import React, {FC} from 'react';
import { useTranslation } from 'react-i18next';

interface P {
    expected: string;
    actual: string;
    onClose: () => void;
}

export const SanityCheckFailed: FC<P> = ({expected, actual, onClose}) => {
    const {t} = useTranslation();

    return (
        <Alert onClose={onClose} severity="error">
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
        </Alert>
    )
};
