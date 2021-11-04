import { mount } from 'enzyme';
import React from 'react';
import { fromString, fromStringDetailed } from '@calc/calc-arithmetic';
import { IntegralConversionDetails } from './integral-conversion-details';

describe('IntegralConversionDetails', () => {
    let container;
    const conversion = fromStringDetailed('221232', 5, 2);

    beforeEach(() => {
        container = mount(
            <IntegralConversionDetails conversion={conversion}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
