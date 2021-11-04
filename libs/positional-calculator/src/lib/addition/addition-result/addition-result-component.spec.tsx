import { mount } from 'enzyme';
import React from 'react';
import { AdditionResultComponent } from './addition-result-component';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';

describe('AdditionResult', () => {
    let container;

    const a = fromNumber(14, 10);
    const b = fromNumber(19, 10);
    const result = addPositionalNumbers([a, b]);

    beforeEach(() => {
        container = mount(
            <AdditionResultComponent result={result}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
