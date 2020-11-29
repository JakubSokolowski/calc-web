import { mount } from 'enzyme';
import React from 'react';
import { DigitMappingBox } from './digit-mapping-box';
import { DigitMapping } from '@calc/calc-arithmetic';

describe('DigitMappingBox', () => {
    let container;

    const mapping: DigitMapping = {
        output: [],
        input: []
    };

    beforeEach(() => {
        container = mount(
            <DigitMappingBox mapping={mapping}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
