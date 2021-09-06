import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getCellByCoords,
    getMultiplicationResult,
    getOperationGrid,
    gridHasProperResultRow,
    gridHasProperSdRow,
    operationReturnsProperResult,
} from '../../../support/positional-calculator';

describe('BoothMcSorleyAlt Multiplication', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two U2 numbers', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(1)01011', '(1)000110'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.BoothMcSorleyAlt,
            base,
        };
        const expected = '10011000010';
        const expectedSD = '-1,0,0,1,0,-1,0';
        const expectedComplement = '(0)010011000010';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // should display proper popover for addition rows
        getCellByCoords(13, 11).trigger('mouseover').getByDataTest('add-at-position').contains('S_{0}=0');

        getCellByCoords(3, 11).trigger('mouseover').getByDataTest('add-at-position').contains('S_{10}=1');

        gridHasProperResultRow(expectedComplement, base, 13, 11);
        gridHasProperSdRow(expectedSD, 13, 3);
    });

    it('should display proper SD groups on SD multiplier digit hover', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(1)01011', '(1)000110'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.BoothMcSorleyAlt,
            base,
        };
        const expected = '10011000010';

        operationReturnsProperResult(config, expected);
        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        getCellByCoords(13, 3).trigger('mouseover').getByDataTest('sd-by-0-details');

        getCellByCoords(10, 3).trigger('mouseover').getByDataTest('sd-by-1-details');

        getCellByCoords(7, 3).trigger('mouseover').getByDataTest('sd-by--1-details');
    });

    it('should multiply two U2 numbers with positive multiplier', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(1)01011', '(0)110'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.BoothMcSorleyAlt,
            base,
        };
        const expected = '-1111110';
        const expectedComplement = '(1)0000010';
        const expectedSD = '0,0,1,0,-1,0';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        getCellByCoords(11, 10).trigger('mouseover').getByDataTest('add-at-position').contains('S_{0}=0');

        getCellByCoords(4, 10).trigger('mouseover').getByDataTest('add-at-position').contains('S_{7}=1');

        gridHasProperResultRow(expectedComplement, base, 11, 10);
        gridHasProperSdRow(expectedSD, 11, 3);
    });

    it('should multiply two U2 numbers with multiplicand shorter than multiplier', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)1101001', '(1)1101'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.BoothMcSorleyAlt,
            base,
        };
        const expected = '-100111011';
        const expectedComplement = '(1)011000101';
        const expectedSD = '0,0,0,0,0,0,-1,-1';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 15, 12);
        gridHasProperSdRow(expectedSD, 15, 3);
    });

    it('should multiply two U2 numbers with fraction parts', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)1101001.101', '(1)1101.111'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.BoothMcSorleyAlt,
            base,
        };
        const expected = '-11100000.011101';
        const expectedComplement = '(1)00011111.100011';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 21, 15);
    });

    it('should display proper SD groups on SD multiplier digit hover', () => {
        const base = 2;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)1101001.101', '(1)1101.111'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.BoothMcSorleyAlt,
            base,
        };
        const expected = '-11100000.011101';
        const expectedSD = '0,0,0,0,0,0,-1,0,0,0,-1';

        operationReturnsProperResult(config, expected);
        gridHasProperSdRow(expectedSD, 21, 3);
    });
});
