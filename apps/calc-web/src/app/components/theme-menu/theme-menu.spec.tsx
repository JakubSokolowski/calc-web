import { mount } from 'enzyme';
import React from 'react';
import { ThemeMenu } from './theme-menu';
import { Provider } from 'react-redux';
import { store } from '@calc/core';

describe('ThemeMenu', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <Provider store={store}>
                <ThemeMenu/>
            </Provider>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
