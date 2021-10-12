import { mount } from 'enzyme';
import React from 'react';
import { AssociatedBaseConverter } from './associated-base-converter';
import { Provider } from 'react-redux';
import { store } from '@calc/core';

describe('AssociatedBaseConverter', () => {
    let container;
    const onConversionChange = jest.fn();

    beforeEach(() => {
        container = mount(
            <Provider store={store}>
                <AssociatedBaseConverter onConversionChange={onConversionChange}/>
            </Provider>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
