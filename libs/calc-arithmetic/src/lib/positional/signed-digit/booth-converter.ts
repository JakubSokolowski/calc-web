import { walkOverlaping } from '@calc/utils';
import {
    SDConversionGroupResult,
    SDConversionResult,
    SignedDigitConversionType,
    SignedDigitConverter
} from './signed-digit-converter';
import { flatten } from 'lodash';
import { Digit } from '../../models';
import { BaseDigits } from '../base-digits';

export class BoothConverter implements SignedDigitConverter {
    protected readonly groupSize = 2;
    protected readonly overlapSize = 1;
    private readonly digits: Digit[];

    constructor(digits: Digit[]) {
        this.digits = digits;
    }

    protected get conversionType(): SignedDigitConversionType {
        return SignedDigitConversionType.Booth;
    }

    toSignedDigits(): Digit[] {
        return this.toSignedDigitsWithDetails().output;
    }

    toSignedDigitsWithDetails(): SDConversionResult {
        const groups = this.reduceToSDDigits();
        const output: Digit[] = flatten(groups.map(g => g.output));

        return {
            groups,
            output,
            input: this.digits,
            type: this.conversionType
        };
    }

    protected extend(): Digit[] {
        const lastPosition = this.digits[this.digits.length - 1].position;
        const extension = BaseDigits.getDigit(0, 2, lastPosition - 1);
        return [...this.digits, extension];
    }

    protected reduceToSDDigits(): SDConversionGroupResult[] {
        const result: SDConversionGroupResult[] = [];
        const callback = (group: Digit[]) => result.push(this.createSdDigit(group));
        const extendedPositionAscending = this.extend().reverse();
        walkOverlaping(extendedPositionAscending, this.groupSize, this.overlapSize, callback);
        return [...result].reverse();
    }

    protected createSdDigit(input: Digit[]): SDConversionGroupResult {
        // groups wil always be position ascending
        // so ex. group[0] = -1, group[1] = 0
        // For Booth algorithm, position i is generated as follows
        // x(i) = x(i-1) - x(i)
        // |value| =  prev  -  curr
        const [prev, curr] = input;
        const value = prev.valueInDecimal - curr.valueInDecimal;
        const output: Digit[] = [
            {
                base: 2,
                valueInDecimal: value,
                representationInBase: value.toString(),
                position: curr.position
            }
        ];

        return { input, output };
    }
}
