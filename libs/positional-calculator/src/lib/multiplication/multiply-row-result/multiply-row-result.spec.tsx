import { mount } from 'enzyme';
import React from 'react';
import { fromNumber, multiplyDefault } from '@calc/calc-arithmetic';
import { MultiplyRowDetails } from './multiply-row-result';

describe('MultiplyRowDetails', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const res = multiplyDefault([a, b]);
    const rowRes = res.stepResults[0];

    beforeEach(() => {
        container = mount(
            <MultiplyRowDetails result={rowRes}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
