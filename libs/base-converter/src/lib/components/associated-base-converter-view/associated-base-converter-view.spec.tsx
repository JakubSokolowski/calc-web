import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@calc/core';
import { AssociatedBaseConverterView } from './associated-base-converter-view';

const history = {
    push: jest.fn()
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => history,
    useLocation: () => ({
        pathname: '/positional/associated-base-converter'
    })
}));

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
