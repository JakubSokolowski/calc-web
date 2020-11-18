import React, { FC } from 'react';
import { AdditionResult, OperationType, SubtractionResult } from '@calc/calc-arithmetic';
import { AdditionResultComponent } from '../addition/addition-result/addition-result-component';
import { SubtractionResultComponent } from '../subtraction/subtraction-result/subtraction-result-component';

interface OperationResultProps {
    result: AdditionResult | SubtractionResult;
}

export const OperationResultComponent: FC<OperationResultProps>  = ({result}) => {

    switch(result.operation) {
        case OperationType.Addition:
            return <AdditionResultComponent result={result as AdditionResult}/>;
        case OperationType.Subtraction:
            return <SubtractionResultComponent result={result as SubtractionResult}/>;
        case OperationType.Multiplication:
            break;
        case OperationType.Division:
            break;

    }

    return (
        <div>
            {`${result}`}
        </div>
    )
};
