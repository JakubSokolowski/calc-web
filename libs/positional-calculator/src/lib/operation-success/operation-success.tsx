import { Alert } from '@calc/common-ui';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { OperationParams } from '../core/calculate';
import { AlgorithmType } from '@calc/calc-arithmetic';

interface P {
    params: OperationParams<AlgorithmType>;
    onClose: () => void;
}

export const OperationSuccess: FC<P> = ({ params, onClose }) => {
    const { t } = useTranslation();

    const operationStr = t(params.operation.tKey);
    const algorithmStr = t(params.algorithm.tKey);

    const messageStr = t(
        'positionalCalculator.operationSuccessful',
        { operation: operationStr, algorithm: algorithmStr }
    );

    return (
        <Alert onClose={onClose} severity="success">
            <div data-test="operation-success">
                {messageStr}
            </div>
        </Alert>
    );
};
