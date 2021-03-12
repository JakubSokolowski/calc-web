import { OperandsTransform } from './operands-transform';
import { Digit } from '../../models';
import { alignFractions } from '../digits';


export class AlignFractions<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        return alignFractions(operands)
    }
}
