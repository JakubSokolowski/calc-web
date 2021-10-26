import { mount } from 'enzyme';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { HomeView } from './home-view';

describe('HomeView', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <HashRouter>
                <HomeView/>
            </HashRouter>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
