import { complementConverterHasProperResult, inputComplementConverter } from '../../../support/cconv';

describe('Complement converter', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/complement-converter');
    });

    it('should convert positive number to its complement representation', () => {
        const inputStr = 'FFA';
        const inputBase = 16;
        const expected = '0FFA';

        inputComplementConverter(inputStr, inputBase);
        complementConverterHasProperResult(expected);
    });

    it('should convert negative number to its complement representation', () => {
        const inputStr = '-ABC';
        const inputBase = 16;
        const expected = 'F544';

        inputComplementConverter(inputStr, inputBase);
        complementConverterHasProperResult(expected);
    });

    it('should update url search params with operation data after submit', () => {
        const inputStr = '-ABC';
        const inputBase = 16;
        const expected = 'F544';

        inputComplementConverter(inputStr, inputBase);
        complementConverterHasProperResult(expected);

        const expectedParams = '?input=-ABC&inputBase=16';
        cy.location('href').should('include', expectedParams);
    });

    it('should run calculation from url params, if redirected by url', () => {
        const params = '?input=-ABC&inputBase=16';
        const expected = 'F544';

        cy.visit(`#/tools/positional/complement-converter${params}`);
        cy.reload();

        complementConverterHasProperResult(expected);
    });


    it('should save latest operation in local storage, and execute it on reload', () => {
        const inputStr = '-ABC';
        const inputBase = 16;
        const expected = 'F544';

        inputComplementConverter(inputStr, inputBase);
        complementConverterHasProperResult(expected);
        cy.visit(`/`);
        cy.visit(`#/tools/positional/complement-converter`);

        complementConverterHasProperResult(expected);
        const expectedParams = '?input=-ABC&inputBase=16';
        cy.location('href').should('include', expectedParams);
    });

    it('should load params from url over local storage params when both are present', () => {
        const inputStr = '-ABC';
        const inputBase = 16;
        const expected = 'F544';

        inputComplementConverter(inputStr, inputBase);
        complementConverterHasProperResult(expected);

        cy.visit(`/`);
        const params = '?input=CDA&inputBase=16';
        cy.visit(`#/tools/positional/complement-converter${params}`);
        const paramsExpected = '0CDA';
        complementConverterHasProperResult(paramsExpected);
    });
});
