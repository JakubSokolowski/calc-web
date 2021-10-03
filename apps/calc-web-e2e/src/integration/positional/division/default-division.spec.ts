import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getDivisionResult,
    getOperationGrid,
    gridHasProperResultRow,
    operationReturnsProperResult
} from '../../../support/positional-calculator';

describe('Default Division', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should divide two positive numbers with integer division result', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['1224', '12'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '102';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 4, 0);
    });

    it('should divide two integer numbers with fraction division result', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['122', '12'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '10.16666';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 8, 0);
    });
});
