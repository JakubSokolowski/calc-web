import React from 'react';
import { mount } from 'enzyme';
import { LanguageMenu } from './language-menu';
import { Provider } from 'react-redux';
import { store } from '@calc/core';

describe('LanguageMenu', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <Provider store={store}>
                <LanguageMenu/>
            </Provider>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
