import { createReducer } from '@reduxjs/toolkit';
import { loadOptions, setLanguage, setShowComplement, setShowDecimalValue, setTheme } from '../actions/options.actions';
import { optionsInitialState } from '../models/options-state';

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
        [setLanguage.type]: (state, {payload}) => {
            return ({...state, language: payload.language})
        },
        [loadOptions.type]: (state, {payload}) => {
            return ({...payload.options})
        },
    }
);
