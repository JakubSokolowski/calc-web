import { Digit } from '../models';
import { BaseDigits } from './base-digits';
import { inRangeInclusive, nNext, nPrev, trimEndByPredicate, trimStartByPredicate } from '@calc/utils';

export function padWithZeroDigits<T extends Digit>(digits: T[], base: number, desiredLength: number, direction: 'Left' | 'Right'): T[] {
    if (digits.length >= desiredLength) return [...digits];

    const missingDigitsCount = desiredLength - digits.length;

    const zeroDigit = {
        base,
        representationInBase: BaseDigits.getRepresentation(0, base),
        valueInDecimal: 0,
        position: -1
    } as T;

    if (direction === 'Left') {
        const positionStart = digits[0]?.position || 0;
        const positionsDescending = nNext(positionStart, missingDigitsCount).reverse();
        const missingDigits: T[] = positionsDescending.map((position) => {
            return {
                ...zeroDigit,
                position: position
            };
        });

        return [...missingDigits, ...digits];
    } else {
        const positionStart = digits[digits.length - 1]?.position || 0;
        const positionsDescending = nPrev(positionStart, missingDigitsCount);
        const missingDigits: T[] = positionsDescending.map((position) => {
            return {
                ...zeroDigit,
                position: position
            };
        });


        return [...digits, ...missingDigits];
    }
}

// TODO: Fix shifting for complements
export function shiftLeft<T extends Digit>(digits: T[], numPositions: number): T[] {
    if (numPositions < 1) return digits;
    const base = digits[0].base;
    const desiredWidth = digits.length + numPositions;
    const shiftedDigits = applyPositionShift(digits, numPositions);
    return padWithZeroDigits(shiftedDigits, base, desiredWidth, 'Right');
}

export function shiftRight<T extends Digit>(digits: T[], numPositions: number): T[] {
    if (numPositions < 1) return digits;
    const shiftedDigits = applyPositionShift(digits, -numPositions);
    return extendDigitsToFractionPoint(shiftedDigits);
}

export function alignFractions<T extends Digit>(operands: T[][]): T[][] {
    const lsp = globalLeastSignificantPosition(operands);
    return operands.map(d => extendFractionToPosition(d, lsp));
}

function globalLeastSignificantPosition<T extends Digit>(operands: T[][]): number {
    return operands.reduce((lsp, opDigits) => {
        const localLsp = leastSignificantPosition(opDigits);
        return localLsp < lsp ? localLsp : lsp;
    }, 0);
}


export function mostSignificantPosition<T extends Digit>(digits: T[]): number {
    return digits[0].position;
}

export function leastSignificantPosition<T extends Digit>(digit: T[]): number {
    return digit[digit.length - 1].position;
}

export function extendFractionToPosition<T extends Digit>(digits: T[], position: number): T[] {
    const base = digits[0].base;
    const [integerPart, fractionPart] = splitAtZeroPosition(digits);
    const lsp = fractionPart.length ? fractionPart[fractionPart.length - 1].position : 0;
    if (lsp <= position) return [...digits];

    const positionDifference = Math.abs(position - lsp);
    const desiredWidth = fractionPart.length + positionDifference;

    return [...integerPart, ...padWithZeroDigits(fractionPart, base, desiredWidth, 'Right')];
}

export function splitAtZeroPosition<T extends Digit>(digits: T[]): [T[], T[]] {
    const indexOfZeroPositionDigit = digits.findIndex((digit) => digit.position === 0);
    if (indexOfZeroPositionDigit === -1) return [digits, []];

    const integerPartDigits = digits.slice(0, indexOfZeroPositionDigit + 1);
    const fractionalPartDigits = digits.slice(indexOfZeroPositionDigit + 1);

    return [integerPartDigits, fractionalPartDigits];
}

export function strArrayToDigits(strDigits: string[], base: number, positionStart: number): Digit[] {
    return strDigits.map((d, i) => {
        return {
            representationInBase: d,
            valueInDecimal: BaseDigits.getValue(d, base),
            position: positionStart - i,
            base
        };
    });
}

export function trimLeadingZeros<T extends Digit>(digits: T[]) {
    const onlyZeros = digits.every(isZeroDigit);
    return onlyZeros
        ? digits
        : trimStartByPredicate(
            digits,
            isZeroDigitOnGreaterThanZeroPosition
        );
}

function isZeroDigitOnGreaterThanZeroPosition(digit: Digit): boolean {
    return digit.position > 0 && isZeroDigit(digit);
}

export function isZeroDigit<T extends Digit>(digit: T): boolean{
    return digit.valueInDecimal === 0;
}

export function isZeroFractionDigit<T extends Digit>(digit: T): boolean {
    return isZeroDigit(digit) && digit.position < 0;
}

export function trimExcessZeros<T extends Digit>(digits: T[]): T[] {
    const trimmedLeading = trimLeadingZeros(digits);
    return trimEndByPredicate(trimmedLeading, isZeroFractionDigit);
}

export function positionRangeSlice<T extends Digit>(digits: T[], from: number, to: number): T[] {
    return digits.filter(d => inRangeInclusive(d.position, from, to))
}

function extendDigitsToFractionPoint<T extends Digit>(digits: T[]): T[] {
    if (!digits.length) return [];

    const mostSignificantPosition = digits[0].position;
    if (mostSignificantPosition > -1) return digits;

    const numMissing = Math.abs(mostSignificantPosition);
    const base = digits[0].base;

    const zeros: T[] = [...Array(numMissing)].map((_, index) => {
        return {
            base,
            representationInBase: BaseDigits.getRepresentation(0, base),
            valueInDecimal: 0,
            position: 0 - index
        } as T;
    });

    if (digits[0].isComplementExtension) {
        digits[0] = removeComplementStatus(digits[0]);
        zeros[0] = assignComplementStatus(zeros[0]);
    }

    return [...zeros, ...digits];
}

function removeComplementStatus<T extends Digit>(digit: T): T {
    if (!digit.isComplementExtension) return digit;
    const { representationInBase } = digit;
    const withoutParenthesis = representationInBase.substring(1, representationInBase.length - 1);
    return {
        ...digit,
        isComplementExtension: undefined,
        representationInBase: withoutParenthesis
    };
}

function assignComplementStatus<T extends Digit>(digit: T): T {
    if (digit.isComplementExtension) return digit;
    const { representationInBase } = digit;
    const withParenthesis = `(${representationInBase})`;
    return {
        ...digit,
        isComplementExtension: true,
        representationInBase: withParenthesis
    };
}

function applyPositionShift<T extends Digit>(digits: T[], shift: number): T[] {
    return digits.map((digit) => ({
        ...digit,
        position: digit.position + shift
    }));
}

