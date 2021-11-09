import { mount } from 'enzyme';
import React from 'react';
import { AssociatedBaseConverter } from './associated-base-converter';
import { Provider } from 'react-redux';
import { store } from '@calc/core';

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
