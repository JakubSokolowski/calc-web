import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    addOperands,
    getAddOperandButton,
    getCalculateButton,
    hasProperResult,
    operationReturnsProperResult,
    selectOperation,
    setOperationBase
} from '../../support/positional-calculator';
import { getCommonTooltip } from '../../support/common';

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

    it('should prevent calculation when min number of operands is not reached', () => {
        const base = 16;
        const operands = ['FFA'];
        const message = 'Operation allows between 2 and 2 operands';

        selectOperation('Multiplication');
        setOperationBase(base);
        addOperands(operands);

        getCalculateButton().should('be.disabled');
        getCalculateButton().trigger('mouseover', { force: true });
        getCommonTooltip().contains(message);
    });


    it('should prevent calculation when some operand is invalid for base', () => {
        const base = 16;
        const operands = ['FFA', 'ZXC'];
        const message = 'Operands not valid for given base';

        selectOperation('Multiplication');
        setOperationBase(base);
        addOperands(operands);

        getCalculateButton().should('be.disabled');
        getCalculateButton().trigger('mouseover', { force: true });
        getCommonTooltip().contains(message);
    });

    it('should prevent adding additional operands when max is reached for operation', () => {
        const base = 16;
        const operands = ['FFA', 'BBE'];
        const message = 'Maximum number of operands for operation reached';

        selectOperation('Multiplication');
        setOperationBase(base);
        addOperands(operands);

        getAddOperandButton().should('be.disabled');
        getAddOperandButton().trigger('mouseover', { force: true });
        getCommonTooltip().contains(message);
    });
});
