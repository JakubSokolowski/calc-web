import BigNumber from 'bignumber.js';
import { BaseDigits } from './base-digits';

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

    public toString(): string {
        return this.sign + this.noSignValue();
    }

    public noSignValue(): string {
        return (
            this.integerPart.toString() +
            this.delimiter +
            this.fractionalPart.toString()
        );
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
}
