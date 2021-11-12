import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, DivisionType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    addOperand,
    addOperands,
    calculatePositional,
    checkOperationResult, enterOperationParams,
    getAddOperandButton,
    getCalculateButton,
    hasProperResult,
    operationReturnsProperResult, selectAlgorithm,
    selectOperation,
    setOperationBase,
    setOperationPrecision
} from '../../support/positional-calculator';
import { getCommonTooltip } from '../../support/common';
import { changeLanguage } from '../../support/language';
import { Language } from '@calc/i18n';

describe('Calculator options', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
        changeLanguage(Language.en);
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
        const message = 'Some operand is not valid';

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
        // proper result should be displayed without without editing inputs and clicking submit
        const expected = '-6864';
        checkOperationResult(expected);
    });

    // BUG #268
    it('should disable calculate button when precision is not valid', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Division,
            algorithm: DivisionType.Default,
            base: 10,
            precision: 10
        };
        enterOperationParams(config);
        getCalculateButton().should('not.be.disabled');

        setOperationPrecision(20);
        getCalculateButton().should('be.disabled');

        setOperationPrecision(10);
        getCalculateButton().should('not.be.disabled');
    });

    // BUG #268
    it('should disable calculate button when base is not valid', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Division,
            algorithm: DivisionType.Default,
            base: 10,
            precision: 5
        };
        enterOperationParams(config);
        getCalculateButton().should('not.be.disabled');

        setOperationBase(1);
        getCalculateButton().should('be.disabled');

        setOperationBase(10);
        getCalculateButton().should('not.be.disabled');
    });

    // BUG #269
    it('should not throw any errors when add operand is pressed and base is invalid', () => {
        // set valid base and add some operand
        setOperationBase(10);
        addOperands(['25']);

        // change base to invalid
        setOperationBase(1);
        addOperand('20', 1);
        getCalculateButton().should('be.disabled');

        // change base back to valid
        setOperationBase(10);
        getCalculateButton().should('not.be.disabled');

        // change bases and check whether operands are valid
        setOperationBase(2);
        getCalculateButton().should('be.disabled');
        setOperationBase(3);
        getCalculateButton().should('be.disabled');
        setOperationBase(4);
        getCalculateButton().should('be.disabled');
        setOperationBase(5);
        getCalculateButton().should('be.disabled');
        setOperationBase(6);
        getCalculateButton().should('not.be.disabled');
    });
});
