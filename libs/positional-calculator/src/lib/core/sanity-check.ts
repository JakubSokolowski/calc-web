import { calculate, OperationParams } from './calculate';
import {
    AlgorithmType,
    fromNumber,
    getRandomInt,
    OperationType,
    PositionalNumber,
    randomOperands
} from '@calc/calc-arithmetic';
import BigNumber from 'bignumber.js';
import { nNext } from '@calc/utils';

export interface SanityCheck {
    params: OperationParams;
    actual: PositionalNumber;
    expectedDecimal: number | BigNumber;
    expectedInBase: string;
    failed: boolean;
}


function randomParams(operation: OperationType, algorithm: AlgorithmType, base: number): OperationParams {
    return {
        operation,
        algorithm,
        base,
        operands: getValidRandomOperands(operation, algorithm, base)
    }
}

function getValidRandomOperands(operation: OperationType, algorithm: AlgorithmType, base: number): PositionalNumber[] {
    const operands = randomOperands(base, 2, 5);
    if(areOperandsValid(operands, operation)) return operands;
    return getValidRandomOperands(operation, algorithm, base);
}

function areOperandsValid(operands: PositionalNumber[], operation: OperationType): boolean {
    switch(operation) {
        case OperationType.Addition:
        case OperationType.Subtraction:
        case OperationType.Multiplication:
            return true;
        case OperationType.Division: {
            const [, divisor] = operands;
            return divisor.toNumber() !== 0;
        }
    }
}

export function kaosMonke(operation: OperationType, algorithm: AlgorithmType, reps = 10, base?: number): OperationParams<string>[] {
    if(!base) {
        base = getRandomInt(2, 16);
    }
    const failed: OperationParams<string>[] = [];
    nNext(0, reps).forEach(() => {
        const params = randomParams(operation, algorithm, base);
        try {
            const result = calculate(params);
            const check = sanityCheck(params, result.result);
            if(check.failed) {
                const strOpParams: OperationParams<string> = {
                    ...params,
                    operands: [...params.operands.map((p) => p.toString())]
                };
                failed.push(strOpParams);
                logParamsUrl(strOpParams);
            }
        } catch (err) {
            const strOpParams: OperationParams<string> = {
                ...params,
                operands: [...params.operands.map((p) => p.toString())]
            };
            failed.push(strOpParams);
            logParamsUrl(strOpParams);
        }
    });
    return failed;
}


function opParamsToUrlParams(params: OperationParams<string>): string {
    const { algorithm, operation, operands, base, precision } = params;
    const operandsStr = operands.map(op => `op=${op}`).join('&');
    const precisionStr = operation === OperationType.Division ? `&precision=${precision}` : '';

    return `?operation=${operation.toLowerCase()}`
        + `&algorithm=${algorithm.toLowerCase()}`
        + `&base=${base}`
        + `&${operandsStr}`
        + precisionStr;
}


function logParamsUrl(params: OperationParams<string>) {
    const searchParams = opParamsToUrlParams(params);
    const localhostUrl = `http://localhost:4200/#/tools/positional/positional-calculator${searchParams}`;
    const prodUrl = `https://jakubsokolowski.github.io/calc-web/#/tools/positional/positional-calculator${searchParams}`;
    const msg = `Local: ${localhostUrl}\nProd: ${prodUrl}`;
    console.log(msg);
}


export function serializeForSentry(check: SanityCheck): Record<string, unknown> {
    return {
       extra: {
           actualInBase: check.actual.toString(),
           actualInDecimal: check.actual.decimalValue.toString(),
           expectedInDecimal: check.expectedDecimal,
           expectedInBase: fromNumber(check.expectedDecimal, check.params.base).toString(),
           operation: check.params.operation,
           algorithm: check.params.algorithm,
           base: check.params.base,
           operands: check.params.operands.map(op => op.toString())
       }
    }
}

export function sanityCheck(params: OperationParams, actual: PositionalNumber): SanityCheck {
    const expectedDecimal = getExpected(params).check();
    const expectedInBase = fromNumber(expectedDecimal, params.base).toString();
    const precision = 2;
    const fixedExpected = expectedDecimal.toFixed(precision);
    const fixedActual = actual.decimalValue.toFixed(precision);
    const differenceToBig = expectedDecimal.minus(actual.decimalValue).abs().isGreaterThan(0.1);
    const fixedDecimalDifferent = !(fixedExpected === fixedActual);

    let failed = fixedDecimalDifferent && differenceToBig;
    if(failed && params.base !== 10) {
        // different decimal value is to be expected for different bases
        // for example, binary division 10101/11.11 to precision 5
        // will result in  1011.00110 which is 11.1875 in decimal
        // sanity check on decimal value (42/3.75) will result in
        // 11.2 ( 1011.0011001100110011001100110011 in binary)
        // When decimal check fails, check if expected str starts with
        // actual (the expected decimal result would be reached for
        // higher precision)
        const actualStr = actual.toString();
        failed = !expectedInBase.startsWith(actualStr);
    }

    return { params, actual, expectedDecimal, failed, expectedInBase }
}

function getExpected(params: OperationParams): OperationCheck {
    switch (params.operation) {
        case OperationType.Addition:
            return new AdditionCheck(params.operands);
        case OperationType.Subtraction:
            return new SubtractionCheck(params.operands);
        case OperationType.Multiplication:
            return new MultiplicationCheck(params.operands);
        case OperationType.Division:
            return new DivisionCheck(params.operands);
        default:
            throw Error(`Sanity check for ${params.operation} not implemented`);
    }
}


class OperationCheck {
    protected operands: PositionalNumber[];

    constructor(operands: PositionalNumber[]) {
        this.operands = operands;
    }

    check(): BigNumber {
        return new BigNumber(0)
    }
}

class AdditionCheck extends OperationCheck {
    check(): BigNumber {
        return this.operands.reduce((sum, op) => {
            return sum.plus(op.decimalValue);
        }, new BigNumber(0))
    }
}

class SubtractionCheck extends OperationCheck {
    check(): BigNumber {
        const [minuend, ...subtrahends] = this.operands;

        return subtrahends.reduce((sum, op) => {
            return sum.minus(op.decimalValue);
        }, minuend.decimalValue)
    }
}

class MultiplicationCheck extends OperationCheck {
    check(): BigNumber {
        const [multiplicand, multiplier] = this.operands;
        return multiplicand.decimalValue.multipliedBy(multiplier.decimalValue);
    }
}

class DivisionCheck extends OperationCheck {
    check(): BigNumber {
        const [dividend, divisor] = this.operands;
        return dividend.decimalValue.dividedBy(divisor.decimalValue);
    }
}





