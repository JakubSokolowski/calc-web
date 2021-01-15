import BigNumber from 'bignumber.js';
import { BaseDigits } from '../positional/base-digits';
import { Digit } from '../models';
import { replaceAll } from '@calc/utils';
import { strArrayToDigits } from '../positional/digits';

/**
 *  Splits the representation string into digits array
 * @param str
 * @param base
 */
export function representationStrToStrArray(
    str: string,
    base: number
): string[] {
    return str.split(base <= 36 ? '' : ' ');
}

/**
 * Generates regex pattern that matches any number in positional system specified by base
 * @param base Base (base) of a positional system, must in range <2-36>
 * @returns regex pattern string for given base
 */
export function getRepresentationRegexPattern(base: number): string {
    if (base > 36) {
        throw new Error(
            'Matching characters by regex only supporter for bases 2- 36'
        );
    }
    let pattern = '';
    if (base <= 10) {
        // All characters that optionally start with -, are between 0 - given number
        // and might have . in between
        pattern = '^-?[0-#]+([.][0-#]+)?$';
        pattern = replaceAll(
            pattern,
            '#',
            BaseDigits.getRepresentation(base - 1, base)[0]
        );
    } else {
        // All characters that optionally start with -, are between 0 - 9 or A - last character of representation
        // and might . in between
        pattern = '^-?[0-9A-#]+([.][0-9A-#]+)?$';
        pattern = replaceAll(
            pattern,
            '#',
            BaseDigits.getRepresentation(base - 1, base)[0]
        );
    }
    return pattern;
}

/**
 * Removes any digits that represent value 0 from the end of digit array
 * @param digits
 */
export function removeZeroDigits(digits: string[]): string[] {
    let invalidDigitCount = 0;
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] === '0' || digits[i] === '00') {
            invalidDigitCount++;
        } else {
            break;
        }
    }
    return digits.slice(0, digits.length - invalidDigitCount);
}

/**
 * Checks whether string can be interpreted as number in some positional system
 * specified by base
 * @param str number string
 * @param base base of positional system
 */
export function isValidString(str: string, base: number): boolean {
    if (base <= 36) {
        const re = new RegExp(getRepresentationRegexPattern(base));
        return re.test(str);
    }
    if (str[0] === '-') {
        str = str.substr(1);
    }
    const strList = str.replace('.', ' ').split(' ');
    return strList.some(digit => {
        const num = parseInt(digit, 10);
        return !Number.isNaN(num) && num < base;
    });
}

/**
 * Converts arbitrary base integer to decimal
 * @param repStr number representation string
 * @param base the base of repStr
 */
export function arbitraryIntegralToDecimal(
    repStr: string,
    base: number
): BigNumber {
    if (isValidString(repStr, base)) {
        let rep = repStr.trim();
        let result = new BigNumber(0);
        let multiplier = 1;
        // While converting, the numbers are assumed to be unsigned
        // Detect and remember if number was negative
        if (rep.charAt(0) === '-') {
            rep = rep.substr(1);
            multiplier = -1;
        }
        // Digits at positions in some representation are represented by multiple characters,
        // so it's necessary to convert valueString to list of strings
        const strArr = representationStrToStrArray(rep, base);
        // The value at each position is calculated by taking the value of digit
        // and multiplying it by the base of number to the power of exponent

        // The exponents at positions are as follows:
        // For number 531
        // Exponents:  ...2 1 0
        // Digits:        5 3 1
        // So the starting value of exponent is the count of elements in lis -1
        const exponent = strArr.length - 1;
        for (let i = 0; i <= exponent; i++) {
            const expValue = Math.pow(base, exponent - i);
            const digitValue = BaseDigits.getValue(strArr[i], base);
            const toAdd = new BigNumber(digitValue * expValue);
            result = result.plus(toAdd);
        }
        return result.multipliedBy(multiplier);
    }
    throw new Error('Invalid string for given base');
}

/**
 * Converts decimal integer to arbitrary base integer. Returns the digits of
 * resulting number as string array and all the intermediate steps of conversion
 * (dividends/quotients) as second string array.
 * @param num number to convert
 * @param base result base
 * @returns arr[0] - digits, arr[1] - steps
 */
export function decimalIntegerToArbitrary(
    num: BigNumber,
    base: number
): [Digit[], string[]] {
    if (num.isZero()) {
        return [[BaseDigits.getDigit(0, base, 0)], []];
    }
    const remainders: string[] = [];
    const resultDigits: string[] = [];
    let currentNum = num.abs();
    while (!currentNum.isZero()) {
        remainders.push(currentNum.toString());
        const remainder = currentNum.mod(base);
        resultDigits.push(BaseDigits.getRepresentation(remainder.toNumber(), base));
        currentNum = currentNum.dividedToIntegerBy(base);
    }

    const digits = strArrayToDigits(resultDigits.reverse(), base, resultDigits.length -1);

    return [digits, remainders];
}

