import { optionsInitialState, OptionsState } from '../store/models/options-state';

export const optionsKey = 'calcOptions';

export function updateOptions(option: keyof OptionsState, value: any): void {
    const options = {...loadOptionsWithFallback()};
    options[option as string] = value;
    const optionsStr = JSON.stringify(options);
    localStorage.setItem(optionsKey, optionsStr)
}

export function loadOptionsWithFallback(): OptionsState {
    return localStorage.getItem(optionsKey)
        ? JSON.parse(localStorage.getItem(optionsKey))
        : optionsInitialState;
}
