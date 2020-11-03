import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from './positional-number-component';

describe('PositionalNumberComponent', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const {numberResult} = addPositionalNumbers([a, b]);
    beforeEach(() => {
        container = mount(
            <PositionalNumberComponent
             base={numberResult.base}
             representation={numberResult.valueInBase}
            />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
