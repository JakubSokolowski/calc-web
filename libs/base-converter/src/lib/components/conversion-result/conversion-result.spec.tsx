import { mount } from 'enzyme';
import React from 'react';
import { fromNumberDetailed } from '@calc/calc-arithmetic';
import { ConversionResult } from './conversion-result';

describe('ConversionResult', () => {
    let container;
    const conversion = fromNumberDetailed(10, 2);

    beforeEach(() => {
        container = mount(
            <ConversionResult conversion={conversion}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
