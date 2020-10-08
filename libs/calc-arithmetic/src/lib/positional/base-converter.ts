import BigNumber from 'bignumber.js';
import {
    arbitraryFractionToDecimal,
    arbitraryIntegralToDecimal,
    decimalFractionToArbitrary,
    decimalIntegerToArbitrary,
    isFloatingPointStr,
    isValidString,
    splitToDigitsList,
    splitToPartsArr
} from '../helpers/conversion-helpers';
import { ComplementConverter } from './complement-converter';
import { PositionalNumber } from './representations';
import { Digit } from '../models';
import { AssociatedBaseConversionDetails } from '../..';

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

    get resultNumDigits(): number {
        return this.result.integerPart.length + this.result.fractionalPart.length;
    }

    get inputNumDigits(): number {
        const [inputStr, base] = this.stages[0].input;
        return  base >= 36 ? inputStr.split(' ').length : inputStr.length;
    }

    public addStage(stage: ConversionStage): void {
        this.stages.push(stage);
        this.assignConversionType();
    }

    public getStage(index: number): ConversionStage {
        return this.stages[index];
    }

    public getLastStage(): ConversionStage {
        return this.stages[this.stages.length -1];
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
    public fromNumber(
        num: number | BigNumber,
        resultBase: number,
        precision = 30
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
        const integerPartDigits = decimalIntegerToArbitrary(
            integerPart,
            resultBase
        );
        const fractionalPartDigits = decimalFractionToArbitrary(
            fractionalPart,
            resultBase,
            precision
        );
        const repStr =
            integerPartDigits[0].toString() + '.' + fractionalPartDigits[0];
        const complement = ComplementConverter.getComplement(
            sign + repStr,
            resultBase
        );
        const result = new PositionalNumber(
            integerPartDigits[0],
            fractionalPartDigits[0],
            resultBase,
            decimalValue,
            complement
        );
        const conversion = new Conversion();
        conversion.addStage(
            new ConversionToArbitrary(
                [num.toString(), 10],
                result,
                integerPartDigits[1],
                fractionalPartDigits[1]
            )
        );
        return conversion;
    }

    public fromString(
        valueStr: string,
        inputBase: number,
        resultBase: number,
        precision = 30
    ): Conversion {
        if (!isValidString(valueStr, inputBase)) {
            throw new Error(
                `The string ${valueStr} does not match the input base ${inputBase}`
            );
        }

        const conversion = new Conversion();
        const decimalValue = StandardBaseConverter.getDecimalValue(valueStr, inputBase);

        const complement = ComplementConverter.getComplement(
            decimalValue.toString(),
            resultBase
        );
        // Split into two str arrays - integral part digits arr and
        // fractional part digits arr
        const digits = splitToPartsArr(decimalValue);
        const inputInDecimal = new PositionalNumber(
            digits[0],
            digits[1],
            10,
            decimalValue,
            complement
        );

        conversion.addStage(
            new ConversionToDecimal([valueStr, inputBase], inputInDecimal)
        );
        conversion.concatConversion(
            this.fromNumber(inputInDecimal.decimalValue, resultBase)
        );
        return conversion;
    }

    public fromStringDirect(
        valueStr: string,
        inputBase: number,
    ): Conversion {
        if (!isValidString(valueStr, inputBase)) {
            throw new Error(
                `The string ${valueStr} does not match the input base ${inputBase}`
            );
        }
        const conversion = new Conversion();

        const digits = splitToPartsArr(valueStr, inputBase);
        const decimalValue = StandardBaseConverter.getDecimalValue(valueStr, inputBase);
        const complement = ComplementConverter.getComplement(valueStr, inputBase);

        const inputInDecimal = new PositionalNumber(
            digits[0],
            digits[1],
            inputBase,
            decimalValue,
            complement
        );

        conversion.addStage(
            new DirectConversion([valueStr, inputBase], inputInDecimal)
        );

        return conversion;
    }

    public fromDigitsDirect(
        digits: Digit[],
        isNegative? : boolean
    ): Conversion {
        const valueStr = digits.reduce((str, digit) => {
            return digit.position === -1
                ? str.concat(`.${digit.representationInBase}`)
                : str.concat(digit.representationInBase);
        }, isNegative ? '-' : '');

        const base = digits[0].base;

        return this.fromStringDirect(valueStr, base)
    }


    private static getDecimalValue(valueStr: string, inputBase: number): BigNumber {
        if (!isFloatingPointStr(valueStr)) {
            return arbitraryIntegralToDecimal(valueStr, inputBase);
        }

        const valueParts = valueStr.split('.');
        const integerPart = arbitraryIntegralToDecimal(
            valueParts[0],
            inputBase
        );
        let fractionalPart = arbitraryFractionToDecimal(
            valueParts[1],
            inputBase
        );

        // Make the fractionalPart negative if the integer part is also negative
        // This is needed when both parts are added together to create whole value
        if (integerPart.isNegative()) {
            fractionalPart = fractionalPart.negated();
        }

        return integerPart.plus(fractionalPart);
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
    const valueStrWithoutExtraSpaces =  valueStr.replace(/\s+/g, ' ').trim();
    return converter.fromString(valueStrWithoutExtraSpaces, inputBase, resultBase, precision);
}

export function fromStringDirect(
    valueStr: string,
    inputBase: number,
): Conversion {
    const converter = new StandardBaseConverter();
    const valueStrWithoutExtraSpaces =  valueStr.replace(/\s+/g, ' ').trim();
    return converter.fromStringDirect(valueStrWithoutExtraSpaces, inputBase);
}

export function fromDigits(
    digit: Digit[],
    isNegative? : boolean,
): Conversion {
    const converter = new StandardBaseConverter();
    return converter.fromDigitsDirect(digit, isNegative);
}


