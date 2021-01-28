import { mount } from 'enzyme';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';
import { AdditionalInfo } from './additional-info';

describe('AdditionalInfo', () => {
    let container;

    const input = fromNumber(10, 16).result;

    beforeEach(() => {
        container = mount(
            <AdditionalInfo input={input}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
