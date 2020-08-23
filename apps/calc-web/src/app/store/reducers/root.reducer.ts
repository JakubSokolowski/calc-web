import { optionsReducer, OptionsState } from './options.reducer';
import { combineReducers } from 'redux';

export interface StoreState {
    options: OptionsState;
}

export const rootReducer = combineReducers(
    {
        options: optionsReducer
    }
);
