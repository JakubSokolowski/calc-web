

import { Digit } from '@calc/calc-arithmetic';
import { OperandsTransform } from './operands-transform';
import { applyTransforms } from './apply';
import { AlignFractions } from './align-fractions';
import { MultiplicationComplementsExtender } from './multiplication-complements-extender';
import { ExtensionsFilter } from './extension-filter';


export class WithoutExtensionU2Prepare<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        const transforms = [
            new AlignFractions<T>(),
            new MultiplicationComplementsExtender<T>(false, true),
            new ExtensionsFilter<T>()
        ];
        return applyTransforms(operands, transforms);
    }
}
