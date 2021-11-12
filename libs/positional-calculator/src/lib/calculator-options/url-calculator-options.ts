 import { CalculatorOptionsValue } from './calculator-options-value';
import {
    BaseDigits,
    isValidComplementOrRepresentationStr,
    isValidPrecision,
    OperationType
} from '@calc/calc-arithmetic';
import { DndOperand } from '../operand-list/operand-list';
import { inRangeInclusive, useUrlParams } from '@calc/utils';
import { allOperations } from './operations';
import { algorithmMap } from './algorithms';
 import { OperationParams } from '../core/calculate';

export function urlParamsToCalculatorOptionsValue(params: URLSearchParams): CalculatorOptionsValue | undefined {
    const operationStr = params.get('operation');
    const algorithmStr = params.get('algorithm');
    const baseStr = params.get('base');
    const precisionStr = params.get('precision');
    const operandsStrArr = params.getAll('op');

    const allArgsPresent = [
        operationStr,
        algorithmStr,
        baseStr,
        operandsStrArr.length > 0
    ].every(arg => arg);

    if (!allArgsPresent) return undefined;

    const base = parseInt(baseStr);
    if (!BaseDigits.isValidBase(base)) return undefined;

    const operation = allOperations.find((op) => op.type.toString().toLowerCase() === operationStr);
    if (!operation) return undefined;

    const possibleAlgorithms = algorithmMap[operation.type] || [];
    const algorithm = possibleAlgorithms.find((alg) => alg.type.toLowerCase() === algorithmStr);
    if (!algorithm) return undefined;

    const precision = precisionStr ? parseInt(precisionStr) : undefined;
    if(precisionStr && !isValidPrecision(precision)) return;

    const operands: DndOperand[] = operandsStrArr.map((op, idx) => {
        return ({
            representation: op,
            valid: isValidComplementOrRepresentationStr(op, base),
            dndKey: `${idx}`
        });
    });

    const hasProperNumOfOperands = inRangeInclusive(operands.length, operation.minOperands, operation.maxOperands);
    if(!hasProperNumOfOperands) return;

    const everyOpValid = operands.every(op => op.valid);
    if (!everyOpValid) return undefined;

    return { base, operation, operands, algorithm, precision };
}


export function toUrlSearchParams(params: OperationParams<string>): string {
    const {algorithm, operation, operands, base, precision} = params;
    const operandsStr = operands.map(op => `op=${op}`).join('&');
    const precisionStr =  operation === OperationType.Division ? `&precision=${precision}` : '';

    return `?operation=${operation.toLowerCase()}`
        + `&algorithm=${algorithm.toLowerCase()}`
        + `&base=${base}`
        + `&${operandsStr}`
        + precisionStr;
}

export function useUrlCalculatorOptions(): CalculatorOptionsValue | undefined {
    return urlParamsToCalculatorOptionsValue(useUrlParams());
}

export const calculatorOptionsLsKey = 'calculatorOptions';

export function useLsCalculatorOptions(): CalculatorOptionsValue | undefined {
    const search = localStorage.getItem(calculatorOptionsLsKey);
    return urlParamsToCalculatorOptionsValue(new URLSearchParams(search))
}
