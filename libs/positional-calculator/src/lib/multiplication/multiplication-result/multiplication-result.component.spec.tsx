import { mount } from 'enzyme';
import React from 'react';
import { MultiplicationResultComponent } from './multiplication-result.component';
import { fromNumber, multiplyDefault } from '@calc/calc-arithmetic';

describe('MultiplicationResultComponent', () => {
    let container;

    const a = fromNumber(10, 10);
    const b = fromNumber(15, 10);
    const result = multiplyDefault([a, b]);

    beforeEach(() => {
        container = mount(
            <MultiplicationResultComponent result={result}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
