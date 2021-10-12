import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { OperationParams } from '../core/calculate';
import { AlgorithmType } from '@calc/calc-arithmetic';

interface P {
    params: OperationParams<AlgorithmType>;
}

export const OperationSuccess: FC<P> = ({ params }) => {
    const { t } = useTranslation();

    const operationStr = t(params.operation.tKey);
    const algorithmStr = t(params.algorithm.tKey);

    const messageStr = t(
        'positionalCalculator.operationSuccessful',
        { operation: operationStr, algorithm: algorithmStr }
    );

    return (
        <div data-test="operation-success">
            {messageStr}
        </div>
    );
};
