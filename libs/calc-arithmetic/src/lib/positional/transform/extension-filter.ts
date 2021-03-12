import { Digit } from '../../models';
import { OperandsTransform } from './operands-transform';

export class ExtensionsFilter<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        return operands.map((row) => row.filter(d => !d.isComplementExtension))
    }
}

export class MultiplierExtensionFilter<T extends Digit> implements OperandsTransform<T> {
    transform(operands: T[][]): T[][] {
        if(operands.length != 2) {
            throw new Error(`Multiplicand extension filter requires exactly 2 operands, got: ${operands.length}`);
        }
        const [multiplicand, multiplier] = operands;
        return [multiplicand, multiplier.filter(d => !d.isComplementExtension)];
    }
}

