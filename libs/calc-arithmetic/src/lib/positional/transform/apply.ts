import { Digit } from '@calc/calc-arithmetic';
import { OperandsTransform } from './operands-transform';

export function applyTransforms<T extends Digit>(operands: T[][], transforms: OperandsTransform<T>[]): T[][] {
    return transforms.reduce((prev: T[][], t: OperandsTransform<T>) => {
        return t.transform(prev);
    }, operands);
}
