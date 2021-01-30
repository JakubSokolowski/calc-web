import React, { FC } from 'react';
import { AdditionResult, MultiplicationResult, OperationType, SubtractionResult } from '@calc/calc-arithmetic';
import { OperandRow } from '../operation-result/operand-row/operand-row';
import { ComplementResult } from '../complement-converter-view/complement-result/complement-result';

interface P {
    result: AdditionResult | SubtractionResult | MultiplicationResult;
}

function getOperationSign(operation: OperationType) {
    switch(operation) {
        case OperationType.Addition:
            return '+';
        case OperationType.Subtraction:
            return '-';
        default:
            throw Error(`Details not implemented for: ${operation}`);
    }
}

export const ResultDetails: FC<P> = ({ result, children, ...rest }) => {
    const tooltipBase = 10;
    const sign = getOperationSign(result.operation);

    const resultRow = (
        <div>
            <OperandRow
                operands={result.numberOperands}
                joinSymbol={sign}
                result={result.numberResult}
            />
        </div>
    );

    const hasSomeNegativeOperands = result.numberOperands.some(op => op.isNegative);
    if(!hasSomeNegativeOperands) return resultRow;

    const complements = result.numberOperands.map((op, idx) => {
        return <ComplementResult key={idx} number={op}/>;
    });

    return (
        <div {...rest}>
            <div className='complements-row'>{complements}</div>
            <OperandRow
                operands={result.numberOperands}
                joinSymbol={sign}
                result={result.numberResult}
                showAsComplement
            />
        </div>
    );
};
