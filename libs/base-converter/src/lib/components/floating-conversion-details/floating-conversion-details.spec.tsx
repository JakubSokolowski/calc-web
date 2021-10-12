import { mount } from 'enzyme';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';
import { FloatingConversionDetails } from './floating-conversion-details';

describe('FloatingConversionDetails', () => {
    let container;
    const conversion = fromNumber(1234.23,2);

    beforeEach(() => {
        container = mount(
            <FloatingConversionDetails conversion={conversion} precision={10}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
