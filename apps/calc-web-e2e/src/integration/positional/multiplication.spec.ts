import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getCellByCoords,
    getMultiplicationResult,
    getOperationGrid,
    operationReturnsProperResult
} from '../../support/positional-calculator';

describe('Default multiplication', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two positive numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base: 10
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display proper popover for addition rows
        getCellByCoords(5, 4).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=4');

        getCellByCoords(2, 4).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{3}=6');
    });

    it('should multiply two negative numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base: 10
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply negative and positive numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base: 10
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });
});

describe('Multiplication with extension', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '-6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    // BUG #119
    it('should multiply number by 0', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['123', '0'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '0';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply 0 by number', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['0', '9'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '0';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply two numbers in base 8', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-33', '723'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 8
        };
        const expected = '-30501';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply numbers entered as complements in base 8', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)3156', '(7)6423'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 8
        };
        const expected = '-4547726';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    // BUG #125
    it('should not display any empty columns and should display popover with position result on cell hover', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['12', '8'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '96';

        operationReturnsProperResult(config, expected);

        // desired grid has width of 4 so this cell should not exist
        getCellByCoords(4, 0).should('not.exist');

        // should display popover with proper content
        getCellByCoords(3, 3).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=6');
    });


    it('should show proper information on last multiplier digit tooltip when multiplier is negative', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['12', '-8'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '-96';

        operationReturnsProperResult(config, expected);

        // should display popover with proper content
        getCellByCoords(2, 2).trigger('mouseover')
            .getByDataTest('correction-with-extension-negative')
    });

    it('should show proper information on last multiplier digit tooltip when multiplier is positive', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['12', '8'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '96';

        operationReturnsProperResult(config, expected);

        // should display popover with proper content
        getCellByCoords(2, 1).trigger('mouseover')
            .getByDataTest('correction-with-extension-positive')
    });
});

describe('Multiplication without extension', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two negative numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(9)6745', '(9)8123'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 10
        };
        const expected = '6109635';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display popover with proper content
        getCellByCoords(8, 7).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=5');
    });

    it('should multiply number by 0', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['123', '0'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 10
        };
        const expected = '0';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply 0 by number', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['0', '9'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 10
        };
        const expected = '0';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply positive number by negative', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)3156', '(7)6423'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 8
        };
        const expected = '-4547726';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display popover with proper content
        getCellByCoords(9, 7).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=2');
    });

    it('should multiply negative number by positive', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(7)45', '(0)723'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 8
        };
        const expected = '-30501';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display popover with proper content
        getCellByCoords(6, 5).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=7');
    });

    it('should multiply numbers with fraction part', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)31.12', '(7)64'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 8
        };
        const expected = '-455.7';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should show proper information on last multiplier digit tooltip when multiplier is positive', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['12', '8'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 10
        };
        const expected = '96';

        operationReturnsProperResult(config, expected);

        // should display popover with proper content
        getCellByCoords(3, 1).trigger('mouseover')
            .getByDataTest('correction-without-extension-positive')
    });

    it('should show proper information on last multiplier digit tooltip when multiplier is negative', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['12', '-89'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithoutExtension,
            base: 10
        };
        const expected = '-1068';

        operationReturnsProperResult(config, expected);

        // should display popover with proper content
        getCellByCoords(4, 2).trigger('mouseover')
            .getByDataTest('correction-without-extension-negative')
    });
});
