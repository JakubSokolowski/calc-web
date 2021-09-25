import React, { FC } from 'react';
import { DivisionResult } from '@calc/calc-arithmetic';
import { OperandRow } from '../../operation-result/operand-row/operand-row';

interface P {
    result: DivisionResult;
}

export const DivisionResultComponent: FC<P> = ({ result }) => {
    const divisionSign = '/';

    return (
        <div data-test="division-result" data-result={result.numberResult.toString()}>
            <OperandRow
                operands={result.numberOperands}
                joinSymbol={divisionSign}
                result={result.numberResult}
            />
        </div>
    );
};
