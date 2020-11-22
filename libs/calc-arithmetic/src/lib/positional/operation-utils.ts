import { AdditionOperand, Digit } from '@calc/calc-arithmetic';
import { mergeExtensionDigits } from './complement-extension';
import { SubtractionOperand, SubtractionPositionResult } from '../models';

export const NUM_ADDITIONAL_EXTENSIONS = 3;

export function findPositionRange(allDigits: Digit[][]): { mostSignificantPosition: number; leastSignificantPosition: number } {
    const allMostSignificant = allDigits.map((digits) => digits[0].position);
    const allLeastSignificant = allDigits.map((digits) => digits[digits.length - 1].position);

    return {
        mostSignificantPosition: Math.max(...allMostSignificant),
        leastSignificantPosition: Math.min(...allLeastSignificant)
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

function generateComplementExtension(digit: AdditionOperand, numExtensions: number): AdditionOperand[] {
    return new Array<AdditionOperand>(numExtensions)
        .fill({ ...digit })
        .map((digit, index) => ({ ...digit, position: digit.position + index + 1 }))
        .reverse();
}

export function extractResultDigitsFromSubtraction(positionResults: SubtractionPositionResult[]): SubtractionOperand[] {
    const digitsFromPositions = positionResults.map((res) => res.valueAtPosition);
    const withExtension = [...digitsFromPositions.reverse()];
    return mergeExtensionDigits(withExtension);
}
