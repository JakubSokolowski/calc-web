import { CalculatorOptionsValue } from './calculator-options-value';
import {
    BaseDigits,
    isValidComplementOrRepresentationStr,
    isValidPrecision,
    OperationType
} from '@calc/calc-arithmetic';
import { DndOperand } from '../operand-list/operand-list';
import { inRangeInclusive } from '@calc/utils';
import { allOperations } from './operations';
import { algorithmMap } from './algorithms';
import {
    BaseLsParamsStorage,
    BaseUrlStorage,
    loadParams,
    ParamsConverter,
    ParamsLsStorageKeys,
    ParamsStorage,
    saveParams, StoredParams
} from '@calc/core';
import { useHistory, useLocation } from 'react-router-dom';


class CalculatorParamsConverter implements ParamsConverter<CalculatorOptionsValue> {
    fromStr(paramsStr: string): CalculatorOptionsValue | undefined {
        return urlParamsToCalculatorOptionsValue(new URLSearchParams(paramsStr));
    }

    toStr(params: CalculatorOptionsValue): string {
        return toUrlSearchParams(params);
    }

}

class CalculatorLsStorage extends BaseLsParamsStorage<CalculatorOptionsValue> {
    storageKey = ParamsLsStorageKeys.Calculator;
}

class CalculatorUrlStorage extends BaseUrlStorage<CalculatorOptionsValue> {
}

function useCalculatorStorageSources(): ParamsStorage<CalculatorOptionsValue>[] {
    const converter = new CalculatorParamsConverter();
    const history = useHistory();
    const location = useLocation();
    return [new CalculatorUrlStorage(history, location, converter), new CalculatorLsStorage(converter)];
}

export function useStoredCalculatorParams(): StoredParams<CalculatorOptionsValue> {
    const storageSources = useCalculatorStorageSources();
    const saveFunc = (params: CalculatorOptionsValue) => saveParams(params, storageSources);
    return [loadParams(storageSources), saveFunc];
}

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
    if (precisionStr && !isValidPrecision(precision)) return;

    const operands: DndOperand[] = operandsStrArr.map((op, idx) => {
        return ({
            representation: op,
            valid: isValidComplementOrRepresentationStr(op, base),
            dndKey: `${idx}`
        });
    });

    const hasProperNumOfOperands = inRangeInclusive(operands.length, operation.minOperands, operation.maxOperands);
    if (!hasProperNumOfOperands) return;

    const everyOpValid = operands.every(op => op.valid);
    if (!everyOpValid) return undefined;

    return { base, operation, operands, algorithm, precision };
}


export function toUrlSearchParams(params: CalculatorOptionsValue): string {
    const { algorithm, operation, operands, base, precision } = params;
    const operandsStr = operands.map(op => `op=${op.representation}`).join('&');
    const precisionStr = operation.type === OperationType.Division ? `&precision=${precision}` : '';

    return `?operation=${operation.type.toLowerCase()}`
        + `&algorithm=${algorithm.type.toLowerCase()}`
        + `&base=${base}`
        + `&${operandsStr}`
        + precisionStr;
}
