import { rootReducer, StoreState } from './reducers/root.reducer';
import { optionsInitialState } from './reducers/options.reducer';
import { createStore } from 'redux';


const initialState: StoreState = {
    options: optionsInitialState
};

export const store = createStore(
    rootReducer,
    initialState
);
