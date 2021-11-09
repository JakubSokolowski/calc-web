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

});
