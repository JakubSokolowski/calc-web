import { AdditionOperand, Digit } from '../models';
import { SubtractionOperand, SubtractionPositionResult } from '../models';
import {
    mergeComplementExtensionForSubtraction,
} from './complement-extension';
import { trimLeadingZeros } from './digits';

export const NUM_ADDITIONAL_EXTENSIONS = 3;

export function findPositionRange(allDigits: Digit[][]): { msp: number; lsp: number } {
    const allMostSignificant = allDigits.map((digits) => digits[0].position);
    const allLeastSignificant = allDigits.map((digits) => digits[digits.length - 1].position);

    return {
        msp: Math.max(...allMostSignificant),
        lsp: Math.min(...allLeastSignificant)
    };
}

export function buildLookup<T extends Digit>(digits: T[][], globalMostSignificantPosition: number): Record<number, T>[] {
    return digits.map((numberDigits) => toPositionDigitMap(numberDigits, globalMostSignificantPosition));
}

export function toPositionDigitMap<T extends Digit>(digits: T[], globalMostSignificantPosition: number): Record<number, T> {
    const mostSignificantDigit = digits[0];
    const numExtensions = getNumOfComplementExtensions(mostSignificantDigit, globalMostSignificantPosition);
    const extensions = generateComplementExtension(mostSignificantDigit, numExtensions);
    const digitsToMap = [...extensions, ...digits];

    return digitsToMap.reduce((digitMap, digit) => {
        digitMap[digit.position] = digit;
        return digitMap;
    }, {});
}

function getNumOfComplementExtensions(digit: AdditionOperand, mostSignificantPosition: number): number {
    const numMandatoryComplementExtensions = mostSignificantPosition - digit.position;

    return NUM_ADDITIONAL_EXTENSIONS + numMandatoryComplementExtensions;
}

export function generateComplementExtension<T extends Digit>(digit: T, numExtensions: number): T[] {
    return new Array<T>(numExtensions)
        .fill({ ...digit })
        .map((digit, index) => ({ ...digit, position: digit.position + index + 1 }))
        .reverse();
}

export function extractResultDigitsFromSubtraction(positionResults: SubtractionPositionResult[], operands: SubtractionOperand[][]): SubtractionOperand[] {
    const digitsFromPositions = positionResults.map((res) => res.valueAtPosition);
    const withExtension = [...digitsFromPositions.reverse()];
    const {msp} = findPositionRange(operands);
    const merged = mergeComplementExtensionForSubtraction(withExtension, positionResults, msp);
    return trimLeadingZeros(merged);
}
