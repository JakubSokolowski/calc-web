import BigNumber from 'bignumber.js';
import {
    arbitraryFractionToDecimal,
    arbitraryIntegralToDecimal,
    decimalFractionToArbitrary,
    decimalIntegerToArbitrary,
    digitsToStr,
    isFloatingPointStr,
    isValidRepresentationStr,
    serializeRepresentationStr,
    splitToDigitsList,
} from '../helpers/conversion-helpers';
import { PositionalNumber, PositionalSourceType } from './positional-number';
import { Digit } from '../models';
import { AssociatedBaseConversionDetails } from '../models/associated-base-conversion-details';
import { complementStrToBaseStr, getComplement, isValidComplementStr } from './complement-converter';

export enum ConversionType {
    DIRECT = 'direct',
    INDIRECT = 'indirect'
}

export class Conversion {
    public stages: ConversionStage[] = [];
    public type: ConversionType = ConversionType.DIRECT;

    get result(): PositionalNumber {
        return this.stages[this.stages.length - 1].result;
    }


    public addStage(stage: ConversionStage): void {
        this.stages.push(stage);
        this.assignConversionType();
    }

    public getStage(index: number): ConversionStage {
        return this.stages[index];
    }

    public getLastStage(): ConversionStage {
        return this.stages[this.stages.length - 1];
    }

    public getFirstStage(): ConversionStage {
        return this.stages[0];
    }

    public concatConversion(conversion: Conversion): void {
        this.stages = this.stages.concat(conversion.stages);
        this.assignConversionType();
    }

    private assignConversionType(): void {
        this.type =
            this.stages.length > 1
                ? ConversionType.INDIRECT
                : ConversionType.DIRECT;
    }
}

interface ConversionStage {
    input: [string, number];
    result: PositionalNumber;
}

export class ConversionToDecimal implements ConversionStage {
    public input: [string, number];
    public result: PositionalNumber;
    public inputDigitList: Digit[];

    constructor(input: [string, number], result: PositionalNumber) {
        this.input = input;
        this.result = result;
        this.inputDigitList = splitToDigitsList(input[0], input[1]);
    }
}

export class DirectConversion implements ConversionStage {
    public input: [string, number];
    public result: PositionalNumber;
    public digitList: Digit[];

    constructor(input: [string, number], result: PositionalNumber) {
        this.input = input;
        this.result = result;
        this.digitList = splitToDigitsList(input[0], input[1]);
    }
}

export class ConversionToArbitrary extends ConversionToDecimal {
    public integralDivisors: string[];
    public fractionalMultipliers: string[];

    constructor(
        input: [string, number],
        result: PositionalNumber,
        divisors: string[],
        multipliers: string[]
    ) {
        super(input, result);
        this.integralDivisors = divisors;
        this.fractionalMultipliers = multipliers;
    }
}

export class AssociatedBaseConversion implements ConversionStage {
    public input: [string, number];
    public result: PositionalNumber;
    public details: AssociatedBaseConversionDetails;

    constructor(input: [string, number], result: PositionalNumber, details: AssociatedBaseConversionDetails) {
        this.input = input;
        this.result = result;
        this.details = details;
    }
}

export interface BaseConverter {
    fromNumber(
        num: number | BigNumber,
        resultBase: number,
        precision?: number
    ): Conversion;

    fromString(
        valueStr: string,
        inputBase: number,
        resultBase: number,
        precision?: number
    ): Conversion;
}

export class StandardBaseConverter implements BaseConverter {
    private static getDecimalValue(valueStr: string, inputBase: number): BigNumber {
        if (!isFloatingPointStr(valueStr)) {
            return arbitraryIntegralToDecimal(valueStr, inputBase);
        }

        const [integerStr, fractionStr] = valueStr.split('.');

        const integerPart = arbitraryIntegralToDecimal(
            integerStr,
            inputBase
        );

        let fractionalPart = arbitraryFractionToDecimal(
            fractionStr,
            inputBase
        );

        // Make the fractionalPart negative if the integer part is also negative
        // This is needed when both parts are added together to create whole value
        if (integerPart.isNegative()) {
            fractionalPart = fractionalPart.negated();
        }

        return integerPart.plus(fractionalPart);
    }

