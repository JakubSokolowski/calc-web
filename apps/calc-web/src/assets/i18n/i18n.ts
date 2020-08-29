import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationPL from './pl.json';

const resources = {
    en: {
        translation: translationEN
    },
    pl: {
        translation: translationPL
    }
};

export function getNativeName(languageKey: string): string {
    return {
        'en': 'English',
        'pl': 'Polski'
    }[languageKey];
}

export const availableThemes = Object.keys(resources);

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
