import { createAction } from '@reduxjs/toolkit';
import { AppTheme } from '@calc/ui';


export enum OptionsActionsType {
    SetShowComplement = '[Options] Set show complement',
    SetShowDecimalValue = '[Options] Set show decimal value',
    SetTheme = '[Options] Set theme'
}

export const setShowComplement = createAction(
    OptionsActionsType.SetShowComplement,
    (showComplement: boolean) => ({payload: {showComplement}})
);

export const setShowDecimalValue = createAction(
    OptionsActionsType.SetShowDecimalValue,
    (showDecimalValue: boolean) => ({payload: {showDecimalValue}})
);

export const setTheme = createAction(
    OptionsActionsType.SetTheme,
    (theme: AppTheme) => ({payload: {theme}})
);
