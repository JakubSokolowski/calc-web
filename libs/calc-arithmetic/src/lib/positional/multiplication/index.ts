import { PositionalNumber } from '../positional-number';
import { MultiplicationResult } from '../../models';
import { MultiplicationWithoutExtensionU2 } from './without-extension-u2';
import { WithoutExtension } from './without-extension';

export function multiplyWithoutExtension(numbers: PositionalNumber[]): MultiplicationResult {
    if (numbers[0].base() === 2 || numbers[0].base().toString() === '2') return new MultiplicationWithoutExtensionU2(numbers).multiply();
    return new WithoutExtension(numbers).multiply();
}
