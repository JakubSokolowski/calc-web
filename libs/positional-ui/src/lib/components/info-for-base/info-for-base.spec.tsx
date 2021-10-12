import { mount } from 'enzyme';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';
import { InfoForBase } from './info-for-base';
import { DisplayBase } from '../../models';

describe('InfoForBase', () => {
    let container;

    const input = fromNumber(10, 10).result;
    const displayBase: DisplayBase = {
        base: 8,
        showComplement: true
    };

    beforeEach(() => {
        container = mount(
            <InfoForBase input={input} display={displayBase}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
    
});
