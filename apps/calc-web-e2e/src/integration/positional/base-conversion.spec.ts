import {
    getBconvConvertButton,
    getComplementInput, getConversionResult,
    getDecimalValueInput,
    getInputBaseInput,
    getInputStrInput,
    getIntegralConversionGrid,
    getOutputBaseInput,
    getShowComplementSwitchOff,
    getShowComplementSwitchOn,
    getShowDecimalValueSwitchOff,
    getShowDecimalValueSwitchOn
} from '../../support/bconv';

describe('Base converter error labels', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/base-converter');
    });

    it('should display error when input base is invalid and disable convert button', () => {
        const errorText = 'Base must be between 2 and 99';
        const labelId = '#inputBase-helper-text';

        getInputBaseInput().type('1');
        cy.get(labelId).contains(errorText);
        getBconvConvertButton().should('be.disabled');

        getInputBaseInput().clear().type('200');
        cy.get(labelId).contains(errorText);
        getBconvConvertButton().should('be.disabled');

        getInputBaseInput().clear().type('10');
        cy.get(labelId).should('not.exist');
    });

    it('should display error when output base is invalid and disable convert button', () => {
        const errorText = 'Base must be between 2 and 99';
        const labelId = '#outputBase-helper-text';
        getOutputBaseInput().clear().type('1');
        cy.get(labelId).contains(errorText);
        getBconvConvertButton().should('be.disabled');

        getOutputBaseInput().clear().type('200');
        cy.get(labelId).contains(errorText);
        getBconvConvertButton().should('be.disabled');

        getOutputBaseInput().clear().type('10');
        cy.get(labelId).should('not.exist');
    });

    it('should display error when representation does not match the base', () => {
        const base = 10;
        const errorText = `Representation strings contains invalid digits for base ${base}`;
        const labelId = '#inputStr-helper-text';

        getInputBaseInput().clear().type(`${base}`);
        getInputStrInput().clear().type('FFA');

        cy.get(labelId).contains(errorText);
    });
});

describe('Base converter show decimal value/complement switches', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/base-converter');
    });

    it('should show/hide input decimal value on switch change', () => {
        // should show proper value
        getShowDecimalValueSwitchOn();
        cy.baseConverterInput('-11011', 2, 16);
        getDecimalValueInput().should('have.value', '-27');

        // should hide it on switch change
        getShowDecimalValueSwitchOn().click();
        getDecimalValueInput().should('not.exist');

        // switch state (off) should persist on reload
        cy.reload();
        getShowDecimalValueSwitchOff();
    });

    it('should show/hide input complement on switch change', () => {
        // should show proper value
        getShowComplementSwitchOn();
        cy.baseConverterInput('-11011', 2, 16);
        getComplementInput().should('have.value', '(1)00101');

        // should hide it on switch change
        getShowComplementSwitchOn().click();
        getComplementInput().should('not.exist');

        // switch state (off) should persist on reload
        cy.reload();
        getShowComplementSwitchOff();
    });
});

describe('Base converter conversion', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/base-converter');
    });

    it('should convert to another base when number has no fraction part', () => {
        const inputStr = '123';
        const inputBase = 10;
        const outputBase = 2;

        cy.baseConverterInput(inputStr, inputBase, outputBase);
        getConversionResult().toMatchSnapshot();
        getIntegralConversionGrid().toMatchSnapshot({});
    });
});
