import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@calc/core';
import { AssociatedBaseConverterView } from '@calc/base-converter';

describe('AssociatedBaseConverterView', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <Provider store={store}>
                <AssociatedBaseConverterView />
            </Provider>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
