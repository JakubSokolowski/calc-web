import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { OperationResultComponent } from './operation-result';

describe('OperationResult', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const result = addPositionalNumbers([a, b]);
    beforeEach(() => {
        container = mount(
            <OperationResultComponent result={result}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
