import { Digit } from '../models';
import { BaseDigits } from './base-digits';
import { nNext, nPrev } from '@calc/utils';

export function padWithZeroDigits<T extends Digit>(digits: T[], base: number, desiredLength: number, direction: 'Left' | 'Right'): T[] {
    if (digits.length >= desiredLength) return [...digits];

    const missingDigitsCount = desiredLength - digits.length;

    const zeroDigit = {
        base,
        representationInBase: BaseDigits.getDigit(0, base),
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
    const lsp = leastSignificantPosition(operands);
    return operands.map(d => extendFractionToPosition(d, lsp));
}

function leastSignificantPosition<T extends Digit>(operands: T[][]): number {
    return operands.reduce((lsp, opDigits) => {
        const localLsp = opDigits[opDigits.length - 1].position;
        return localLsp < lsp ? localLsp : lsp;
    }, 0);
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


function extendDigitsToFractionPoint<T extends Digit>(digits: T[]): T[] {
    if (!digits.length) return [];

    const mostSignificantPosition = digits[0].position;
    if (mostSignificantPosition > -1) return digits;

    const numMissing = Math.abs(mostSignificantPosition);
    const base = digits[0].base;

    const zeros: T[] = [...Array(numMissing)].map((_, index) => {
        return {
            base,
            representationInBase: BaseDigits.getDigit(0, base),
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
