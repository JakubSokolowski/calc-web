import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { OperationParams } from '../core/calculate';
import { AlgorithmType } from '@calc/calc-arithmetic';
import { allOperations } from '../calculator-options/operations';
import { algorithmMap } from '../calculator-options/algorithms';

interface P {
    params: OperationParams;
}

export const OperationSuccess: FC<P> = ({ params }) => {
    const { t } = useTranslation();

    const operationTKey = allOperations.find((op) => op.type === params.operation)?.tKey;
    const algorithms =  algorithmMap[params.operation] || [];
    const algorithmKey = algorithms.find((alg) => alg.type === params.algorithm)?.tKey;
    const operationStr = t(operationTKey);
    const algorithmStr = t(algorithmKey);

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
