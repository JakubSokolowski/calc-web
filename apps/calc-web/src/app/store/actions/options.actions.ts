import { createAction } from '@reduxjs/toolkit';


export enum OptionsActionsType {
    SetShowComplement = '[Options] Set show complement',
    SetShowDecimalValue = '[Options] Set show decimal value'
}

export const setShowComplement = createAction(
    OptionsActionsType.SetShowComplement,
    (showComplement: boolean) => ({payload: {showComplement}})
);

export const setShowDecimalValue = createAction(
    OptionsActionsType.SetShowDecimalValue,
    (showDecimalValue: boolean) => ({payload: {showDecimalValue}})
);
