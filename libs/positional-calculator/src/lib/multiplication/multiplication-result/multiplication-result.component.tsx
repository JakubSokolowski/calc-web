import React, { FC } from 'react';
import { MultiplicationResult } from '@calc/calc-arithmetic';
import { OperandRow } from '../../operation-result/operand-row/operand-row';
import { ResultDetails } from '../../result-details/result-details';

interface P {
    result: MultiplicationResult;
}

export const MultiplicationResultComponent: FC<P> = ({ result }) => {
    const multiplicationSign = '*';

    return (
        <div data-test="multiplication-result" data-result={result.numberResult.toString()}>
            <OperandRow
                operands={result.numberOperands}
                joinSymbol={multiplicationSign}
                result={result.numberResult}
            />
        </div>
    );
};
