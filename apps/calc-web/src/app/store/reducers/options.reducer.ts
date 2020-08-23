import { createReducer } from '@reduxjs/toolkit';
import { setShowComplement, setShowDecimalValue } from '../actions/options.actions';

export interface OptionsState {
    showComplement: boolean;
    showDecimalValue: boolean;
}

export const optionsInitialState: OptionsState = {
    showComplement: true,
    showDecimalValue: true
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
    }
);
