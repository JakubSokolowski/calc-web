import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getDivisionResult,
    getMultiplicationResult,
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

    it('should divide two positive numbers with even division result', () => {
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
});
