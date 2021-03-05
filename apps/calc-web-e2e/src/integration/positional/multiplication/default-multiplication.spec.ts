import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getCellByCoords,
    getMultiplicationResult,
    getOperationGrid, gridHasProperResultRow,
    operationReturnsProperResult
} from '../../../support/positional-calculator';

describe('Default Multiplication', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two positive numbers', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base
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

        gridHasProperResultRow(expected, base, 5, 4);
    });

    it('should multiply two negative numbers', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 5, 4);
    });

    it('should multiply negative and positive numbers', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 5, 4);
    });

    it('should multiply two U2 numbers', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(1)01011', '(1)000110'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '10011000010';
        const expectedComplement = '(0)10011000010';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display proper popover for addition rows
        getCellByCoords(12, 8).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{0}=0');

        getCellByCoords(2, 8).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{10}=1');

        gridHasProperResultRow(expectedComplement, base, 12, 8);
    });
});
