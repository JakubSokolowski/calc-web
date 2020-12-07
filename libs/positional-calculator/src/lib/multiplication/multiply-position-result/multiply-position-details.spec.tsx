import { mount } from 'enzyme';
import React from 'react';
import { fromNumber, multiplyPositionalNumbers } from '@calc/calc-arithmetic';
import { MultiplyPositionDetails } from './multiply-position-details';

describe('MultiplyPositionDetails', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const res = multiplyPositionalNumbers([a, b]);
    const rowRes = res.stepResults[0].rowPositionResults[0];

    beforeEach(() => {
        container = mount(
            <MultiplyPositionDetails result={rowRes}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
