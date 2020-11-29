import { mount } from 'enzyme';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';
import { ConversionResult } from './conversion-result';

describe('ConversionResult', () => {
    let container;
    const conversion = fromNumber(10, 2);

    beforeEach(() => {
        container = mount(
            <ConversionResult conversion={conversion}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
