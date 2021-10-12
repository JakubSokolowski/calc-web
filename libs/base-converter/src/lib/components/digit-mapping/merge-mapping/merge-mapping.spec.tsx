import { mount } from 'enzyme';
import React from 'react';
import { MergeMapping } from './merge-mapping';
import { DigitMapping } from '@calc/calc-arithmetic';

describe('MergeMapping', () => {
    let container;

    const mapping: DigitMapping = {
        output: [],
        input: []
    };

    beforeEach(() => {
        container = mount(
            <MergeMapping mapping={mapping}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
