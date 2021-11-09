import {
    abconvHasProperMappings,
    abconvHasProperResult,
    inputAbconv,
    Mapping,
    MappingType
} from '../../../support/abconv';

describe('Associated base converter conversion', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/associated-base-converter');
    });

    it('should convert greater to smaller base and show result with split mapping', () => {
        const inputStr = 'FFA';
        const inputBase = 16;
        const outputBase = 2;
        const expected = '11111111101';
        const expectedMappings: Mapping[] = [
            {
                input: 'F',
                output: '1111',
                type: MappingType.Split
            },
            {
                input: 'F',
                output: '1111',
                type: MappingType.Split
            },
            {
                input: 'A',
                output: '1010',
                type: MappingType.Split
            }
        ];

        inputAbconv(inputStr, inputBase, outputBase);
        abconvHasProperResult(expected);
        abconvHasProperMappings(expectedMappings);
    });

    it('should convert smaller to greater base and show result with merge mapping', () => {
        const inputStr = '110111';
        const inputBase = 2;
        const outputBase = 8;
        const expected = '67';
        const expectedMappings: Mapping[] = [
            {
                input: '110',
                output: '6',
                type: MappingType.Merge
            },
            {
                input: '111',
                output: '7',
                type: MappingType.Merge
            },
        ];

        inputAbconv(inputStr, inputBase, outputBase);
        abconvHasProperResult(expected);
        abconvHasProperMappings(expectedMappings);
    });

    it('should update url search params with operation data after submit', () => {
        const inputStr = '110111';
        const inputBase = 2;
        const outputBase = 8;
        inputAbconv(inputStr, inputBase, outputBase);

        const expectedParams = '?input=110111&inputBase=2&outputBase=8';
        cy.location('href').should('include', expectedParams);
    });

    it('should run calculation from url params, if redirected by url', () => {
        const params = '?input=110111&inputBase=2&outputBase=8';
        cy.visit(`#/tools/positional/associated-base-converter${params}`);
        cy.reload();
        const expected = '67';
        abconvHasProperResult(expected);
    })

});
