import { BaseDigits } from './base-digits';
import { Digit } from '../models';
import { nNext, nPrev } from '@calc/utils';
import { trimExcessZeros } from './digits';
import { PositionalNumber } from './positional-number';
import { fromStringDirect } from './base-converter';
import { digitsToStr } from '../helpers/conversion-helpers';


export function randomOperands(base: number, numOperands: number, maxNumPartDigits: number): PositionalNumber[] {
    return nNext(0, numOperands).map(() => randomOperand(base, maxNumPartDigits))
}

function randomDigit(base: number, position = 0): Digit {
    const value = getRandomInt(0, base -1);
    return BaseDigits.getDigit(value, base, position)
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRepresentationStr(base: number, startPosition: number, length: number): string {
    const digits = nPrev(startPosition, length).map((pos) => randomDigit(base, pos));
    return digitsToStr(trimExcessZeros(digits))
}

function randomOperand(base: number, maxNumPartDigits: number): PositionalNumber {
    const startPosition = getRandomInt(1, maxNumPartDigits);
    const fractionLength = getRandomInt(1, maxNumPartDigits);
    const length = startPosition + fractionLength;
    const representation = randomRepresentationStr(base, startPosition, length);
    return fromStringDirect(representation, base);
}
