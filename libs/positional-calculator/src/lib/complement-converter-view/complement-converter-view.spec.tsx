import { mount } from 'enzyme';
import React from 'react';
import { ComplementConverterView } from './complement-converter-view';

describe('ComplementConverterView', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <ComplementConverterView />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
