import {
    AdditionResult,
    OperationType,
    SubtractionResult
} from '@calc/calc-arithmetic';
import { AddAtPositionHoverContent } from '../addition/addition-position-result/add-at-position-hover-content';
import { SubtractAtPositionResult } from '../subtraction/subtraction-position-result/subtraction-position-result';


export const getGroupBuilder = (result: AdditionResult | SubtractionResult ) => {
    switch(result.operation) {
        case OperationType.Addition:
            return AddAtPositionHoverContent;
        case OperationType.Subtraction:
            return SubtractAtPositionResult;
        case OperationType.Multiplication:
            break;
        case OperationType.Division:
            break;
    }
};
