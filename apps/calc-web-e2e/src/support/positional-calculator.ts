import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType } from '@calc/calc-arithmetic';

export const getByDataResult = (result: string) => cy.get(`[data-result="${result}"]`);

export const hasProperResult = (result: string) => getByDataResult(result);

export const getAddOperandButton = () => cy.getByDataTest('add-operand-btn');

export const getOperandListInput = (index: number) => {
    return cy.get(`[data-test=operand-input-${index}] > .MuiInputBase-root > .MuiInputBase-input`);
};

export const addOperand = (representation: string, index = 0) => {
    getAddOperandButton().click();
    getOperandListInput(index)
        .clear()
        .type(representation);
};

export const addOperands = (operands: string[]) => {
    operands.forEach(addOperand);
};

export const selectOperation = (operation: string) => {
    cy.getByDataTest('operation-select').click();
    cy.get(`[data-value="${operation}"]`).click();
};

export const selectAlgorithm = (algorithm: string) => {
    cy.getByDataTest('algorithm-select').click();
    cy.get(`[data-value="${algorithm}"]`).click();
};

export const setOperationBase = (base: number) => {
    cy.get('#base').clear().type(`${base}`)
};

export const getCalculateButton = () => cy.getByDataTest('calculate');

export const getAdditionResult = () => cy.getByDataTest('addition-result');
export const getSubtractionResult = () => cy.getByDataTest('subtraction-result');
export const getMultiplicationResult = () => cy.getByDataTest('multiplication-result');

export const getOperationGrid = () => cy.get('#operation-grid');
export const getOperationGridSaveButton = () => cy.getByDataTest('operation-grid-save');


export const calculatePositional = (config: OperationTemplate<AlgorithmType>) => {
    const {algorithm, base, operands, operation} = config;
    setOperationBase(base);
    selectAlgorithm(algorithm);
    selectOperation(operation);
    operands.forEach((op, idx) => addOperand(op, idx));
    getCalculateButton().click();
};


export const operationReturnsProperResult = (config: OperationTemplate<AlgorithmType>, result: string) => {
    calculatePositional(config);
    hasProperResult(result);
};

export const getCellByCoords = (x: number, y: number) => {
    return cy.getByDataTest(`operation-grid-${x}-${y}`)
};

