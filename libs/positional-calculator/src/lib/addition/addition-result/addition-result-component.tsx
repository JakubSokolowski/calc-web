import React, { FC } from 'react';
import { AdditionResult } from '@calc/calc-arithmetic';
import { ResultDetails } from '../../result-details/result-details';

interface P {
    result: AdditionResult;
}

export const AdditionResultComponent: FC<P> = ({ result }) => {
    return (
        <ResultDetails
            data-test="addition-result"
            data-result={`${result.numberResult.toString()}`}
            result={result}
        />
    );
};
