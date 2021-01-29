export const getInputStrInput = () => cy.get('#inputStr');
export const getInputBaseInput = () => cy.get('#inputBase');
export const getOutputBaseInput = () => cy.get('#outputBase');
export const getBconvConvertButton = () => cy.getByDataTest('bconv-convert');

export const getShowDecimalValueSwitchOn = () => cy.getByDataTest('show-decimal-value-on');
export const getShowDecimalValueSwitchOff = () => cy.getByDataTest('show-decimal-value-off');
export const getDecimalValueInput = () => cy.get('[data-test=bconv-decimal-value] > .MuiInputBase-root > .MuiInputBase-input');

export const getShowComplementSwitchOn = () => cy.getByDataTest('show-complement-on');
export const getShowComplementSwitchOff = () => cy.getByDataTest('show-complement-off');
export const getComplementInput = () => cy.get('[data-test=bconv-complement] > .MuiInputBase-root > .MuiInputBase-input');

export const getConversionToDecimal = () => cy.getByDataTest('conversion-to-decimal');
export const getResultEquation = () => cy.getByDataTest('result-equation');
export const getConversionResult = () => cy.getByDataTest('bconv-result');
export const getIntegralConversionGrid = () => cy.get('#integral-conversion-grid');
