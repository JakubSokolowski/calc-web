import { mount } from 'enzyme';
import React from 'react';
import { fromNumber, multiplyDefault } from '@calc/calc-arithmetic';
import { MultiplyPositionDetails } from './multiply-position-details';

describe('MultiplyPositionDetails', () => {
    let container;

    const a = fromNumber(76, 10);
    const b = fromNumber(9, 10);
    const res = multiplyDefault([a, b]);
    const rowRes = res.stepResults[0].rowPositionResults[1];

    beforeEach(() => {
        container = mount(
            <MultiplyPositionDetails result={rowRes}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
