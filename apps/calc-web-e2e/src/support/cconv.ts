import { getInputBaseInput, getInputStrInput } from './bconv';

export const getComplementConverterConvertButton = () => cy.getByDataTest('cconv-convert');

export const complementConverterHasProperResult = (expected: string) => {
    cy.getByDataTest(`cconv-result-${expected}`);
};

export const inputComplementConverter = (inputStr: string, inputBase: number) => {
    getInputStrInput().clear().type(inputStr);
    getInputBaseInput().clear().type(`${inputBase}`);
    getComplementConverterConvertButton().click();
};
