import BigNumber from 'bignumber.js';
import { BaseDigits } from './base-digits';
import { Digit, Operand } from '../models';

export class Digits {
    public digits: string[];
    public base: number;

    constructor(digits: string[], base: number) {
        this.digits = digits;
        this.base = base;
    }

    get length(): number {
        return this.digits.length;
    }

    public getDigit(index: number): string {
        return this.digits[index];
    }

    public getDigitValue(index: number): number {
        return BaseDigits.getValue(this.digits[index], this.base);
    }

    public toString(): string {
        return this.base > 36 ? this.digits.join(' ') : this.digits.join('');
    }
}

export interface PositionalRepresentation {
    base: number;
    integerPart: Digits;
    fractionalPart: Digits;
    sign: string;
    delimiter: string;

    toString(): string;
}

/**
 * Represents complement of number in positional system
 */
export class NumberComplement implements PositionalRepresentation {
    public base: number;
    public fractionalPart: Digits;
    public integerPart: Digits;
    public isNegative: boolean;

    constructor(
        integral: Digits | string[],
        fractional: Digits | string[],
        base: number,
        isNegative: boolean
    ) {
        this.integerPart =
            integral instanceof Digits ? integral : new Digits(integral, base);
        this.fractionalPart =
            fractional instanceof Digits
                ? fractional
                : new Digits(fractional, base);
        this.base = base;
        this.isNegative = isNegative;
    }

    get sign(): string {
        return (
            '(' +
            BaseDigits.getDigit(
                this.isNegative ? this.base - 1 : 0,
                this.base
            ) +
            ')'
        );
    }

    get delimiter(): string {
        return this.fractionalPart.length ? '.' : '';
    }

    public toString(precision = 30): string {
        return this.sign + this.noSignValue(precision);
    }


    public noSignValue(precision = 30): string {
        return (
            this.integerPart.toString() +
            this.delimiter +
            this.fractionalPart.toString().slice(0, precision)
        );
    }

    public toDigitsList(): Operand[] {
        const digits = toDigitList(this.integerPart, this.fractionalPart);
        const extension: Operand = {
            isComplementExtension: true,
            position: digits[0].position + 1,
            representationInBase: this.sign,
            valueInDecimal: this.isNegative ? this.base -1 : 0,
            base: this.base
        };

        return [extension, ...digits];
    }
}

export class PositionalNumber extends NumberComplement {
    public complement: NumberComplement;
    public decimalValue: BigNumber;

    constructor(
        integral: Digits | string[],
        fractional: Digits | string[],
        base: number,
        decimalValue: BigNumber,
        complement: NumberComplement
    ) {
        super(integral, fractional, base, decimalValue.isNegative());
        this.decimalValue = decimalValue;
        this.complement = complement;
    }

    get valueInBase(): string {
        return this.toString();
    }

    public get sign(): string {
        return this.decimalValue.isNegative() ? '-' : '';
    }

    public toDigitsList(): Digit[] {
        return toDigitList(this.integerPart, this.fractionalPart);
    }
}


function toDigitList(integerPart: Digits, fractionalPart: Digits): Operand[] {
    const base = integerPart.base;
    const integerPartDigits: Operand[] = integerPart.digits.map((digit, index) => {
        const position = (integerPart.digits.length - 1) - index;

        return {
            position,
            base,
            representationInBase: digit,
            valueInDecimal: BaseDigits.getValue(digit, base),
        }
    });

    const fractionalPartDigits: Operand[] = fractionalPart.digits.map((digit, index) => {
        const position = - 1 - index;

        return {
            position,
            base,
            representationInBase: digit,
            valueInDecimal: BaseDigits.getValue(digit, base)
        }
    });

    return [...integerPartDigits, ...fractionalPartDigits];
}
