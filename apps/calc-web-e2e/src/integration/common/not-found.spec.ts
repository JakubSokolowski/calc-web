describe('Page not found', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should display 404 page for unknown route', () => {
        cy.visit('/#/some-unknown-route');

        cy.getByDataTest('page-not-found');
    });

    it('should display 404 page for unknown positional tools route', () => {
        cy.visit('/#/theory/positional/super-tool');

        cy.getByDataTest('page-not-found');
    });

    it('should display 404 page for unknown floating tools route', () => {
        cy.visit('/#/tools/floating/bloat-converter');

        cy.getByDataTest('page-not-found');
    });

    it('should display 404 page for unknown theory route', () => {
        cy.visit('/#/theory/positional/operations/multiplication/how-2-get-gud');

        cy.getByDataTest('page-not-found');
    });
});
