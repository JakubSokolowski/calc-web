describe('Page not found', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should display 404 page for unknown route', () => {
        cy.visit('/#/some-unknown-route');

        cy.getByDataTest('page-not-found');
    });
});
