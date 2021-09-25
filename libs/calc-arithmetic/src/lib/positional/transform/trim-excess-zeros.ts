import { Digit } from '@calc/calc-arithmetic';
import { OperandsTransform } from './operands-transform';
import { trimExcessZeros } from '../digits';

export class TrimExcessZeros<T extends Digit> implements OperandsTransform<T> {
    private readonly numPositions: number;

    constructor(numPositions = 0) {
        this.numPositions = numPositions;
    }

    transform(operands: T[][]): T[][] {
        return operands.map((opRow) => trimExcessZeros(opRow));
    }
}
