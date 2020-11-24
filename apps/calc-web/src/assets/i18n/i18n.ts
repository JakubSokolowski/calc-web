import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationPL from './pl.json';

export enum Language {
    pl = 'pl',
    en = 'en'
}

const resources = {
    [Language.en]: {
        translation: translationEN
    },
    [Language.pl]: {
        translation: translationPL
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
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: Language.en,
        fallbackLng: Language.pl,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
