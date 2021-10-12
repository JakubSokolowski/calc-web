import { mount } from 'enzyme';
import React from 'react';
import { DigitMapping } from '@calc/calc-arithmetic';
import { SplitMapping } from './split-mapping';

describe('SplitMapping', () => {
    let container;

    const mapping: DigitMapping = {
        output: [],
        input: []
    };

    beforeEach(() => {
        container = mount(
            <SplitMapping mapping={mapping}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
