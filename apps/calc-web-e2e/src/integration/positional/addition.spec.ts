import {
    getAdditionResult,
    getOperationGrid,
    operationReturnsProperResult
} from '../../support/positional-calculator';
import { OperationTemplate } from '@calc/positional-calculator';
import { AdditionType, AlgorithmType, OperationType } from '@calc/calc-arithmetic';

describe('Addition', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should add two decimal numbers together', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['123', '321'],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base: 10
        };
        const expected = '444';

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should add multiple binary numbers together', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: [
                '100101011001101',    // 19149
                '1101011101101',      // 6893
                '-11101101111011111', // 121823
                '111111111',          // 511
                '11101010111',        // 1879
                '110111011'           // 443
            ],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base: 2
        };

        const expected = '-10110101100010100'; // -92948

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });
});
