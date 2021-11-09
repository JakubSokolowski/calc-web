import { mount } from 'enzyme';
import React from 'react';
import { ComplementConverterView } from './complement-converter-view';

const history = {
    push: jest.fn()
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => history,
    useLocation: () => ({
        pathname: '/positional/complement-converter'
    })
}));


describe('ComplementConverterView', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <ComplementConverterView />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
