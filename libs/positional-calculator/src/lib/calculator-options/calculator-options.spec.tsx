import { shallow } from 'enzyme';
import React from 'react';
import { CalculatorOptions } from './calculator-options';

describe('CalculatorOptions', () => {
    let container;
    const onSubmit = jest.fn();
    const onOperationChange = jest.fn();

    beforeEach(() => {
        container = shallow(
            <CalculatorOptions onSubmit={onSubmit} onOperationChange={onOperationChange}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
