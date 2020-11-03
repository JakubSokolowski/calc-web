import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { AddAtPositionHoverContent } from './add-at-position-hover-content';

describe('AddAtPositionHoverContent', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const result = addPositionalNumbers([a, b]);
    const positionResult = result.positionResults[1];

    beforeEach(() => {
        container = mount(
            <AddAtPositionHoverContent positionResult={positionResult}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
