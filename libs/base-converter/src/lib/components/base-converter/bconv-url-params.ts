
import { BaseConverterParams } from './bconv-params';
import { BaseDigits, isValidRepresentationStr } from '@calc/calc-arithmetic';
import { useUrlParams } from '@calc/utils';

export function urlParamsToBaseConverterParams(params: URLSearchParams): BaseConverterParams | undefined {
    const inputStr = params.get('input');
    const inputBaseStr = params.get('inputBase');
    const outputBaseStr = params.get('outputBase');
    const precisionStr = params.get('precision');

    const allArgsPresent = [
        inputStr,
        inputBaseStr,
        outputBaseStr,
        precisionStr,
    ].every(arg => !!arg);

    if (!allArgsPresent) return undefined;

    const inputBase = parseInt(inputBaseStr);
    if (!BaseDigits.isValidBase(inputBase)) return undefined;

    const outputBase = parseInt(outputBaseStr);
    if (!BaseDigits.isValidBase(outputBase)) return undefined;

    const precision = parseInt(precisionStr);
    if(!precision) return undefined;

    const inputStrValid = isValidRepresentationStr(inputStr, inputBase);
    if(!inputStrValid) return undefined;

    return { inputBase, outputBase, inputStr, precision };
}


export function toBconvUrlSearchParams(params: BaseConverterParams): string {
    const {inputStr, inputBase, outputBase, precision} = params;

    return `?input=${inputStr}`
        + `&inputBase=${inputBase}`
        + `&outputBase=${outputBase}`
        + `&precision=${precision}`;
}

export function useUrlBaseConverterParams(): BaseConverterParams | undefined {
    return urlParamsToBaseConverterParams(useUrlParams());
}
