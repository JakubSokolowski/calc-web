import { AlgorithmType, OperationType, SubtractionType } from '@calc/calc-arithmetic';
import {
    getCellByCoords,
    getOperationGrid,
    getSubtractionResult, gridHasProperResultRow,
    operationReturnsProperResult
} from '../../support/positional-calculator';
import { OperationTemplate } from '@calc/positional-calculator';

describe('Subtraction', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    // STUD_REQ_11_1
    it('should subtract two positive decimal numbers, smaller from larger', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['321', '123'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base
        };
        const expected = '198';
        const expectedComplement = '(0)198';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 4, 4);

        // should display details with position result operand digits after transformations
        getCellByCoords(4, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{0}=11-3');

        getCellByCoords(3, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{1}=11-2');
    });

    // STUD_REQ_11_1
    it('should subtract two decimal numbers, larger from smaller', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['14123', '78899'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base
        };
        const expected = '-64776';
        const expectedComplement = '(9)35224';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 6, 4);

        // should display details with position result operand digits after transformations
        getCellByCoords(6, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{0}=13-9');

        getCellByCoords(2, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{4}=10-7');
    });

    // STUD_REQ_11_2
    it('should subtract two decimal numbers, entered as complement', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)14123.451', '(9)78899.769'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base
        };
        const expected = '35223.682';
        const expectedComplement = '(0)35223.682';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 9, 4);

        // should display details with position result operand digits after transformations
        getCellByCoords(9, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{-3}=11-9');

        getCellByCoords(2, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{4}=10-7');
    });

    // STUD_REQ_11_2
    it('should convert signed negative number to complement and then subtract', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)14123.451', '-21100.231'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base
        };
        const expected = '35223.682';
        const expectedComplement = '(0)35223.682';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 9, 4);

        // should display details with position result operand digits after transformations
        getCellByCoords(9, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{-3}=11-9');

        getCellByCoords(2, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{4}=10-7');
    });

    // STUD_REQ_11_3
    it('should display proper borrow chain for positions', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['(0)14123.451', '-21100.231'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base
        };
        const expected = '35223.682';

        operationReturnsProperResult(config, expected);

        // digit after borrowing from next position, not crossed out
        getCellByCoords(8, 0)
            .contains('14');

        const crossedOut = 'crossedOutCell';

        // digit after being borrowed from, crossed out
        getCellByCoords(8, 1)
            .contains('4')
            .invoke('attr', 'class')
            .then(classNames => classNames.toString())
            .should('contain', crossedOut);

        // initial digit, crossed out
        getCellByCoords(8, 2)
            .contains('5')
            .invoke('attr', 'class')
            .then(classNames => classNames.toString())
            .should('contain', crossedOut);
    });

    it('should subtract two decimal numbers with fraction part', () => {
        const base = 10;
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['98723.123', '7643.87543'],
            operation: OperationType.Subtraction,
            algorithm: SubtractionType.Default,
            base
        };
        const expected = '91079.24757';
        const expectedComplement = '(0)91079.24757';

        operationReturnsProperResult(config, expected);

        getSubtractionResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();

        gridHasProperResultRow(expectedComplement, base, 11, 4);

        // should display details with position result operand digits after transformations
        getCellByCoords(11, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{-5}=10-3');

        getCellByCoords(6, 4).trigger('mouseover', {force: true})
            .getByDataTest('subtract-at-position')
            .contains('D_{0}=12-3');
    });
});
