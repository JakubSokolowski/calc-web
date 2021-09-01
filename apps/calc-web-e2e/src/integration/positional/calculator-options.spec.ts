import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    addOperands,
    calculatePositional,
    checkOperationResult,
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

    // BUG #145
    it('should enable calculation when base was changed to match operands', () => {
        const base = 2;
        const operands = ['(1)010101', '(0)1101'];

        // Default base is 10, enter operands
        selectOperation('Multiplication');
        addOperands(operands);
        getCalculateButton().should('be.disabled');

        // Update base to match operands
        setOperationBase(base);
        getCalculateButton().should('be.enabled');
    });

    it('should update url search params with operation data after submit', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base
        };

        calculatePositional(config);

        const expectedParams = '?operation=multiplication&algorithm=withextension&base=10&op=78&op=-88';
        cy.location('href').should('include', expectedParams);
    });

    it('should run calculation from url params, if redirected by url', () => {
        const params = '?operation=multiplication&algorithm=withextension&base=10&op=78&op=-88';
        cy.visit(`#/tools/positional/positional-calculator${params}`);
        cy.reload();

        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base
        };

        // proper result should be displayed without without editing inputs and clicking submit
        const expected = '-6864';
        checkOperationResult(config, expected);
    })
});
