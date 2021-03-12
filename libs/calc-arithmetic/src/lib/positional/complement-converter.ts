import { digitsToStr, isValidString, splitToDigitsList } from '../helpers/conversion-helpers';
import { BaseDigits } from './base-digits';
import { Digit } from '../models';
import { NumberComplement } from './number-complement';


/**
 * Checks whether the sign in front of complement str is negative
 * @param str
 * @param base
 */
export function isComplementStrNegative(str: string, base = 10): boolean {
    // Total sign length can be 3 - (9) or 4 (63), in comparision use only
    // value in between parenthesis
    const signLength = base > 36 ? 2 : 1;
    const sign = str.substr(1, signLength);
    return sign === BaseDigits.getRepresentation(base - 1, base);
}

/**
 * Checks whether given string starts with valid sign
 * ex. (0) or (9) for base 10
 * @param str
 * @param base
 */
export function hasValidComplementSign(str: string, base: number): boolean {
    const zeroDigit = BaseDigits.getRepresentation(0, base);
    const maxDigit = BaseDigits.getRepresentation(base - 1, base);
    const regStr = '^(\\(*\\)|\\(#\\)).*'
        .replace('*', zeroDigit)
        .replace('#', maxDigit);
    const reg = new RegExp(regStr);
    return reg.test(str);
}

export function isNegative(str: string): boolean {
    return str.charAt(0) === '-';
}

export function isDigitNegativeComplement<T extends Digit>(digit: T): boolean {
   return digit.isComplementExtension && digit.valueInDecimal !== 0;
}


/**
 * Check whether given string can be used to represent complement of
 * a number.
 * @param str
 * @param base
 */
export function isValidComplementStr(str: string, base: number): boolean {
    if (hasValidComplementSign(str, base)) {
        const [, noSignComplementStr] = str.split(')');

        const strToCheck = noSignComplementStr.startsWith('.')
            ? noSignComplementStr.substring(1)
            : noSignComplementStr;

        return isValidString(strToCheck, base);
    } else {
        return false;
    }
}


/**
 * Check whether given string can be used to represent complement of
 * a number.
 * @param str
 * @param base
 */
export function isValidComplementOrRepresentationStr(str: string, base: number): boolean {
    return isValidComplementStr(str, base) || isValidString(str, base);
}


/**
 * Checks whether string has delimiter (is floating point string).
 * Accepts delimiters '.' and ','
 * @param str
 */
export function hasDelimiter(str: string): boolean {
    return str.includes('.') || str.includes(',');
}

/**
 * Computes a complement of a number, represented either by value string or
 * NumberComplement
 * @param value value representing a number
 * @param base base of a input, default value is 10
 */
export function getComplement(
    value: string | NumberComplement,
    base = 10
): NumberComplement {
    if (value instanceof NumberComplement) {
        return getComplementsComplement(value);
    }

    const digits = splitToDigitsList(value, base);
    const negative = isNegative(value);

    if (negative) {
        return getNegativeNumberComplement(digits);
    } else {
        return getPositiveNumberComplement(digits);
    }
}

/**
 * Computes complement of a negative number
 * @param digits
 * @param base
 */
export function getNegativeNumberComplement(
    digits: Digit[],
): NumberComplement {
    const base = digits[0].base;
    const extension = getExtensionDigit(base, true, digits[0].position + 1);
    const [, afterAdditionDigits] = computeComplement(digits);
    const complementDigits = [extension, ...afterAdditionDigits];
    return new NumberComplement(complementDigits);
}

/**
 * Computes complement of a another complement
 * @param complement
 */
function getComplementsComplement(
    complement: NumberComplement,
): NumberComplement {
    const [, digits] = computeComplement(complement.asDigits(false));
    const extension = getExtensionDigit(complement.base(), !complement.isNegative(), digits[0].position + 1);
    const complementDigits = [extension, ...digits];
    return new NumberComplement(complementDigits);
}



/**
 * Computes complement of a positive number
 * @param digits
 */
export function getPositiveNumberComplement(
    digits: Digit[]
): NumberComplement {
    const base = digits[0].base;
    const extension = getExtensionDigit(base, false, digits[0].position + 1);
    const complementDigits = [extension, ...digits];
    return new NumberComplement(complementDigits);
}

function getExtensionDigit(base: number, isNegative: boolean, position: number): Digit {
    const value = isNegative ? base - 1 : 0;
    const digit = BaseDigits.getDigit(value, base, position, true);
    return {
        ...digit,
        isComplementExtension: true
    };
}


/**
 * Returns complement of a single in some positional system specified by
 * base
 * @param digit
 * @param base
 */
export function getDigitComplement(digit: Digit): Digit {
    const valueInDecimal = digit.base - 1 - digit.valueInDecimal;
    return {
        ...digit,
        valueInDecimal,
        representationInBase: BaseDigits.getRepresentation(valueInDecimal, digit.base)
    };
}

/**
 * Increments the value of number represented by digit list by 1
 * @param digits
 * @param base
 */
export function incrementNumber(digits: Digit[]): Digit[] {
    const result: Digit[] = [...digits];
    const base = digits[0].base;
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i].valueInDecimal === base - 1) {
            result[i] = BaseDigits.getDigit(0, base, digits[i].position);
        } else {
            result[i] = BaseDigits.getDigit(digits[i].valueInDecimal + 1, base, digits[i].position);
            break;
        }
    }
    return result;
}


/**
 * Computes a complement of a number represented by its integral and fractional
 * parts digits
 * @param digits
 */
export function computeComplement(
    digits: Digit[]
): [ Digit[], Digit[]] {
    const afterNegation = digits.map(d => getDigitComplement(d));
    const complement = incrementNumber(afterNegation);

    return [
        afterNegation,
        complement
    ];
}

/**
 * Computes a complement of a number represented by its integral and fractional
 * parts digits
 * @param digits
 */
export function computeComplementWithDetails(
    digits: Digit[]
): [Digit[], Digit[]] {
    const afterNegation = digits.map(d => getDigitComplement(d));
    const afterAddition = incrementNumber(afterNegation);
    return [afterNegation, afterAddition];
}

/**
 * Computes the string representation of a number, given its complement
 * string
 * @param str
 * @param base
 */
export function complementStrToBaseStr(str: string, base: number): string {
    let noSignStr = base > 36 ? str.substr(4) : str.substring(3);

    if (!isComplementStrNegative(str, base)) {
        if (noSignStr.startsWith('.')) {
            return `${BaseDigits.getRepresentation(0, base)}${noSignStr}`;
        }
        return noSignStr;
    }

    const isShortenedComplement = noSignStr.startsWith('.');
    if (isShortenedComplement) {
        const zero = BaseDigits.getRepresentation(base - 1, base);
        noSignStr = `${zero}${noSignStr}`;
    }

    const digits = splitToDigitsList(noSignStr.trim(), base);
    const [, complementDigits] = computeComplement(digits);

    return `-${digitsToStr(complementDigits)}`;
}

export function stripComplementExtension(str: string, base: number): string {
    const numCharsForExtension = base > 36 ? 4 : 3;
    const noSignStr = str.substr(numCharsForExtension);
    const isShortenedComplement = noSignStr.startsWith('.');

    if (!isShortenedComplement) return noSignStr.trim();
    const zero = BaseDigits.getRepresentation(0, base);
    return `${zero}${noSignStr}`;
}


