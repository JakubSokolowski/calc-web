import { mount } from 'enzyme';
import React from 'react';
import { ComplementResult } from './complement-result';
import { getComplementWithDetails } from '@calc/calc-arithmetic';

describe('ComplementConverterInput', () => {
    let container;
    const number = getComplementWithDetails('1234', 10).inputNumber;

    beforeEach(() => {
        container = mount(
            <ComplementResult number={number}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
