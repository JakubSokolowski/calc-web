import { getMenuTreeNode, nodeShouldBeSelected } from '../../support/menu-tree';

describe('navbar', () => {
    it('should navigate to related route by clicking on tree node', () => {
        cy.visit('/');
        getMenuTreeNode("Teoria").click();
        cy.location('href').should('include', 'theory');

        getMenuTreeNode("Pozycyjne").click();
        cy.location('href').should('include', 'theory/positional');

        getMenuTreeNode("Bazy Skojarzone").click();
        cy.location('href').should('include', 'theory/positional/associated-base-conversion');
    });

    it('should highlight node as selected in UI when node is clicked', () => {
        cy.visit('/');
        getMenuTreeNode("Teoria").click();
        getMenuTreeNode("Pozycyjne").click();
        getMenuTreeNode("Bazy Skojarzone").click();
        nodeShouldBeSelected("Bazy Skojarzone");
    });

    it('should expand tree and highlight node as selected when redirected from url', () => {
        cy.visit(`#/theory/positional/associated-base-conversion`);
        nodeShouldBeSelected("Bazy Skojarzone");
    });
});
