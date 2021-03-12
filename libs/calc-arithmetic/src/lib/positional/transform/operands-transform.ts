import { Digit } from '../../models';

export interface OperandsTransform<T extends Digit> {
    transform(operands: T[][]): T[][];
}
