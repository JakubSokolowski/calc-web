import { mount } from 'enzyme';
import React from 'react';
import { HomeView } from './home-view';

describe('HomeView', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <HomeView/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
