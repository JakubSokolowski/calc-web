import React, { FC } from 'react';
import { AdditionResult } from '@calc/calc-arithmetic';
import { OperandRow } from '../../operation-result/operand-row/operand-row';

interface P {
    result: AdditionResult;
}

export const AdditionResultComponent: FC<P> = ({ result }) => {
    const tooltipBase = 10;
    const additionSign = '+';

    return (
        <OperandRow
            operands={result.numberOperands}
            joinSymbol={additionSign}
            tooltipBase={tooltipBase}
            result={result.numberResult}
        />
    );
};
