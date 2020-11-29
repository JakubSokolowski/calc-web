import {
    AssociatedBaseConversion,
    Conversion,
    fromDigits,
    fromNumber,
    fromStringDirect
} from './base-converter';
import { chunks, chunksFromEnd, logBase, trimEndByPredicate, trimStartByPredicate } from '@calc/utils';
import { Digit } from '../models';
import { BaseDigits } from './base-digits';
import { DigitMapping } from '../models/digit-mapping';
import { AssociatedBaseConversionDetails } from '../models/associated-base-conversion-details';

export function convertUsingAssociatedBases(
    valueStr: string,
    inputBase: number,
    resultBase: number
): Conversion {
    if (!BaseDigits.canConvertUsingAssociateBaseMethod(inputBase, resultBase)) {
        throw new Error(
            `Cannot convert from base ${inputBase} to ${resultBase}
             using associate base methods. Possible output bases are
             ${BaseDigits.getAllPossibleBasesForAssociateConversion(inputBase)}`
        );
    }

    const inputNum = fromStringDirect(valueStr, inputBase).result;
    const digits = inputNum.toDigitsList();

    const details = mapToAssociatedBaseDigits(digits, resultBase);
    const num = fromDigits(details.resultDigits, inputNum.isNegative).result;
    const conv = new Conversion();

    conv.addStage(
        new AssociatedBaseConversion(
            [valueStr, inputBase],
            num,
            details
        )
    );

    return conv;
}

export function mapToAssociatedBaseDigits(digits: Digit[], outputBase: number): AssociatedBaseConversionDetails {
    const inputBase = digits[0].base;

    if (inputBase > outputBase) {
        const mappings = digits.map((digit) => splitToSmallerBaseDigits(digit, outputBase));
        const strippedMappings = stripRedundantZeroDigits(mappings);
        return {
            positionMappings: strippedMappings,
            resultDigits: strippedMappings.reduce((arr, mapping) => {
                return [...arr, ...mapping.output];
            }, [])
        };
    } else {
        const integerPart = digits.filter((digit) => digit.position >= 0);
        const fractionalPart = digits.filter((digit) => digit.position < 0);
        const numDigitsPerPosition = Math.round(logBase(outputBase, inputBase));

        const reducedIntegerPart: DigitMapping[] = chunksFromEnd(integerPart, numDigitsPerPosition)
            .map((chunk) => reduceToGreaterBaseDigit(chunk, outputBase));

        const reducedFractionalPart = chunks(fractionalPart, numDigitsPerPosition)
            .map((chunk) => reduceToGreaterBaseDigit(chunk, outputBase));

        const mappings = [...reducedIntegerPart, ...reducedFractionalPart];
        const strippedMappings = stripRedundantZeroDigits(mappings);

        return {
            positionMappings: strippedMappings,
            resultDigits: strippedMappings.reduce((arr, mapping) => {
                return [...arr, ...mapping.output];
            }, [])
        };
    }
}

export function splitToSmallerBaseDigits(digit: Digit, outputBase: number): DigitMapping {
    const { valueInDecimal, base, position } = digit;
    const numDigitsPerPosition = Math.round(logBase(base, outputBase));

    const meaningfulDigits = fromNumber(valueInDecimal, outputBase)
        .result
        .toDigitsList()
        .map((digit) => {
            return ({ ...digit, position: 0 });
        });

    const numOfZeroDigitsMissing = numDigitsPerPosition - meaningfulDigits.length;

    const missingZeroDigits: Digit[] = [...Array(numOfZeroDigitsMissing)].map(() => {
        return {
            base: outputBase,
            position: 0,
            valueInDecimal: 0,
            representationInBase: BaseDigits.getDigit(0, outputBase)
        };
    });

    const output: Digit[] = [...missingZeroDigits, ...meaningfulDigits].map((digit, positionInChunk) => {
        return {
            ...digit,
            position: getSmallerDigitsPositionInChunk(
                numDigitsPerPosition,
                position,
                positionInChunk
            )
        };
    });

    return {
        input: [digit],
        output
    };
}

function getSmallerDigitsPositionInChunk(numDigitsPerPosition: number, greaterDigitPosition: number, relativePositionInChunk: number) {
    return (greaterDigitPosition + 1) * numDigitsPerPosition - (relativePositionInChunk + 1);
}

function stripRedundantZeroDigits(mappings: DigitMapping[]): DigitMapping[] {
    const result = [...mappings];
    const lastMappingIndex = mappings.length -1;
    result[0] = removeZeroDigitsFromFirstMapping(result[0]);
    result[lastMappingIndex] = removeZeroDigitsFromLastMapping(result[lastMappingIndex]);

    return result;
}

function isZeroDigit(digit: Digit): boolean {
    return digit.valueInDecimal === 0;
}

function removeZeroDigitsFromFirstMapping(mapping: DigitMapping): DigitMapping {
    const { output, input } = mapping;
    const areAllMappingDigitZeros = output.every(isZeroDigit);

    return {
        input,
        output: areAllMappingDigitZeros
            ? output.slice(0, 1)
            : trimStartByPredicate(output, isZeroDigit)
    }
}

function removeZeroDigitsFromLastMapping(mapping: DigitMapping): DigitMapping {
    const { output, input } = mapping;
    return {
        input,
        output: trimEndByPredicate(output, isZeroDigit)
    }
}

export function reduceToGreaterBaseDigit(digits: Digit[], outputBase: number): DigitMapping {
    const inputBase = digits[0].base;
    const numDigitsPerPosition = Math.round(logBase(outputBase, inputBase));
    const resultPosition = (digits[digits.length - 1].position) / numDigitsPerPosition;

    const digitsWithNormalizedPositions = digits.map((digit, position) => ({ ...digit, position }));

    const combinedDigitValue = fromDigits(digitsWithNormalizedPositions)
        .result
        .decimalValue
        .toNumber();

    const digitInOutputBase = BaseDigits.getDigit(combinedDigitValue, outputBase);

    return {
        input: digits,
        output: [
            {
                representationInBase: digitInOutputBase,
                base: outputBase,
                valueInDecimal: combinedDigitValue,
                position: resultPosition
            }
        ]
    };
}
