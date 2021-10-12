import { mount } from 'enzyme';
import React from 'react';
import { AdditionType, AlgorithmType, OperationType } from '@calc/calc-arithmetic';
import { OperationRenderer} from './operation-renderer';
import { OperationTemplate } from '../core/models/operation-template';

describe('OperationRenderer', () => {
    let container;

    const params: OperationTemplate<AlgorithmType> = {
        algorithm: AdditionType.Default,
        operation: OperationType.Addition,
        operands: ['123', '123'],
        base: 10
    };

    beforeEach(() => {
        container = mount(
            <OperationRenderer {...params} />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
