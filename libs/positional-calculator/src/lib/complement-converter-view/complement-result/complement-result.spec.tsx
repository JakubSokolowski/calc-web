import { mount } from 'enzyme';
import React from 'react';
import { ComplementResult } from './complement-result';
import { getComplementWithDetails } from '@calc/calc-arithmetic';

describe('ComplementConverterInput', () => {
    let container;
    const result = getComplementWithDetails('1234', 10);

    beforeEach(() => {
        container = mount(
            <ComplementResult result={result}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
