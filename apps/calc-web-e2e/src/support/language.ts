import { Language, getNativeName } from '@calc/i18n';

export function hasLanguage(language: Language) {
    cy.getByDataTest('change-language')
        .contains(getNativeName(language));
}

export function changeLanguage(language: Language) {
    cy.getByDataTest('change-language')
        .click()
        .getByDataTest(`language-${language}`)
        .click();

    hasLanguage(language)
}
