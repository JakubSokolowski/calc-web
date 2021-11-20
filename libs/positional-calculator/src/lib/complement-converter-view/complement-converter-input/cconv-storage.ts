import { BaseDigits, isValidRepresentationStr } from '@calc/calc-arithmetic';
import { useUrlParams } from '@calc/utils';
import { ComplementConverterParams } from './complement-converter-params';
import {
    BaseLsParamsStorage,
    BaseUrlStorage, loadParams,
    ParamsConverter,
    ParamsLsStorageKeys,
    ParamsSaver,
    ParamsStorage, saveParams, StoredParams
} from '@calc/core';
import { useHistory, useLocation } from 'react-router-dom';

class CconvParamsConverter implements ParamsConverter<ComplementConverterParams> {
    fromStr(paramsStr: string): ComplementConverterParams | undefined {
        return urlParamsToComplementConverterParams(new URLSearchParams(paramsStr));
    }

    toStr(params: ComplementConverterParams): string {
        return complementConverterParamsToUrlSearch(params);
    }
}

class CconvLsStorage extends BaseLsParamsStorage<ComplementConverterParams> {storageKey = ParamsLsStorageKeys.Cconv;}

class CconvUrlStorage extends BaseUrlStorage<ComplementConverterParams> {}

function useCconvStorageSources(): ParamsStorage<ComplementConverterParams>[] {
    const converter = new CconvParamsConverter();
    const history = useHistory();
    const location = useLocation();
    return [new CconvUrlStorage(history, location, converter), new CconvLsStorage(converter)];
}

export function useStoredCconvParams(): StoredParams<ComplementConverterParams> {
    const storageSources = useCconvStorageSources();
    const saveFunc = (params: ComplementConverterParams) => saveParams(params, storageSources);
    return [loadParams(storageSources), saveFunc];
}


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
