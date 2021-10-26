import { mount } from 'enzyme';
import React from 'react';
import { BaseConverterComponent } from './base-converter-component';
import { Provider } from 'react-redux';
import { store } from '@calc/core';

const history = {
    push: jest.fn(),
    replace: jest.fn()
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => history,
    useLocation: () => ({
        pathname: '/tools/base-converter'
    })
}));

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
