import { optionsReducer} from './options.reducer';
import { combineReducers } from 'redux';
import { OptionsState } from '../models/options-state';

export interface StoreState {
    options: OptionsState;
}

export const rootReducer = combineReducers(
    {
        options: optionsReducer
    }
);
