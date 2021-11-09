
import { BaseDigits, isValidRepresentationStr } from '@calc/calc-arithmetic';
import { useUrlParams } from '@calc/utils';
import { ComplementConverterParams } from './complement-converter-params';

export function urlParamsToComplementConverterParams(params: URLSearchParams): ComplementConverterParams | undefined {
    const inputStr = params.get('input');
    const inputBaseStr = params.get('inputBase');

    const allArgsPresent = [
        inputStr,
        inputBaseStr,
    ].every(arg => !!arg);

    if (!allArgsPresent) return undefined;

    const inputBase = parseInt(inputBaseStr);
    if (!BaseDigits.isValidBase(inputBase)) return undefined;

    const inputStrValid = isValidRepresentationStr(inputStr, inputBase);
    if(!inputStrValid) return undefined;

    return { inputBase, inputStr };
}


export function complementConverterParamsToUrlSearch(params: ComplementConverterParams): string {
    const {inputStr, inputBase} = params;

    return `?input=${inputStr}`
        + `&inputBase=${inputBase}`;
}

export function useUrlComplementConverterParams(): ComplementConverterParams | undefined {
    return urlParamsToComplementConverterParams(useUrlParams());
}
