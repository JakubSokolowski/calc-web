import { Digit } from '@calc/calc-arithmetic';
import { OperandsTransform } from './operands-transform';
import { shiftLeft } from '../digits';

export class IncrementalLeftShift<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        return operands.map((opRow, index) => shiftLeft(opRow, index));
    }
}
