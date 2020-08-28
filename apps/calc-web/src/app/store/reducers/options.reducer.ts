import { createReducer } from '@reduxjs/toolkit';
import { setShowComplement, setShowDecimalValue, setTheme } from '../actions/options.actions';
import { AppTheme } from '@calc/ui';

export interface OptionsState {
    showComplement: boolean;
    showDecimalValue: boolean;
    theme: AppTheme;
}

export const optionsInitialState: OptionsState = {
    showComplement: true,
    showDecimalValue: true,
    theme: AppTheme.Light
};

export const optionsReducer = createReducer(
    optionsInitialState,
    {
        [setShowComplement.type]: (state, {payload}) => {
            return ({...state, showComplement: payload.showComplement})
        },
        [setShowDecimalValue.type]: (state, {payload}) => {
            return ({...state, showDecimalValue: payload.showDecimalValue})
        },
        [setTheme.type]: (state, {payload}) => {
            return ({...state, theme: payload.theme})
        },
    }
);
