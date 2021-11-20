import { ParamsConverter, ParamsStorage } from './params-storage';

export enum ParamsLsStorageKeys {
    AsocBconv = 'abconvParams',
    Bconv = 'bconvParams',
    Base = 'baseParams',
    Calculator = 'calculatorParams'
}

export interface LsParamsStorage<T> extends ParamsStorage<T> {
    storageKey: ParamsLsStorageKeys;
}

export class BaseLsParamsStorage<T> implements LsParamsStorage<T> {
    converter: ParamsConverter<T>;
    storageKey: ParamsLsStorageKeys;

    constructor(converter: ParamsConverter<T>) {
        this.converter = converter;
    }

    loadParams(): T | undefined {
        const paramsStr = localStorage.getItem(this.storageKey);
        return this.converter.fromStr(paramsStr);
    }

    saveParams(params: T): void {
        const paramsStr = this.converter.toStr(params);
        localStorage.setItem(this.storageKey, paramsStr);
    }
}
