import { Digit } from '../../models';
import { OperandsTransform } from './operands-transform';
import { AlignFractions } from './align-fractions';
import { OperandsTransformType } from './preprocessor-type';
import { ExtensionsFilter, MultiplierExtensionFilter } from './extension-filter';
import { MultiplicationComplementsExtender } from './multiplication-complements-extender';
import { MergeExtensions } from './merge-extensions';
import { IncrementalLeftShift } from './shift-and-extend';
import { WithoutExtensionU2Prepare } from './woutext-u2-multiplication';
import { LeftShift } from './left-shift';
import { TrimExcessZeros } from './trim-excess-zeros';
import { ScaleToDivisor } from './scale-to-divisor';


export function getTransform<T extends Digit>(type: OperandsTransformType): OperandsTransform<T> {
    switch (type) {
        case OperandsTransformType.WithoutExtensionU2Multiplication:
            return new WithoutExtensionU2Prepare();
        case OperandsTransformType.ShiftAndExtendComplements:
            return new MultiplicationComplementsExtender(true);
        case OperandsTransformType.MergeExtensions:
            return new MergeExtensions();
        case OperandsTransformType.IncrementalLeftShift:
            return new IncrementalLeftShift();
        case OperandsTransformType.LeftShift:
            return new LeftShift();
        case OperandsTransformType.FilterMultiplierExtension:
            return new MultiplierExtensionFilter();
        case OperandsTransformType.ExtendComplements:
            return new MultiplicationComplementsExtender();
        case OperandsTransformType.FilterExtensions:
            return new ExtensionsFilter();
        case OperandsTransformType.AlignFractions:
            return new AlignFractions();
        case OperandsTransformType.TrimExcessZeros:
            return new TrimExcessZeros();
        case OperandsTransformType.ScaleToDivisor:
            return new ScaleToDivisor();
    }
}
