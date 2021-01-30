import React, { FC } from 'react';
import { SubtractionResult } from '@calc/calc-arithmetic';
import { ResultDetails } from '../../result-details/result-details';

interface P {
    result: SubtractionResult;
}

export const SubtractionResultComponent: FC<P> = ({ result }) => {
    return (
        <ResultDetails
            data-result={result.numberResult.toString()}
            data-test="subtraction-result"
            result={result}
        />
    );
};
