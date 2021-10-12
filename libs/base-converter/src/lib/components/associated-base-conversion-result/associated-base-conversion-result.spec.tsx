import { mount } from 'enzyme';
import React from 'react';
import { AssociatedBaseConversion, convertUsingAssociatedBases } from '@calc/calc-arithmetic';
import { AssociatedBaseConversionResult } from './associated-base-conversion-result';

describe('AssociatedBaseConversionResult', () => {
    let container;
    const conversion = convertUsingAssociatedBases('FFAF',16, 2);

    beforeEach(() => {
        container = mount(
            <AssociatedBaseConversionResult conversion={conversion.stages[0] as AssociatedBaseConversion}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
