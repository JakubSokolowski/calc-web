import { mount } from 'enzyme';
import React from 'react';
import { fromNumberDetailed } from '@calc/calc-arithmetic';
import { FloatingConversionDetails } from './floating-conversion-details';

describe('FloatingConversionDetails', () => {
    let container;
    const conversion = fromNumberDetailed(1234.23,2);

    beforeEach(() => {
        container = mount(
            <FloatingConversionDetails conversion={conversion} precision={10}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
