import BigNumber from 'bignumber.js';
import { Digit } from '../models';
import { NumberComplement } from './number-complement';

export enum PositionalSourceType {
    Number= 'number',
    RepresentationStr = 'representationStr',
    ComplementStr = 'complementStr'
}

export class PositionalNumber extends NumberComplement {
    public complement: NumberComplement;
    public decimalValue: BigNumber;
    public source: PositionalSourceType;

    constructor(
        digits: Digit[],
        decimalValue: BigNumber,
        complement: NumberComplement,
        inputType: PositionalSourceType
    ) {
        super(digits);
        this.decimalValue = decimalValue;
        this.complement = complement;
        this.source = inputType;
    }

    get valueInBase(): string {
        return this.toString();
    }

    public get sourceType(): PositionalSourceType {
        return this.source;
    }

    public set sourceType(input: PositionalSourceType) {
        this.source = input;
    }

    public get sign(): string {
        return this.decimalValue.isNegative() ? '-' : '';
    }

    public toDigitsList(): Digit[] {
        return this.asDigits();
    }

    public toNumber(): number {
        return this.decimalValue.toNumber();
    }

    isNegative(): boolean {
        return this.decimalValue.isNegative();
    }

    toString(): string {
        return `${this.sign}${super.toString()}`;
    }
}
