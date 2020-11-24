import { createSelector } from '@reduxjs/toolkit';
import { StoreState } from '../reducers/root.reducer';

export const optionsState = createSelector(
    (state: StoreState) => state,
    state => state.options
);

export const selectShowDecimalValue = createSelector(
    optionsState,
    state => state.showDecimalValue
);

export const selectShowComplement = createSelector(
    optionsState,
    state => state.showComplement
);

export const selectAppTheme = createSelector(
    optionsState,
    state => state.theme
);

export const selectAppLanguage = createSelector(
    optionsState,
    state => state.language
);

