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

    it('should divide two positive numbers with fraction division result v2', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['1233', '98'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '12.58163';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 9, 0);
    });


    it('should divide integer number by divisor with fraction part', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['122', '12.1'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '10.08264';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 9, 0);
    });

    it('should divide two numbers with fraction part', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['122.1', '12.1'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '10.09090';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 9, 0);
    });
});
