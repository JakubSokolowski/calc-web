import { createAction } from '@reduxjs/toolkit';
import { AppTheme } from '@calc/ui';
import { loadOptionsWithFallback, updateOptions } from '../../core/functions/local-storage';
import { getI18n } from 'react-i18next';
import { Language } from '@calc/i18n';

export enum OptionsActionsType {
    SetShowComplement = '[Options] Set show complement',
    SetShowDecimalValue = '[Options] Set show decimal value',
    SetTheme = '[Options] Set theme',
    SetLanguage = '[Options] Set language',
    LoadOptions = '[Options] Load options'
}

export const setShowComplement = createAction(
    OptionsActionsType.SetShowComplement,
    (showComplement: boolean) => {
        updateOptions('showComplement', showComplement);
        return ({ payload: { showComplement } });
    }
);

export const setShowDecimalValue = createAction(
    OptionsActionsType.SetShowDecimalValue,
    (showDecimalValue: boolean) => {
        updateOptions('showDecimalValue', showDecimalValue);
        return ({ payload: { showDecimalValue } });
    }
);

export const setTheme = createAction(
    OptionsActionsType.SetTheme,
    (theme: AppTheme) => {
        updateOptions('theme', theme);
        return ({ payload: { theme } });
    }
);

export const setLanguage = createAction(
    OptionsActionsType.SetLanguage,
    (language: Language) => {
        updateOptions('language', language);
        return ({ payload: { language } });
    }
);

export const loadOptions = createAction(
    OptionsActionsType.LoadOptions,
    () => {
        const options = loadOptionsWithFallback();
        getI18n().changeLanguage(options.language).catch((err) => console.log(err));
        return ({ payload: { options } });
    }
);
