import { shallow } from 'enzyme';
import React from 'react';
import { CalculatorOptions } from './calculator-options';

describe('CalculatorOptions', () => {
    let container;
    const onSubmit = jest.fn();

    beforeEach(() => {
        container = shallow(
            <CalculatorOptions onSubmit={onSubmit}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
