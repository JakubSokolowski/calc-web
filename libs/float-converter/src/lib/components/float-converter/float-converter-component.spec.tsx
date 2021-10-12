import React from 'react';
import { mount } from 'enzyme';
import { FloatConverterComponent } from './float-converter-component';


describe('FloatConverterComponent', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <FloatConverterComponent/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
