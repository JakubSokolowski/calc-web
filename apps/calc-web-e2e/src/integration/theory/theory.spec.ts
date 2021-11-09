import { changeLanguage } from '../../support/language';
import { Language } from '@calc/i18n';

describe('Theory view', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('should display doc page for given route and language', () => {
        const plDocText = "Test PL";
        cy.intercept('GET', '/assets/docs/test/test_pl.md*', plDocText);
        const enDocText = "Test EN";
        cy.intercept('GET', '/assets/docs/test/test_en.md*', enDocText);

        changeLanguage(Language.pl);
        cy.visit('#/theory/test');

        cy.getByDataTest('doc-page').contains(plDocText);
        changeLanguage(Language.en);

        cy.getByDataTest('doc-page').contains(enDocText);
    });

    it('should display page with fallback translation and warning if translation for current lang is missing', () => {
        const plDocText = "Test PL";
        cy.intercept('GET', '/assets/docs/test/test_pl.md*', plDocText);

        changeLanguage(Language.en);
        cy.visit('#/theory/test');

        cy.getByDataTest('doc-page').contains(plDocText);
        cy.getByDataTest('translation-not-available');
    });
});
