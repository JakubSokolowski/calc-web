
import { BaseDigits, isValidRepresentationStr } from '@calc/calc-arithmetic';
import { useUrlParams } from '@calc/utils';
import { AsocBaseConverterParams } from './asoc-bconv-params';

export function urlParamsToAsocBaseConverterParams(params: URLSearchParams): AsocBaseConverterParams | undefined {
    const inputStr = params.get('input');
    const inputBaseStr = params.get('inputBase');
    const outputBaseStr = params.get('outputBase');

    const allArgsPresent = [
        inputStr,
        inputBaseStr,
        outputBaseStr,
    ].every(arg => !!arg);

    if (!allArgsPresent) return undefined;

    const inputBase = parseInt(inputBaseStr);
    if (!BaseDigits.isValidBase(inputBase)) return undefined;

    const outputBase = parseInt(outputBaseStr);
    if (!BaseDigits.canConvertUsingAssociateBaseMethod(inputBase, outputBase)) return undefined;

    const inputStrValid = isValidRepresentationStr(inputStr, inputBase);
    if(!inputStrValid) return undefined;

    return { inputBase, outputBase, inputStr };
}


export function toAsocBconvUrlSearchParams(params: AsocBaseConverterParams): string {
    const {inputStr, inputBase, outputBase} = params;

    return `?input=${inputStr}`
        + `&inputBase=${inputBase}`
        + `&outputBase=${outputBase}`;
}

export function useUrlAsocBaseConverterParams(): AsocBaseConverterParams | undefined {
    return urlParamsToAsocBaseConverterParams(useUrlParams());
}
