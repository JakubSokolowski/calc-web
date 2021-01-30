import { OperationTemplate } from '@calc/positional-calculator';
import { AlgorithmType, MultiplicationType, OperationType } from '@calc/calc-arithmetic';
import {
    getMultiplicationResult,
    getOperationGrid,
    operationReturnsProperResult
} from '../../support/positional-calculator';

describe('Default multiplication', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two positive numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base: 10
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply two negative numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base: 10
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply negative and positive numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.Default,
            base: 10
        };
        const expected = '6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });
});

describe('Multiplication with extension', () => {
    beforeEach(() => {
        cy.fixCypressSpec(__filename);
        cy.clearLocalStorage();
        cy.visit('#/tools/positional/positional-calculator');
    });

    it('should multiply two numbers', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['78', '-88'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 10
        };
        const expected = '-6864';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
    });

    it('should multiply two numbers in base 8', () => {
        const config: OperationTemplate<AlgorithmType> = {
            operands: ['-33', '723'],
            operation: OperationType.Multiplication,
            algorithm: MultiplicationType.WithExtension,
            base: 8
        };
        const expected = '-30501';

        operationReturnsProperResult(config, expected);

        getMultiplicationResult().toMatchSnapshot();
        getOperationGrid().toMatchSnapshot();
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
});
