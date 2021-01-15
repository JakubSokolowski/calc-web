import { inRangeInclusive, logBase } from '@calc/utils';
import { Digit } from '../models';

/**
 * Handles conversions digit <-> value for positional systems of different bases
 */
export class BaseDigits {
    public static readonly MAX_BASE: number = 99;
    public static readonly MIN_BASE: number = 2;
    public static readonly defaultDigits: string =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * Checks whether base is between 2 and MAX_BASE
     * @param base
     */
    public static isValidBase(base: number): boolean {
        return base >= this.MIN_BASE && base <= this.MAX_BASE;
    }

    /**
     * Returns digit that has specified value in base
     * @param value
     * @param base
     * @param isComplement
     * @example getDigit(10, 16) will return 'A'
     */
    public static getRepresentation(value: number, base: number, isComplement = false): string {
        if (!this.isValidBase(base)) {
            throw new Error(`Base must be between ${this.MIN_BASE} and ${this.MAX_BASE}, but was "${base}"`);
        }
        if (inRangeInclusive(value, -1, base - 1)) {
            return isComplement
                ? this.getComplementDigitForBase(value, base)
                : this.getDigitForBase(value, base);
        }
        throw new Error(
            `The value ${value} is not in range -1 - ${(base - 1).toString()}`
        );
    }

    public static getDigit(value: number, base: number, position = 0, isComplement?: boolean): Digit {
        return {
            position,
            base,
            valueInDecimal: value,
            isComplementExtension: isComplement,
            representationInBase: this.getRepresentation(value, base, isComplement)
        }
    }

    /**
     * Returns value of specified digit.
     * @param digit must be number or uppercase letter
     * @param base
     * @param isComplement
     * @example getValue('A', 16) will return 10
     */
    public static getValue(digit: string, base: number, isComplement = false): number {
        if (!this.isValidBase(base)) {
            throw new Error(`Base must be between ${this.MIN_BASE} and ${this.MAX_BASE}`);
        }

        return isComplement
            ? this.getValueForComplementDigit(digit, base)
            : this.getValueForDigit(digit, base);
    }

    public static getAllPossibleBasesForAssociateConversion(base: number): number[] {
        if (!this.isValidBase(base)) return [];

        return [
            ...this.getSmallerAssociateBases(base),
            ...this.getGreaterAssociateBases(base)
        ];
    }

    public static canConvertUsingAssociateBaseMethod(inputBase: number, outputBase: number): boolean {
        const smaller = Math.min(inputBase, outputBase);
        const greater = Math.max(inputBase, outputBase);

        const log = +logBase(greater, smaller).toFixed(4);
        return Number.isInteger(log);
    }

    private static getValueForDigit(digit: string, base: number): number {
        return base <= 36
            ? this.defaultDigits.indexOf(digit)
            : Number.parseInt(digit, 10);
    }

    private static getValueForComplementDigit(digit: string, base: number): number {
        if (this.hasBrackets(digit)) {
            const withoutBrackets = this.stripBrackets(digit);
            const value = this.getValueForDigit(withoutBrackets, base);

            return (value === base - 1)
                ? -1
                : value;
        }
        return this.getValueForDigit(digit, base);
    }

    private static stripBrackets(str: string): string {
        return str.replace(/(^.*\(|\).*$)/g, '');
    }

    private static hasBrackets(str: string): boolean {
        return str.includes('(') && str.includes(')');
    }

    private static getDigitForBase(value: number, base: number): string {
        if (base <= 36) return this.defaultDigits[value];
        return value < 10 ? `0${value.toString()}` : value.toString();
    }

    private static getComplementDigitForBase(value: number, base: number): string {
        if (value === -1 || value === base -1) return `(${this.getDigitForBase(base - 1, base)})`;
        if (value === 0) return `(${this.getDigitForBase(value, base)})`;
        return this.getDigitForBase(value, base);
    }

    private static getGreaterAssociateBases(base: number): number[] {
        const possibleBases = [];
        const minExponent = 2;

        for (let n = minExponent; ; n++) {
            const newGreaterBase = Math.pow(base, n);
            if (newGreaterBase > this.MAX_BASE) break;
            possibleBases.push(newGreaterBase);
        }

        return possibleBases;
    }

    private static getSmallerAssociateBases(base: number): number[] {
        const possibleBases = [];

        for (let n = 2; ; n++) {
            const nthRoot = Math.pow(base, 1 / n);
            if (nthRoot < this.MIN_BASE) break;
            if (Number.isInteger(nthRoot)) possibleBases.push(nthRoot);
        }

        return possibleBases.reverse();
    }
}
