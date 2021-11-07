import { getInputBaseInput, getInputStrInput } from './bconv';

export const getOutputBaseSelect = () => cy.get('#outputBase');
export const getAbconvConvertButton = () => cy.getByDataTest('abconv-convert');

export const selectOutputBase = (outputBase: number) => {
    getOutputBaseSelect().click();
    cy.getByDataTest(`output-base-${outputBase}`).click();
};

export enum MappingType {
    Split = 'split',
    Merge = 'merge'
}

export interface Mapping {
    input: string,
    output: string,
    type: MappingType
}

export const abconvHasProperResult = (expected: string) => {
    cy.getByDataTest(`abconv-result-${expected}`);
};

export const abconvHasProperMappings = (mappings: Mapping[]) => {
    mappings.forEach(mappingExists)
};

const mappingExists = (mapping: Mapping) => {
    const {input, output, type} = mapping;
    if(type === MappingType.Split) {
        cy.getByDataTest(`split-mapping-${input}-${output}`);
    } else {
        cy.getByDataTest(`merge-mapping-${input}-${output}`);
    }
};

export const inputAbconv = (inputStr: string, inputBase: number, outputBase: number) => {
    getInputStrInput().clear().type(inputStr);
    getInputBaseInput().clear().type(`${inputBase}`);
    selectOutputBase(outputBase);
    getAbconvConvertButton().click();
};
