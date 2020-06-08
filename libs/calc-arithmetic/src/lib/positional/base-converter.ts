import BigNumber from 'bignumber.js';
import {
    arbitraryFractionToDecimal,
    arbitraryIntegralToDecimal,
    decimalFractionToArbitrary,
    decimalIntegerToArbitrary,
    isFloatingPointStr,
    isValidString,
    splitToPartsArr
} from '../helpers/conversion-helpers';
import { ComplementConverter } from './complement-converter';
import { PositionalNumber } from './representations';

export enum ConversionType {
    DIRECT,
    INDIRECT
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

    get inputIntegralPartNumDigits(): number {
        const [inputStr, base] = this.stages[0].input;
        const integralPart = inputStr.split('.')[0];
        return  base >= 36 ? integralPart.split(' ').length : integralPart.length;
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

    constructor(input: [string, number], result: PositionalNumber) {
        this.input = input;
        this.result = result;
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
        if (isValidString(valueStr, inputBase)) {
            const conversion = new Conversion();
            let decimalValue = new BigNumber(0);

            if (isFloatingPointStr(valueStr)) {
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
                decimalValue = integerPart.plus(fractionalPart);
            } else {
                decimalValue = arbitraryIntegralToDecimal(valueStr, inputBase);
            }
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
            if (resultBase === 10) {
                return conversion;
            }
            conversion.concatConversion(
                this.fromNumber(inputInDecimal.decimalValue, resultBase)
            );
            return conversion;
        } else {
            throw new Error(
                `The string ${valueStr} does not match the input base ${inputBase}`
            );
        }
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

