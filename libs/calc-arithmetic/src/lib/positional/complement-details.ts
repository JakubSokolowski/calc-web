import { fromDigits, fromStringDirect } from './base-converter';
import { computeComplement, isValidComplementStr } from './complement-converter';
import { PositionalNumber } from './positional-number';
import { Digit } from '../models';
import { BaseDigits } from './base-digits';
import { ComplementConversionResult } from '../models/complement';

export function getComplementWithDetails(representation: string, base: number): ComplementConversionResult {
    const input = fromStringDirect(representation, base);
    if (isValidComplementStr(representation, base)) return getComplementsComplement(input);
    if (input.isNegative()) {
        return getNegativeNumberComplementWithDetails(input);
    } else {
        return getPositiveNumberComplementWithDetails(input);
    }
}

function getPositiveNumberComplementWithDetails(value: PositionalNumber): ComplementConversionResult {
    return {
        afterSubtraction: [],
        minuendDigits: [],
        one: BaseDigits.getDigit(1, value.base()),
        inputNumber: value,
        inputDigits: value.asDigits(false),
        complementDigits: value.complement.asDigits(false)
    };
}

function getComplementsComplement(value: PositionalNumber): ComplementConversionResult {
    const [negation, complement] = computeComplement(value.complement.asDigits());

    const inputDigits = value.complement.asDigits(false);
    const msp = inputDigits[0].position;

    const one = BaseDigits.getDigit(1, value.base(), inputDigits[inputDigits.length - 1].position);
    const minuendDigits = getMaxForPositions(value.base(), msp, inputDigits.length).asDigits();

    return {
        inputDigits,
        complementDigits: complement.slice(1),
        inputNumber: value,
        afterSubtraction: negation.slice(1),
        minuendDigits,
        one
    };
}


function getNegativeNumberComplementWithDetails(value: PositionalNumber): ComplementConversionResult {
    const [negation, complement] = computeComplement(value.asDigits());

    const inputDigits = value.asDigits(false);

    const one = BaseDigits.getDigit(1, value.base(), inputDigits[inputDigits.length - 1].position);
    const minuendDigits = getMaxForPositions(value.base(), inputDigits[0].position, inputDigits.length).toDigitsList();

    return {
        inputDigits,
        complementDigits: complement.filter(d => !d.isComplementExtension),
        inputNumber: value,
        afterSubtraction: negation.filter(d => !d.isComplementExtension),
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
    return fromDigits(digits);
}
