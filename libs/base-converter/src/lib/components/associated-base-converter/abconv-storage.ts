import { BaseDigits, isValidRepresentationStr } from '@calc/calc-arithmetic';
import { AsocBaseConverterParams } from './asoc-bconv-params';
import { useHistory, useLocation } from 'react-router-dom';
import {
    BaseLsParamsStorage,
    BaseUrlStorage,
    loadParams,
    ParamsConverter,
    ParamsLsStorageKeys,
    ParamsStorage,
    saveParams, StoredParams
} from '@calc/core';

class AbconvParamsConverter implements ParamsConverter<AsocBaseConverterParams> {
    fromStr(paramsStr: string): AsocBaseConverterParams | undefined {
        return urlParamsToAsocBaseConverterParams(new URLSearchParams(paramsStr));
    }

    toStr(params: AsocBaseConverterParams): string {
        return toAsocBconvUrlSearchParams(params);
    }
}


class AsocLsStorage extends BaseLsParamsStorage<AsocBaseConverterParams> {
    storageKey = ParamsLsStorageKeys.AsocBconv;
}

class AsocUrlStorage extends BaseUrlStorage<AsocBaseConverterParams> {
}

function useAbconvStorageSources(): ParamsStorage<AsocBaseConverterParams>[] {
    const converter = new AbconvParamsConverter();
    const history = useHistory();
    const location = useLocation();
    return [new AsocUrlStorage(history, location, converter), new AsocLsStorage(converter)];
}

export function useStoredAbconvParams(): StoredParams<AsocBaseConverterParams> {
    const storageSources = useAbconvStorageSources();
    const saveFunc = (params: AsocBaseConverterParams) => saveParams(params, storageSources);
    return [loadParams(storageSources), saveFunc];
}

export function urlParamsToAsocBaseConverterParams(params: URLSearchParams): AsocBaseConverterParams | undefined {
    const inputStr = params.get('input');
    const inputBaseStr = params.get('inputBase');
    const outputBaseStr = params.get('outputBase');

    const allArgsPresent = [
        inputStr,
        inputBaseStr,
        outputBaseStr
    ].every(arg => !!arg);

    if (!allArgsPresent) return undefined;

    const inputBase = parseInt(inputBaseStr);
    if (!BaseDigits.isValidBase(inputBase)) return undefined;

    const outputBase = parseInt(outputBaseStr);
    if (!BaseDigits.canConvertUsingAssociateBaseMethod(inputBase, outputBase)) return undefined;

    const inputStrValid = isValidRepresentationStr(inputStr, inputBase);
    if (!inputStrValid) return undefined;

    return { inputBase, outputBase, inputStr };
}

export function toAsocBconvUrlSearchParams(params: AsocBaseConverterParams): string {
    const { inputStr, inputBase, outputBase } = params;

    return `?input=${inputStr}`
        + `&inputBase=${inputBase}`
        + `&outputBase=${outputBase}`;
}
