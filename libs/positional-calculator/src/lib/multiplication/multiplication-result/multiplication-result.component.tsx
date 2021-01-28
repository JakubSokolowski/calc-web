import React, { FC } from 'react';
import { MultiplicationResult } from '@calc/calc-arithmetic';
import { OperandRow } from '../../operation-result/operand-row/operand-row';

interface P {
    result: MultiplicationResult;
}

export const MultiplicationResultComponent: FC<P> = ({ result }) => {
    const additionSign = '*';

    return (
        <OperandRow
            operands={result.numberOperands}
            joinSymbol={additionSign}
            result={result.numberResult}
        />
    );
};