export function decimalFractionToArbitrary(
    fraction: BigNumber,
    base: number,
    precision = 30
): [Digit[], string[]] {
    if (fraction.isZero()) {
        return [[], []];
    }
    if (fraction.isNegative()) {
        fraction = fraction.negated();
    }
    let result: string[] = [];
    let num = new BigNumber(0);
    let fractionPart: BigNumber;
    let wholePart = 0;
    let fractions: string[] = [];
    fractionPart = fraction;
    for (let i = 0; i < precision; i++) {
        fractions.push(fractionPart.toString());
        num = fractionPart.multipliedBy(base);
        fractions.push(num.toString());
        fractionPart = num.mod(1);
        wholePart = num.minus(fractionPart).toNumber();
        result.push(BaseDigits.getRepresentation(wholePart, base));
    }
    result = removeZeroDigits(result);
    fractions = removeZeroDigits(fractions);
    return [strArrayToDigits(result, base, -1), fractions];
}

/**
 * Converts fractional-part of number in some positional system specified by
 * base to decimal
 * @param fractionStr
 * @param base
 * @returns fractional-part of number in decimal
 */
export function arbitraryFractionToDecimal(
    fractionStr: string,
    base: number
): BigNumber {
    let decimalFraction = new BigNumber(0.0);
    let exponent = 1.0;
    const strArr = representationStrToStrArray(fractionStr, base);
    // The exponents at positions in fraction are as follows:
    // For fraction  0.531
    // Exponents:  0  . -1 -2 -3
    // Digits:     0  .  5  3  1
    for (const digit of strArr) {
        decimalFraction = decimalFraction.plus(
            BaseDigits.getValue(digit, base) * Math.pow(base, exponent * -1)
        );
        exponent++;
    }
    return decimalFraction;
}

/**
 * Checks whether string contains delimiter
 * @param str
 */
export function isFloatingPointStr(str: string): boolean {
    return str.includes('.');
}

/**
 * Splits input BigNumber into integer part and fractional part digit arrays.
 * Skips sign, if the number is negative.
 * @param  num Number to split
 * @param base
 * @returns Array of two string arrays - arr[0] - digits of integer part, arr[1] - digits of fractional part
 */
export function splitToPartsArr(
    num: BigNumber | number | string,
    base = 10
): [string[], string[]] {
    let integerPart: string[] = [];
    let fractionalPart: string[] = [];
    let digits = typeof num === 'string' ? num : num.toString();
    const separator = base > 36 ? ' ' : '';
    if (digits.charAt(0) === '-') {
        digits = digits.substring(1);
    }
    if (digits.includes('.')) {
        // Number has non zero fraction part
        fractionalPart = digits.split('.')[1].split(separator);
    }
    integerPart = digits.split('.')[0].split(separator);
    return [integerPart, fractionalPart];
}


export function splitToDigitsList(num: BigNumber | number | string, base: number): Digit[] {
    const [integerPart, fractionalPart] = splitToPartsArr(num, base);
    return [
        ...integerPart.map((digit, index) => {
            return {
                valueInDecimal: BaseDigits.getValue(digit, base),
                base,
                position: integerPart.length - 1 - index,
                representationInBase: digit
            };
        }),
        ...fractionalPart.map((digit, index) => {
            return {
                valueInDecimal: BaseDigits.getValue(digit, base),
                base,
                position: -1 * (index + 1),
                representationInBase: digit
            };
        })
    ];
}

export function serializeRepresentationStr(representation: string): string {
    return representation
        .replace('−', '-')
        .replace(',', '.')
        .replace(/\s+/g, ' ')
        .trim();
}

export function digitsToStr<T extends Digit>(digits: T[]): string {
    if (!digits.length) return '';
    const base = digits[0].base;
    const joinSymbol = base <= 36 ? '' : ' ';

    const integerPart = digits.filter(d => d.position >= 0).map(d => d.representationInBase);
    const fractionalPart = digits.filter(d => d.position < 0).map(d => d.representationInBase);

    if(!fractionalPart.length) return integerPart.join(joinSymbol);
    if(!integerPart.length) return fractionalPart.join(joinSymbol)
    const separator = '.';
    return `${integerPart.join(joinSymbol)}${separator}${fractionalPart.join(joinSymbol)}`;
}
