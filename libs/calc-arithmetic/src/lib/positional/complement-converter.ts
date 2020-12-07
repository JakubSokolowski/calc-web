import { isValidString, splitToDigits } from '../helpers/conversion-helpers';
import { BaseDigits } from './base-digits';
import { Digits, NumberComplement } from './representations';

/**
 * Handles creating number's BaseComplement form it's string representation
 */
export class ComplementConverter {
    public static isNegative(str: string) {
        return str.charAt(0) === '-';
    }

    /**
     * Checks whether the sign in front of complement str is negative
     * @param str
     * @param base
     */
    public static isComplementStrNegative(str: string, base = 10) {
        // Total sign length can be 3 - (9) or 4 (63), in comparision use only
        // value in between parenthesis
        const signLength = base > 36 ? 2 : 1;
        const sign = str.substr(1, signLength);
        return sign === BaseDigits.getDigit(base - 1, base);
    }

    /**
     * Check whether given string can be used to represent complement of
     * a number.
     * @param str
     * @param base
     */
    public static isValidComplementStr(str: string, base: number): boolean {
        if (this.hasValidComplementSign(str, base)) {
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
     * Checks whether given string starts with valid sign
     * ex. (0) or (9) for base 10
     * @param str
     * @param base
     */
    public static hasValidComplementSign(str: string, base: number) {
        const zeroDigit = BaseDigits.getDigit(0, base);
        const maxDigit = BaseDigits.getDigit(base - 1, base);
        const regStr = '^(\\(*\\)|\\(#\\)).*'
            .replace('*', zeroDigit)
            .replace('#', maxDigit);
        const reg = new RegExp(regStr);
        return reg.test(str);
    }

    /**
     * Checks whether string has delimiter (is floating point string).
     * Accepts delimiters '.' and ','
     * @param str
     */
    public static hasDelimiter(str: string): boolean {
        return str.includes('.') || str.includes(',');
    }

    /**
     * Computes a complement of a number, represented either by value string or
     * NumberComplement
     * @param value value representing a number
     * @param base base of a input, default value is 10
     */
    public static getComplement(
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
        if (ComplementConverter.isNegative(val)) {
            return this.getNegativeNumberComplement(val, base);
        } else {
            return this.getPositiveNumberComplement(val, base);
        }
    }

    /**
     * Computes complement of a negative number
     * @param repStr
     * @param base
     */
    public static getNegativeNumberComplement(
        repStr: string,
        base: number
    ): NumberComplement {
        const repParts = splitToDigits(repStr.substr(1), base);
        const complementDigits = ComplementConverter.computeComplement(
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
    public static getPositiveNumberComplement(
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
    public static getDigitComplement(digit: string, base: number): string {
        return BaseDigits.getDigit(
            base - 1 - BaseDigits.getValue(digit, base),
            base
        );
    }

    /**
     * Increments the value of number represented by digit list by 1
     * @param digits
     * @param base
     */
    public static incrementNumber(digits: string[], base: number): string[] {
        for (let i = digits.length - 1; i >= 0; i--) {
            const val = BaseDigits.getValue(digits[i], base);
            if (val === base - 1) {
                digits[i] = BaseDigits.getDigit(0, base);
            } else {
                digits[i] = BaseDigits.getDigit(val + 1, base);
                break;
            }
        }
        return digits;
    }

    /**
     * Computes a complement of a number represented by its integral and fractional
     * parts digits
     * @param integral
     * @param fractional
     * @param base
     */
    public static computeComplement(
        integral: Digits,
        fractional: Digits,
        base: number
    ): [Digits, Digits] {
        let digits = integral.digits.concat(fractional.digits);
        for (let i = 0; i < digits.length; i++) {
            digits[i] = ComplementConverter.getDigitComplement(digits[i], base);
        }
        digits = this.incrementNumber(digits, base);

        return [
            new Digits(digits.slice(0, integral.length), base),
            new Digits(
                digits.slice(
                    integral.length,
                    integral.length + fractional.length
                ),
                base
            )
        ];
    }

    /**
     * Computes the string representation of a number, given its complement
     * string
     * @param str
     * @param base
     */
    public static complementStrToBaseStr(str: string, base: number) {
        let noSignStr = base > 36 ? str.substr(4) : str.substring(3);

        if (!this.isComplementStrNegative(str, base)) {
            if (noSignStr.startsWith('.')) {
                return `${BaseDigits.getDigit(0, base)}${noSignStr}`;
            }
            return noSignStr;
        }

        const isShortenedComplement = noSignStr.startsWith('.');
        if (isShortenedComplement) {
            const zero = BaseDigits.getDigit(base - 1, base);
            noSignStr = `${zero}${noSignStr}`;
        }

        const [integral, fractional] = splitToDigits(noSignStr.trim(), base);
        const baseDigits = this.computeComplement(
            integral,
            fractional,
            base
        );
        const delimiter = baseDigits[1].length === 0 ? '' : '.';
        return `-${baseDigits[0].toString()}${delimiter}${baseDigits[1].toString()}`;
    }
}
