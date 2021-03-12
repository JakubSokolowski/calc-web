import { Digit } from '@calc/calc-arithmetic';
import { OperandsTransform } from './operands-transform';
import { mergeExtensionDigits } from '../complement-extension';


export class MergeExtensions<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        return operands.map(mergeExtensionDigits);
    }
}
