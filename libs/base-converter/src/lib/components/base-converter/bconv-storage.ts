import { BaseConverterParams } from './bconv-params';
import { BaseDigits, isValidRepresentationStr } from '@calc/calc-arithmetic';
import {
    BaseLsParamsStorage, BaseUrlStorage,
    loadParams,
    ParamsConverter,
    ParamsLsStorageKeys,
    ParamsSaver,
    ParamsStorage,
    saveParams,
} from '@calc/core';
import { AsocBaseConverterParams } from '../associated-base-converter/asoc-bconv-params';
import { useHistory, useLocation } from 'react-router-dom';

class BconvParamsConverter implements ParamsConverter<BaseConverterParams> {
    fromStr(paramsStr: string): BaseConverterParams | undefined {
        return urlParamsToBaseConverterParams(new URLSearchParams(paramsStr));
    }

    toStr(params: BaseConverterParams): string {
        return toBconvUrlSearchParams(params);
    }
}

class BconvLsStorage extends BaseLsParamsStorage<BaseConverterParams> {storageKey = ParamsLsStorageKeys.Bconv;}

class BconvUrlStorage extends BaseUrlStorage<BaseConverterParams> {}

function useBconvStorageSources(): ParamsStorage<BaseConverterParams>[] {
    const converter = new BconvParamsConverter();
    const history = useHistory();
    const location = useLocation();
    return [new BconvUrlStorage(history, location, converter), new BconvLsStorage(converter)];
}

export function useStoredBconvParams(): [BaseConverterParams | undefined, ParamsSaver<BaseConverterParams>] {
    const storageSources = useBconvStorageSources();
    const saveFunc = (params: AsocBaseConverterParams) => saveParams(params, storageSources);
    return [loadParams(storageSources), saveFunc];
}

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
