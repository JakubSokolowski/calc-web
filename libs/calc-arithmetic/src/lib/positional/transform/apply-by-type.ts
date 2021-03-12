import { Digit } from '@calc/calc-arithmetic';
import { OperandsTransformType } from './preprocessor-type';
import { getTransform } from './transform';

export function applyTransformsByType<T extends Digit>(operands: T[][], transforms: OperandsTransformType[]): T[][] {
    return transforms.reduce((prev: T[][], type: OperandsTransformType) => {
        return getTransform<T>(type).transform(prev);
    }, operands);
}


