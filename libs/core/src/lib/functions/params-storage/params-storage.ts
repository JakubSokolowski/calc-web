export interface ParamsSaver<T> {
    (params: T): void;
}

export type StoredParams<T> = [T | undefined, ParamsSaver<T>];

export interface ParamsStorage<T> {
    loadParams(): T | undefined;

    saveParams(params: T): void;
}

export interface ParamsConverter<T> {
    fromStr(paramsStr: string): T | undefined;
    toStr(params: T): string
}

export function saveParams<T>(params: T, storageSources: ParamsStorage<T>[]): void {
    storageSources.forEach((s) => s.saveParams(params));
}

export function loadParams<T>(storageSources: ParamsStorage<T>[]): T | undefined {
    for (const storage of storageSources) {
        const maybeParams = storage.loadParams();
        if (maybeParams) return maybeParams;
    }
}


