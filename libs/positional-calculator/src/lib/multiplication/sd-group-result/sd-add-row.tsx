import { FC } from 'react';
import { TranslationWithLatex } from '@calc/common-ui';
import React from 'react';

interface P {
    digitValue: number;
}

export const SdAddRow: FC<P> = ({digitValue}) => {
    const getTranslationValues = () => {
        switch (digitValue) {
            case 0:
                return {sd: 'SD', value: '0', valueToAdd: '0'};
            case 1:
                return {sd: 'SD', value: '1', valueToAdd: 'M'};
            case -1:
                return {sd: 'SD', value: '-1', valueToAdd: '\\overline{M}'};
        }
    };

    return (
        <div data-test={`sd-by-${digitValue}-details`}>
            <TranslationWithLatex
                tKey={'positionalCalculator.sdAddRow'}
                values={getTranslationValues()}
            />
        </div>
    )
}
