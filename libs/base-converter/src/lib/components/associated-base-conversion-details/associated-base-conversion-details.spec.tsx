import { mount } from 'enzyme';
import React from 'react';
import { AssociatedBaseConversion, convertUsingAssociatedBases } from '@calc/calc-arithmetic';
import { AssociatedBaseConversionDetails } from './associated-base-conversion-details';

describe('AssociatedBaseConversionDetails', () => {
    let container;
    const conversion = convertUsingAssociatedBases('FFAF',16, 2);

    beforeEach(() => {
        container = mount(
            <AssociatedBaseConversionDetails conversion={conversion.stages[0] as AssociatedBaseConversion}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
