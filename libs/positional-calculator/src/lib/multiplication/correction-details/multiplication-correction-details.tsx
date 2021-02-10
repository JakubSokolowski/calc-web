import React, { FC } from 'react';
import { MultiplicationOperand, MultiplicationType } from '@calc/calc-arithmetic';
import { WithExtensionCorrectionDetails } from './with-extension-correction-details';
import { WithoutExtensionCorrectionDetails } from './without-extension-correction-details';


interface P {
    multiplierNegative: boolean;
    multiplicationType: MultiplicationType;
    lastMultiplierDigit: MultiplicationOperand;
}

export const MultiplicationCorrectionDetails: FC<P> = ({multiplierNegative, multiplicationType, lastMultiplierDigit}) => {

    if(multiplicationType === MultiplicationType.WithExtension) {
        return (
            <WithExtensionCorrectionDetails multiplierNegative={multiplierNegative}/>
        )
    }

    if(multiplicationType === MultiplicationType.WithoutExtension) {
        return (
            <WithoutExtensionCorrectionDetails
                multiplierNegative={multiplierNegative}
                lastMultiplierDigit={lastMultiplierDigit}
            />
        )
    }

    return null;
};
