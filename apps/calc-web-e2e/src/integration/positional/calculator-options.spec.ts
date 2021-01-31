import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getCalculateButton,
    getMultiplicationResult,
    getOperationGrid, hasProperResult,
    operationReturnsProperResult, selectAlgorithm, selectOperation
} from '../../support/positional-calculator';

describe('Calculator options', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    // BUG #110
    it('should update algorithm to default when operation changes', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expectedMultiplication = '6864';
        const expectedAddition = '166';

        // Run some operation
        operationReturnsProperResult(config, expectedMultiplication);

        // Change algorithm without changing operation
        selectOperation('Addition');
        getCalculateButton().click();

        hasProperResult(expectedAddition);
    });
});
