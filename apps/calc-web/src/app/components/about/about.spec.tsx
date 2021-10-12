import { mount } from 'enzyme';
import React from 'react';
import { About } from './about';

describe('About', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <About />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
