import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    enterOperationParams,
    getCalculateButton,
    getDivisionResult,
    getOperationGrid,
    gridHasProperDivisionStepDetails,
    gridHasProperResultRow,
    operationReturnsProperResult,
    selectOperation
} from '../../../support/positional-calculator';
import { changeLanguage } from '../../../support/language';
import { Language } from '@calc/i18n';

describe('Default Division', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
        changeLanguage(Language.en);
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
        gridHasProperDivisionStepDetails(expected, base, 2, 0);
    });

    it('should divide positive and negative numbers', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['1224', '-12'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '-102';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 4, 0);
        gridHasProperDivisionStepDetails(expected, base, 2, 0);
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
        gridHasProperDivisionStepDetails(expected, base, 2, 0);
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
        gridHasProperDivisionStepDetails(expected, base, 3, 0);
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
        gridHasProperDivisionStepDetails(expected, base, 3, 0);
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
        gridHasProperDivisionStepDetails(expected, base, 3, 0);
    });

    it('should divide number by divisor between 0 and 1', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['122.1', '0.1'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '1221';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 4, 0);
        gridHasProperDivisionStepDetails(expected, base, 1, 0);
    });

    it('should divide number by itself', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['122.1', '122.1'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '1';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 4, 0);
        gridHasProperDivisionStepDetails(expected, base, 4, 0);
    });

    it('should divide smaller dividend with fraction part by larger divisor without fraction part', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['11.7662', '231'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '0.05093';

        // this case will have excess leading zero in grid but none in actual result
        const expectedGrid = '00.05093';

        operationReturnsProperResult(config, expected);

        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expected, base, 7, 0);
        gridHasProperDivisionStepDetails(expectedGrid, base, 1, 0);
    });

    // BUG #183
    it('should divide 1.1/100', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['1.1', '100'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '0.011';

        operationReturnsProperResult(config, expected);
        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    // BUG #185
    it('should divide 1/100', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['1', '100'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '0.01';

        operationReturnsProperResult(config, expected);
        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should divide 0 by num', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['0', '100'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };
        const expected = '0';

        operationReturnsProperResult(config, expected);
        getDivisionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should prevent division by 0', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['100', '0'],
            operation: OperationType.Division,
            algorithm: MultiplicationType.Default,
            base
        };

        enterOperationParams(config);
        getCalculateButton().should('be.disabled');
        cy.get('.MuiFormHelperText-root').contains('Cannot divide by 0');
    });

    it('should prevent division by 0 when operation changes to division and divisor would be 0', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['100', '0'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base
        };
        enterOperationParams(config);
        selectOperation(OperationType.Division);
        getCalculateButton().should('be.disabled');
        cy.get('.MuiFormHelperText-root').contains('Cannot divide by 0');
    });
});
