import { PositionalRepresentation } from '../models/positional-representation';
import { Digit } from '../models';
import { digitsToStr } from '../helpers/conversion-helpers';
import { trimLeadingZeros } from './digits';

export class NumberComplement implements PositionalRepresentation {
    private readonly digits: Digit[];

    constructor(
        digits: Digit[],
    ) {
        this.digits = digits;
    }

    base(): number {
        return this.digits[0].base;
    }

    isNegative(): boolean {
        const [extensionDigit] = this.digits;

        return !(extensionDigit.valueInDecimal === 0);
    }

    asDigits(withExtension = true): Digit[] {
        if(!withExtension) return this.digits.filter(d => !d.isComplementExtension);
        return this.digits;
    }

    fractionPartDigits(): Digit[] {
        return this.digits.filter(d => d.position < 0);
    }

    fractionPartStr(): string {
        return digitsToStr(this.fractionPartDigits());
    }

    integerPartDigits(withExtension = true): Digit[] {
        if(!withExtension) return this.digits.filter(d => d.position >= 0 && !d.isComplementExtension);
        return this.digits.filter(d => d.position >= 0);
    }

    integerPartStr(): string {
        return digitsToStr(this.integerPartDigits());
    }

    leastSignificantPosition(): number {
        if (!this.numFractionPartDigits()) {
            return 0;
        }
        const lastDigitIndex = this.numFractionPartDigits() - 1;
        return this.fractionPartDigits()[lastDigitIndex].position;
    }

    mostSignificantPosition(withExtension = true): number {
        if (withExtension) return this.integerPartDigits()[0].position;
        return this.integerPartDigits()[1].position;
    }

    numDigits(): number {
        return this.digits.length;
    }

    numFractionPartDigits(): number {
        return this.fractionPartDigits().length;
    }

    numIntegerPartDigits(): number {
        return this.integerPartDigits().length;
    }

    extensionStr(): string {
        const [complementExtensionDigit] = this.digits;
        return complementExtensionDigit.representationInBase;
    }

    toString(withExtension = true): string {
        if(!withExtension) return digitsToStr(this.digits.slice(1));
        return digitsToStr(this.digits);
    }

    toStringWithoutExcessZeros(): string {
        const stripped = trimLeadingZeros(this.digits);
        return digitsToStr(stripped);
    }
}
