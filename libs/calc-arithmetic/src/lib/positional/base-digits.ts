import { logBase } from '@calc/utils';

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
    public static isValidRadix(base: number): boolean {
        return base >= this.MIN_BASE && base <= this.MAX_BASE;
    }

    /**
     * Returns digit that has specified value in base
     * @param value
     * @param base
     * @example getDigit(10, 16) will return 'A'
     */
    public static getDigit(value: number, base: number): string {
        if (!this.isValidRadix(base)) {
            throw new Error(`Base must be between ${this.MIN_BASE} and ${this.MAX_BASE}, but was "${base}"`);
        }
        if (value < base) {
            if (base <= 36) {
                return this.defaultDigits[value];
            }
            return value < 10 ? '0' + value.toString() : value.toString();
        }
        throw new Error(
            `The value ${value} is not in range 0 - ${(base - 1).toString()}`
        );
    }

    /**
     * Returns value of specified digit.
     * @param digit must be number or uppercase letter
     * @param base
     * @example getValue('A', 16) will return 10
     */
    public static getValue(digit: string, base: number): number {
        if (!this.isValidRadix(base)) {
            throw new Error(`Base must be between ${this.MIN_BASE} and ${this.MAX_BASE}`);
        }
        return base <= 36
            ? this.defaultDigits.indexOf(digit)
            : Number.parseInt(digit, 10);
    }

    public static getAllPossibleBasesForAssociateConversion(base: number): number[] {
        return [
            ...this.getSmallerAssociateBases(base),
            ...this.getGreaterAssociateBases(base)
        ];
    }


    private static getGreaterAssociateBases(base: number): number[] {
        const possibleBases = [];
        const minExponent = 2;

        for (let n = minExponent; ; n++) {
            const newGreaterBase = Math.pow(base, n);
            if(newGreaterBase > this.MAX_BASE) break;
            possibleBases.push(newGreaterBase);
        }

        return possibleBases;
    }

    private static getSmallerAssociateBases(base: number): number[] {
        const possibleBases = [];

        for(let n = 2; ; n++) {
            const nthRoot = Math.pow(base, 1/n);
            if(nthRoot < this.MIN_BASE) break;
            if(Number.isInteger(nthRoot)) possibleBases.push(nthRoot)
        }

        return possibleBases.reverse();
    }

    public static canConvertUsingAssociateBaseMethod(inputBase: number, outputBase: number): boolean {
        const smaller = Math.min(inputBase, outputBase);
        const greater = Math.max(inputBase, outputBase);

        const log = +logBase(greater, smaller).toFixed(4);
        return Number.isInteger(log);
    }
}
