import { rootReducer, StoreState } from './reducers/root.reducer';
import { createStore } from 'redux';
import { optionsInitialState } from './models/options-state';


const initialState: StoreState = {
    options: optionsInitialState
};

export const store = createStore(
    rootReducer,
    initialState
);
