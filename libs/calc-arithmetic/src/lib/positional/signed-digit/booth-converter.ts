import { walkOverlaping } from '@calc/utils';
import {
    SDConversionGroupResult,
    SDConversionResult,
    SDGroupDigit,
    SignedDigitConversionType,
    SignedDigitConverter,
} from './signed-digit-converter';
import { flatten } from 'lodash';
import { BaseDigits } from '../base-digits';
import { positionRangeSlice } from '../digits';
import { findPositionRange } from '../operation-utils';

export class BoothConverter implements SignedDigitConverter {
    protected readonly digits: SDGroupDigit[];
    protected readonly isNegative: boolean;

    constructor(digits: SDGroupDigit[], negative = false) {
        this.digits = digits;
        this.isNegative = negative;
    }

    protected get conversionType(): SignedDigitConversionType {
        return SignedDigitConversionType.Booth;
    }

    protected get groupSize(): number {
        return 2;
    }

    protected get overlapSize(): number {
        return 1;
    }

    toSignedDigits(): SDGroupDigit[] {
        return this.toSignedDigitsWithDetails().output;
    }

    toSignedDigitsWithDetails(): SDConversionResult {
        const groups = this.reduceToSDDigits();
        const output = this.extractOutputFromGroups(groups);

        return {
            groups,
            output,
            input: this.digits,
            type: this.conversionType,
        };
    }

    private extractOutputFromGroups(groups: SDConversionGroupResult[]): SDGroupDigit[] {
        const output: SDGroupDigit[] = flatten(groups.map((g) => g.output));
        const { lsp, msp } = findPositionRange([this.digits]);
        return positionRangeSlice(output, lsp, msp);
    }

    protected extend(digits: SDGroupDigit[]): SDGroupDigit[] {
        const lastPosition = digits[digits.length - 1].position;
        const extension: SDGroupDigit = {
            isPaddingDigit: true,
            ...BaseDigits.getDigit(0, 2, lastPosition - 1),
        };
        return [...digits, extension];
    }

    protected splitToGroups(digits: SDGroupDigit[]): SDGroupDigit[][] {
        const groups: SDGroupDigit[][] = [];
        walkOverlaping(digits, this.groupSize, this.overlapSize, (group) => groups.push(group));
        return groups;
    }

    protected reduceToSDDigits(): SDConversionGroupResult[] {
        const extended = this.extend(this.digits);
        const groups = this.splitToGroups(extended);

        return groups.map((group) => {
            return this.createSdDigit(group);
        });
    }

    protected createSdDigit(input: SDGroupDigit[]): SDConversionGroupResult {
        // groups wil always be position ascending
        // so ex. group[0] = -1, group[1] = 0
        // For Booth algorithm, position i is generated as follows
        // x(i) = x(i-1) - x(i)
        // |value| =  prev  -  curr
        const [x1, x0] = input;
        const value = x0.valueInDecimal - x1.valueInDecimal;
        const output: SDGroupDigit[] = [
            {
                base: 2,
                valueInDecimal: value,
                representationInBase: value.toString(),
                position: x1.position,
            },
        ];

        return { input, output };
    }
}
