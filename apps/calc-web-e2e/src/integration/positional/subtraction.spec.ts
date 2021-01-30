import { AlgorithmType, OperationType, SubtractionType } from '@calc/calc-arithmetic';
import {
    getOperationGrid,
    getSubtractionResult,
    operationReturnsProperResult
} from '../../support/positional-calculator';
import { OperationTemplate } from '@calc/positional-calculator';

describe('Subtraction', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should subtract two decimal numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['321', '123'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base: 10
        };
        const expected = '198';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should subtract two decimal numbers with fraction part', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['98723.123', '7643.87543'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base: 10
        };
        const expected = '91079.24757';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });
});
