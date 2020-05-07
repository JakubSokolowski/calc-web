/**
 * Handles conversions digit <-> value for positional systems of different bases
 */
export class BaseDigits {
    public static readonly MAX_BASE: number = 99;
    public static readonly defaultDigits: string =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * Checks whether base is between 2 and MAX_BASE
     * @param base
     */
    public static isValidRadix(base: number): boolean {
        return base >= 2 && base <= this.MAX_BASE;
    }

    /**
     * Returns digit that has specified value in base
     * @param value
     * @param base
     * @example getDigit(10, 16) will return 'A'
     */
    public static getDigit(value: number, base: number): string {
        if (!this.isValidRadix(base)) {
            throw new Error('Base must be between 2 and ');
        }
        if (value < base) {
            if (base <= 36) {
                return this.defaultDigits[value];
            }
            return value < 10 ? '0' + value.toString() : value.toString();
        }
        throw new Error(
            'The value ' +
                value +
                ' is not in range 0 - ' +
                (base - 1).toString()
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
            throw new Error('Radix must be between 2 and ');
        }
        return base <= 36
            ? this.defaultDigits.indexOf(digit)
            : Number.parseInt(digit, 10);
    }
}
