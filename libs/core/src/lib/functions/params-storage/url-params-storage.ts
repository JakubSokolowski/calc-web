import * as H from 'history';
import { ParamsConverter, ParamsStorage } from './params-storage';

export interface UrlParamsStorage<T> extends ParamsStorage<T> {
    history: H.History;
    location: H.Location;
}

export class BaseUrlStorage<T> implements UrlParamsStorage<T> {
    history: H.History;
    location: H.Location;
    converter: ParamsConverter<T>;

    constructor(history: H.History, location: H.Location, converter: ParamsConverter<T>) {
        this.history = history;
        this.location = location;
        this.converter = converter;
    }

    loadParams(): T | undefined {
        const paramsStr = this.location.search;
        return this.converter.fromStr(paramsStr);
    }

    saveParams(params: T): void {
        const paramsStr = this.converter.toStr(params);
        this.history.replace(
            { search: paramsStr }
        );
    }
}
