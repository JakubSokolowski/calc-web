import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getCellByCoords,
    getMultiplicationResult,
    getOperationGrid,
    gridHasProperResultRow,
    operationReturnsProperResult
} from '../../../support/positional-calculator';

describe('Multiplication with extension', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two numbers', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base
        };
        const expected = '-6864';
        const expectedComplement = '(9)3136';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 5, 6);
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
        const base = 8;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-33', '723'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base
        };
        const expected = '-30501';
        const expectedComplement = '(7)47277';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 6, 5);
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

    // BUG #151
    it('should display proper grid with same-length rows for two U2 numbers with fraction parts', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)1101001.101', '(1)1101.111'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base
        };
        const expected = '-11100000.011101';
        const expectedComplement = '(1)100011111.100011';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 18, 11);
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
        getCellByCoords(3, 2).trigger('mouseover')
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

    it('should multiply two U2 numbers', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(1)01011', '(1)000110'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base
        };
        const expected = '10011000010';
        const expectedComplement = '(0)10011000010';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display proper popover for addition rows
        getCellByCoords(12, 10).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=0');

        getCellByCoords(2, 10).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{10}=1');

        gridHasProperResultRow(expectedComplement, base, 12, 10);
    });
});
