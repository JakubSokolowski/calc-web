import { CalculatorOptionsValue } from './calculator-options-value';
import { algorithmMap, allOperations, BaseDigits, isValidComplementOrRepresentationStr } from '@calc/calc-arithmetic';
import { DndOperand } from '../operand-list/operand-list';
import { useUrlParams } from '@calc/utils';

function urlParamsToCalculatorOptionsValue(params: URLSearchParams): CalculatorOptionsValue | undefined {
    const operationStr = params.get('operation');
    const algorithmStr = params.get('algorithm');
    const baseStr = params.get('base');
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

    const operands: DndOperand[] = operandsStrArr.map((op, idx) => {
        return ({
            representation: op,
            valid: isValidComplementOrRepresentationStr(op, base),
            dndKey: `${idx}`
        });
    });

    const everyOpValid = operands.every(op => op.valid);
    if (!everyOpValid) return undefined;

    const operation = allOperations.find((op) => op.type.toString().toLowerCase() === operationStr);
    if (!operation) return undefined;

    const possibleAlgorithms = algorithmMap[operation.type] || [];
    const algorithm = possibleAlgorithms.find((alg) => alg.type.toLowerCase() === algorithmStr);
    if (!algorithm) return undefined;

    return { base, operation, operands, algorithm };
}

export function useUrlCalculatorOptions(): CalculatorOptionsValue | undefined {
    return urlParamsToCalculatorOptionsValue(useUrlParams());
}
