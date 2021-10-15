import { OperationParams } from './calculate';
import { AlgorithmType, fromNumber, OperationType, PositionalNumber } from '@calc/calc-arithmetic';
import BigNumber from 'bignumber.js';

export interface SanityCheck<T extends AlgorithmType> {
    params: OperationParams<T>;
    actual: PositionalNumber;
    expectedDecimal: number | BigNumber;
    expectedInBase: string;
    failed: boolean;
}

export function serializeForSentry<T extends AlgorithmType>(check: SanityCheck<T>): Record<string, unknown> {
    return {
       extra: {
           actualInBase: check.actual.toString(),
           actualInDecimal: check.actual.decimalValue.toString(),
           expectedInDecimal: check.expectedDecimal,
           expectedInBase: fromNumber(check.expectedDecimal, check.params.base).result.toString(),
           operation: check.params.operation.type,
           algorithm: check.params.algorithm.type,
           base: check.params.base,
           operands: check.params.operands.map(op => op.toString())
       }
    }
}

export function sanityCheck<T extends AlgorithmType>(params: OperationParams<T>, actual: PositionalNumber): SanityCheck<T> {
    const expectedDecimal = getExpected(params).check();
    const expectedInBase = fromNumber(expectedDecimal, params.base).result.toString();
    const precision = 2;
    const fixedExpected = expectedDecimal.toFixed(precision);
    const fixedActual = actual.decimalValue.toFixed(precision);
    const differentDecimalValue = !(fixedExpected === fixedActual);

    let failed = differentDecimalValue;
    if(differentDecimalValue && params.base !== 10) {
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

function getExpected<T extends AlgorithmType>(params: OperationParams<T>): OperationCheck {
    switch (params.operation.type) {
        case OperationType.Addition:
            return new AdditionCheck(params.operands);
        case OperationType.Subtraction:
            return new SubtractionCheck(params.operands);
        case OperationType.Multiplication:
            return new MultiplicationCheck(params.operands);
        case OperationType.Division:
            return new DivisionCheck(params.operands);
        default:
            throw Error(`Sanity check for ${params.operation.type} not implemented`);
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





