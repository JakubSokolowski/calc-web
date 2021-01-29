describe('navbar', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
    });

    // STUD_REQ_9
    it('should display theme change button and change theme on click', () => {
        // should have initially dark theme
        cy.get('body').should('have.css', 'background-color', 'rgb(48, 48, 48)');

        // after clicking change theme button
        cy.get('#toggle-light-theme').click();

        // it should change to light theme
        cy.get('body').should('have.css', 'background-color', 'rgb(250, 250, 250)');


        // should change to dark theme again
        cy.get('#toggle-dark-theme').click();

        cy.get('body').should('have.css', 'background-color', 'rgb(48, 48, 48)');
    });


    // STUD_REQ-2
    it('should display translation change button and change translation on click', () => {
        // should have english as default language
        cy.getByDataTest('change-language')
            .get('.MuiButton-label')
            .contains('English');

        cy.getByDataTest('menu-tree-label').contains('Home');

        // Should change language after clicking another in menu
        cy.getByDataTest('change-language')
            .click()
            .getByDataTest('language-pl')
            .click();

        cy.getByDataTest('menu-tree-label').contains('Strona główna');
    });
});