    public fromNumber(
        num: number | BigNumber,
        resultBase: number,
        precision = 30,
    ): Conversion {
        let decimalValue: BigNumber = new BigNumber(0);
        if (typeof num === 'number') {
            decimalValue = new BigNumber(num);
        }
        if (num instanceof BigNumber) {
            decimalValue = num;
        }
        const sign = decimalValue.isNegative() ? '-' : '';
        const fractionalPart = decimalValue.mod(1);
        const integerPart = decimalValue.minus(fractionalPart);
        const [integerDigits, integerSteps] = decimalIntegerToArbitrary(
            integerPart,
            resultBase
        );
        const [fractionDigits, fractionSteps] = decimalFractionToArbitrary(
            fractionalPart,
            resultBase,
            precision
        );

        const allDigits = [...integerDigits, ...fractionDigits];
        const repStr = digitsToStr(allDigits);


        const complement = getComplement(sign + repStr, resultBase);

        const result = new PositionalNumber(
            allDigits,
            decimalValue,
            complement,
            PositionalSourceType.Number
        );
        const conversion = new Conversion();
        conversion.addStage(
            new ConversionToArbitrary(
                [num.toString(), 10],
                result,
                integerSteps,
                fractionSteps
            )
        );
        return conversion;
    }

    public fromString(
        inputStr: string,
        inputBase: number,
        resultBase: number,
        precision = 30
    ): Conversion {
        let valueStr = serializeRepresentationStr(inputStr);
        let inputSourceType = PositionalSourceType.RepresentationStr;

        if(isValidComplementStr(valueStr, inputBase)) {
            valueStr = complementStrToBaseStr(valueStr, inputBase);
            inputSourceType = PositionalSourceType.ComplementStr;
        } else {
            if (!isValidRepresentationStr(valueStr, inputBase)) {
                throw new Error(
                    `The string ${valueStr} does not match the input base ${inputBase}`
                );
            }
        }

        const conversion = new Conversion();
        const decimalValue = StandardBaseConverter.getDecimalValue(valueStr, inputBase);
        const complement = getComplement(valueStr, inputBase);

        // Split into two str arrays - integral part digits arr and
        // fractional part digits arr
        const digits = splitToDigitsList(decimalValue, 10);
        const inputInDecimal = new PositionalNumber(
            digits,
            decimalValue,
            complement,
            inputSourceType
        );

        conversion.addStage(new ConversionToDecimal([valueStr, inputBase], inputInDecimal));

        const toTargetBase = this.fromNumber(inputInDecimal.decimalValue, resultBase, precision);
        toTargetBase.result.sourceType = inputSourceType;
        conversion.concatConversion(toTargetBase);

        return conversion;
    }

    public fromStringDirect(
        inputStr: string,
        inputBase: number
    ): Conversion {
        let valueStr = serializeRepresentationStr(inputStr);
        let inputType = PositionalSourceType.RepresentationStr;

        if(isValidComplementStr(valueStr, inputBase)) {
            valueStr = complementStrToBaseStr(valueStr, inputBase);
            inputType = PositionalSourceType.ComplementStr;
        } else {
            if (!isValidRepresentationStr(valueStr, inputBase)) {
                throw new Error(
                    `The string ${valueStr} does not match the input base ${inputBase}`
                );
            }
        }

        const conversion = new Conversion();

        const digits = splitToDigitsList(valueStr, inputBase);
        const decimalValue = StandardBaseConverter.getDecimalValue(valueStr, inputBase);
        const complement = getComplement(valueStr, inputBase);

        const inputInDecimal = new PositionalNumber(
            digits,
            decimalValue,
            complement,
            inputType
        );

        conversion.addStage(
            new DirectConversion([valueStr, inputBase], inputInDecimal)
        );

        return conversion;
    }

    public fromDigitsDirect(
        digits: Digit[],
        isNegative?: boolean
    ): Conversion {
        const sign = isNegative ? '-' : '';
        const valueStr = `${sign}${digitsToStr(digits)}`;

        const base = digits[0].base;

        return this.fromStringDirect(valueStr, base);
    }
}

export function fromNumber(
    num: number | BigNumber,
    resultBase: number,
    precision = 30,
    converter: BaseConverter = new StandardBaseConverter()
): Conversion {
    return converter.fromNumber(num, resultBase, precision);
}

export function fromString(
    valueStr: string,
    inputBase: number,
    resultBase: number,
    precision = 30,
    converter: BaseConverter = new StandardBaseConverter()
): Conversion {
    return converter.fromString(valueStr, inputBase, resultBase, precision);
}

export function fromStringDirect(
    valueStr: string,
    inputBase: number
): Conversion {
    const converter = new StandardBaseConverter();
    return converter.fromStringDirect(valueStr, inputBase);
}

export function fromDigits(
    digits: Digit[],
    isNegative?: boolean
): Conversion {
    const converter = new StandardBaseConverter();
    return converter.fromDigitsDirect(digits, isNegative);
}


