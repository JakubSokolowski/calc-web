import { mount } from 'enzyme';
import React from 'react';
import { BaseConverterComponent } from './base-converter-component';
import { Provider } from 'react-redux';
import { store } from '@calc/core';

describe('BaseConverterComponent', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <Provider store={store}>
                <BaseConverterComponent />
            </Provider>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
