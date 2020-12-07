import React, { FC } from 'react';
import { AdditionResult, MultiplicationResult, OperationType, SubtractionResult } from '@calc/calc-arithmetic';
import { AdditionResultComponent } from '../addition/addition-result/addition-result-component';
import { SubtractionResultComponent } from '../subtraction/subtraction-result/subtraction-result-component';
import { MultiplicationResultComponent } from '../multiplication/multiplication-result/multiplication-result.component';

interface OperationResultProps {
    result: AdditionResult | SubtractionResult | MultiplicationResult;
}

export const OperationResultComponent: FC<OperationResultProps>  = ({result}) => {

    switch(result.operation) {
        case OperationType.Addition:
            return <AdditionResultComponent result={result as AdditionResult}/>;
        case OperationType.Subtraction:
            return <SubtractionResultComponent result={result as SubtractionResult}/>;
        case OperationType.Multiplication:
            return <MultiplicationResultComponent result={result as MultiplicationResult}/>;
        case OperationType.Division:
            break;

    }

    return (
        <div>
            {`${result}`}
        </div>
    )
};
