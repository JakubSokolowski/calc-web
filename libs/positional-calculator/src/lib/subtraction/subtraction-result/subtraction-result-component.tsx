import React, { FC } from 'react';
import { SubtractionResult } from '@calc/calc-arithmetic';
import { OperandRow } from '../../operation-result/operand-row/operand-row';

interface P {
    result: SubtractionResult;
}

export const SubtractionResultComponent: FC<P> = ({ result }) => {
    const tooltipBase = 10;
    const subtractionSign = '-';

    return (
        <OperandRow
            operands={result.numberOperands}
            joinSymbol={subtractionSign}
            tooltipBase={tooltipBase}
            result={result.numberResult}
        />
    );
};
