import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../assets/en.json';
import pl from '../assets/pl.json';

export const translationEn = en;
export const translationPl = pl;

export enum Language {
    pl = 'pl',
    en = 'en'
}

const resources = {
    [Language.en]: {
        translation: en
    },
    [Language.pl]: {
        translation: pl
    }
};

export function getNativeName(languageKey: Language): string {
    return {
        [Language.en]: 'English',
        [Language.pl]: 'Polski'
    }[languageKey];
}

export const availableLanguages = [Language.en, Language.pl];

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Language.en,
        fallbackLng: Language.pl,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
