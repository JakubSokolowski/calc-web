import { mount } from 'enzyme';
import React from 'react';
import { ComplementConverterInput } from './complement-converter-input';

describe('ComplementConverterInput', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <ComplementConverterInput/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
