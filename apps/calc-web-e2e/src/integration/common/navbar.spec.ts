import { changeLanguage, hasLanguage } from '../../support/language';
import { Language } from '@calc/i18n';

describe('navbar', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
    });

    // STUD_REQ_9
    it('should display theme change button and change theme on click', () => {
        // should have initially dark theme
        cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');

        // after clicking change theme button
        cy.get('#toggle-light-theme').click();

        // it should change to light theme
        cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');


        // should change to dark theme again
        cy.get('#toggle-dark-theme').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(18, 18, 18)');
    });


    // STUD_REQ-2
    it('should display translation change button and change translation on click', () => {
        // should have polish as default language
        hasLanguage(Language.pl);
        cy.getByDataTest('menu-tree-label').contains('Strona główna');

        // Should change language after clicking another in menu
        changeLanguage(Language.en);

        cy.getByDataTest('menu-tree-label').contains('Home');
    });
});
