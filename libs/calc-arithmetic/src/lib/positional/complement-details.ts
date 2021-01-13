import { fromDigits, fromStringDirect } from './base-converter';
import { computeComplement, isValidComplementStr, stripComplementExtension } from './complement-converter';
import { PositionalNumber } from './representations';
import { Digit } from '../models';
import { BaseDigits } from './base-digits';
import { ComplementConversionResult } from '../models/complement';
import { strArrayToDigits } from './digits';
import { splitToDigits, splitToDigitsList } from '../helpers/conversion-helpers';

export function getComplementWithDetails(representation: string, base: number): ComplementConversionResult {
    const input = fromStringDirect(representation, base).result;
    if (isValidComplementStr(representation, base)) return getComplementsComplement(input);
    if (input.isNegative) {
        return getNegativeNumberComplementWithDetails(input);
    } else {
        return getPositiveNumberComplementWithDetails(input);
    }
}


function getPositiveNumberComplementWithDetails(value: PositionalNumber): ComplementConversionResult {
    return {
        afterSubtraction: [],
        minuendDigits: [],
        one: BaseDigits.getDigit(1, value.base),
        inputNumber: value,
        inputDigits: value.toDigitsList(),
        complementDigits: value.complement.toDigitsList().filter(d => !d.isComplementExtension)
    };
}

function getComplementsComplement(value: PositionalNumber): ComplementConversionResult {
    const noExtensionStr = stripComplementExtension(value.complement.toString(), value.base);
    const [integerPart, fractionPart] = splitToDigits(noExtensionStr);
    const [, , afterSubStrArr, afterAdditionStrArr] = computeComplement(integerPart, fractionPart, value.base);

    const inputDigits = splitToDigitsList(noExtensionStr);
    const msp = inputDigits[0].position;

    const afterSubtraction = strArrayToDigits(afterSubStrArr, value.base, msp);
    const complementDigits = strArrayToDigits(afterAdditionStrArr, value.base, msp);

    const one = BaseDigits.getDigit(1, value.base, inputDigits[inputDigits.length - 1].position);
    const minuendDigits = getMaxForPositions(value.base, msp, inputDigits.length).toDigitsList();

    return {
        inputDigits,
        complementDigits,
        inputNumber: value,
        afterSubtraction,
        minuendDigits,
        one
    };
}


function getNegativeNumberComplementWithDetails(value: PositionalNumber): ComplementConversionResult {
    const [, , afterSubStrArr] = computeComplement(value.integerPart, value.fractionalPart, value.base);

    const inputDigits = value.toDigitsList();
    const afterSubtraction = strArrayToDigits(afterSubStrArr, value.base, inputDigits[0].position);

    const one = BaseDigits.getDigit(1, value.base, inputDigits[inputDigits.length - 1].position);
    const minuendDigits = getMaxForPositions(value.base, inputDigits[0].position, inputDigits.length).toDigitsList();

    return {
        inputDigits,
        complementDigits: value.complement.toDigitsList().filter(d => !d.isComplementExtension),
        inputNumber: value,
        afterSubtraction,
        minuendDigits,
        one
    };
}

function getMaxForPositions(base: number, startPosition: number, length: number): PositionalNumber {
    const currPosition = startPosition;
    const digits: Digit[] = [];
    for (let i = 0; i < length; i++) {
        const position: Digit = {
            base,
            position: currPosition,
            valueInDecimal: base - 1,
            representationInBase: BaseDigits.getRepresentation(base - 1, base)
        };
        digits.push(position);
    }
    return fromDigits(digits).result;
}
