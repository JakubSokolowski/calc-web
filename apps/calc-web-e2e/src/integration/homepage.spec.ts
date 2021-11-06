import { getAppName, getAppNameCaption } from '../support/app.po';
import { changeLanguage } from '../support/language';
import { Language } from '@calc/i18n';

describe('home-page', () => {
    beforeEach(() => {
        cy.visit('/');
        changeLanguage(Language.en);
    });

    it('should display homepage with basic info', () => {
        getAppName().contains('CALC');
        getAppNameCaption().contains('Computer Arithmetic Learning Calculator');
    });

    it('should display button for reporting errors', () => {
        // should show menu on click
        cy.getByDataTest('help-button').click();

        // should display link for bug reporting
        cy.getByDataTest('bug-report').contains('Report a bug');
    });

    it('should navigate to tool after clicking tool nav tile', () => {
        // to positional calculator
        cy.getByDataTest('positional-calculator-nav').click();
        cy.location('href').should('include', 'positional-calculator');
        cy.visit('/');

        // to base converter
        cy.getByDataTest('base-converter-nav').click();
        cy.location('href').should('include', 'base-converter');
        cy.visit('/');
    });
});
