import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, splitToDigitsList } from '@calc/calc-arithmetic';

export const getByDataResult = (result: string) => cy.get(`[data-result="${result}"]`);

export const hasProperResult = (result: string) => getByDataResult(result);

export const hasSuccessNotification = () => getOperationSuccessNotification();

export const getOperationSuccessNotification = () => cy.getByDataTest('operation-success');

export const getAddOperandButton = () => cy.getByDataTest('add-operand-btn');

export const getOperandListInput = (index: number) => {
    return cy.get(`[data-test=operand-input-${index}] > .MuiInputBase-root > .MuiInputBase-input`);
};

export const addOperand = (representation: string, index = 0) => {
    getAddOperandButton().click();
    getOperandListInput(index).clear().type(representation);
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
    cy.get('#base').clear().type(`${base}`);
};

export const getCalculateButton = () => cy.getByDataTest('calculate');

export const getAdditionResult = () => cy.getByDataTest('addition-result');
export const getSubtractionResult = () => cy.getByDataTest('subtraction-result');
export const getMultiplicationResult = () => cy.getByDataTest('multiplication-result');
export const getDivisionResult = () => cy.getByDataTest('division-result');

export const getOperationGrid = () => cy.get('#operation-grid');
export const getOperationGridSaveButton = () => cy.getByDataTest('operation-grid-save');

export const calculatePositional = (config: OperationTemplate<AlgorithmType>) => {
    enterOperationParams(config);
    getCalculateButton().click();
};

export const enterOperationParams = (config: OperationTemplate<AlgorithmType>) => {
    const { algorithm, base, operands, operation } = config;
    setOperationBase(base);
    selectAlgorithm(algorithm);
    selectOperation(operation);
    operands.forEach((op, idx) => addOperand(op, idx));
};

export const operationReturnsProperResult = (config: OperationTemplate<AlgorithmType>, result: string) => {
    calculatePositional(config);
    checkOperationResult(config, result);
};

export const checkOperationResult = (config: OperationTemplate<AlgorithmType>, result: string) => {
    hasProperResult(result);
    hasSuccessNotification();
};


export const gridHasProperResultRow = (
    representation: string,
    base: number,
    bottomRightX: number,
    bottomRightY: number
) => {
    const stripped = representation.replace('.', '').replace('(', '').replace(')', '');

    const asDigits = splitToDigitsList(stripped, base);
    const positionsAscending = asDigits.reverse();

    positionsAscending.forEach((d, index) => {
        getCellByCoords(bottomRightX - index, bottomRightY).contains(d.representationInBase);
    });
};

export const gridHasProperSdRow = (representation: string, sdRowEndX: number, sdRowEndY: number) => {
    const sdDigits = representation.split(',').reverse();

    sdDigits.forEach((d, index) => {
        getCellByCoords(sdRowEndX - index, sdRowEndY)
            .contains(d)
            .trigger('mouseover', {force: true})
            .getByDataTest(`sd-by-${d}-details`);
    });
};

export const getCellByCoords = (x: number, y: number) => {
    return cy.getByDataTest(`operation-grid-${x}-${y}`);
};
