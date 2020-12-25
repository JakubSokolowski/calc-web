import { isValidString, splitToDigits } from '../helpers/conversion-helpers';
import { BaseDigits } from './base-digits';
import { Digits, NumberComplement } from './representations';


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
    let val = '';
    if (value instanceof NumberComplement) {
        val = value.noSignValue();
        base = value.base;
    }
    if (typeof value === 'string') {
        val = value;
    }
    if (isNegative(val)) {
        return getNegativeNumberComplement(val, base);
    } else {
        return getPositiveNumberComplement(val, base);
    }
}

/**
 * Computes complement of a negative number
 * @param repStr
 * @param base
 */
export function getNegativeNumberComplement(
    repStr: string,
    base: number
): NumberComplement {
    const repParts = splitToDigits(repStr.substr(1), base);
    const complementDigits = computeComplement(
        repParts[0],
        repParts[1],
        base
    );
    return new NumberComplement(
        complementDigits[0],
        complementDigits[1],
        base,
        true
    );
}

/**
 * Computes complement of a positive number
 * @param valueStr
 * @param base
 */
export function getPositiveNumberComplement(
    valueStr: string,
    base: number
): NumberComplement {
    const digits = splitToDigits(valueStr, base);
    return new NumberComplement(digits[0], digits[1], base, false);
}

/**
 * Returns complement of a single in some positional system specified by
 * base
 * @param digit
 * @param base
 */
export function getDigitComplement(digit: string, base: number): string {
    return BaseDigits.getRepresentation(
        base - 1 - BaseDigits.getValue(digit, base),
        base
    );
}

/**
 * Increments the value of number represented by digit list by 1
 * @param digits
 * @param base
 */
export function incrementNumber(digits: string[], base: number): string[] {
    const result: string[] = [...digits];
    for (let i = digits.length - 1; i >= 0; i--) {
        const val = BaseDigits.getValue(digits[i], base);
        if (val === base - 1) {
            result[i] = BaseDigits.getRepresentation(0, base);
        } else {
            result[i] = BaseDigits.getRepresentation(val + 1, base);
            break;
        }
    }
    return result;
}

/**
 * Computes a complement of a number represented by its integral and fractional
 * parts digits
 * @param integral
 * @param fractional
 * @param base
 */
export function computeComplement(
    integral: Digits,
    fractional: Digits,
    base: number
): [Digits, Digits, string[]] {
    const digits = integral.digits.concat(fractional.digits);
    const afterSubtraction = digits.map(d => getDigitComplement(d, base));
    const afterAddition = incrementNumber(afterSubtraction, base);

    return [
        new Digits(afterAddition.slice(0, integral.length), base),
        new Digits(
            afterAddition.slice(
                integral.length,
                integral.length + fractional.length
            ),
            base
        ),
        afterSubtraction
    ];
}

/**
 * Computes the string representation of a number, given its complement
 * string
 * @param str
 * @param base
 */
export function complementStrToBaseStr(str: string, base: number) {
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

    const [integral, fractional] = splitToDigits(noSignStr.trim(), base);
    const baseDigits = computeComplement(
        integral,
        fractional,
        base
    );
    const delimiter = baseDigits[1].length === 0 ? '' : '.';
    return `-${baseDigits[0].toString()}${delimiter}${baseDigits[1].toString()}`;
}


