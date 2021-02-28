import {
    getAdditionResult,
    getCellByCoords,
    getOperationGrid,
    gridHasProperResultRow,
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

    // STUD_REQ_5_1
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

    // STUD_REQ_5_2
    it('should add two decimal numbers in complement representation', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(9)123', '321'],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base
        };
        const expected = '-556';
        const expectedComplement = '(9)444';

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 4, 2);
    });

    // STUD_REQ_5_2
    it('should add negative number, using complement representation', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['123', '-321'],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base
        };
        const expected = '-198';
        const expectedComplement = '(9)802';

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 4, 3);
    });

    // STUD_REQ_5_3
    it('should show proper position details and carries', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['987', '6354'],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base
        };
        const expected = '7341';

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        // grid should grid display with 3 carries
        getCellByCoords(2, 0).contains('1');
        getCellByCoords(3, 0).contains('1');
        getCellByCoords(4, 0).contains('1');

        // should display details with position result and carries
        getCellByCoords(5, 3).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('C_{1}=1')
            .contains('S_{0}=1');

        getCellByCoords(4, 3).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('C_{2}=1')
            .contains('S_{1}=4');

        gridHasProperResultRow(expected, base, 5, 3);
    });

    // STUD_REQ_5_4
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

    it('should add multiple binary numbers for multiplication without extension', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: [
                '1000000',
                '01010110',
                '010101100',
                '1000000000',
                '10000000000',
                '100000000000',
                '1010101000000',
                '(1)0000001000000'
            ],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base: 2
        };

        const expected = '10011000010';

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    // STUD_REQ_5_4
    it('should add 10 numbers together', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: new Array(10).fill('10'),
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base: 10
        };

        const expected = '100';

        operationReturnsProperResult(config, expected);

        getAdditionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });


    // BUG #140
    it('should not crash when addition position results has only zero operands', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['111', '111', '111', '110', '110'],
            operation: OperationType.Addition,
            algorithm: AdditionType.Default,
            base: 2
        };

        const expected = '100001';

        operationReturnsProperResult(config, expected);

        getCellByCoords(0, 0).trigger('mouseover')
            .getByDataTest('add-at-position')
            .contains('S_{7}=0');
    });
});
