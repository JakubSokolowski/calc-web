import { mount } from 'enzyme';
import React from 'react';
import { ScrollSpy } from './scroll-spy';

describe('ScrollSpy', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <ScrollSpy  entries={[]}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
