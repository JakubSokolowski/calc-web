import { OperandsTransform } from './operands-transform';
import { applyTransforms } from './apply';
import { LeftShift } from './left-shift';
import { TrimExcessZeros } from './trim-excess-zeros';
import { Digit } from '../../models';


export class ScaleToDivisor<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        const [, divisor] = operands;
        const numDivisorFractionDigits = divisor.filter(d => d.position < 0).length;

        const transforms = [
            new LeftShift<T>(numDivisorFractionDigits),
            new TrimExcessZeros<T>(),
        ];
        return applyTransforms(operands, transforms);
    }
}
