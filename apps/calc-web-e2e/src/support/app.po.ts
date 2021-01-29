export const getGreeting = () => cy.get('h1');

export const getAppName = () => cy.get(('[data-test=home-appname]'));
export const getAppNameCaption = () => cy.get(('[data-test=home-caption]'));
