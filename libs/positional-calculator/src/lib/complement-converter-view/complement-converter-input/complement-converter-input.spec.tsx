import { mount } from 'enzyme';
import React from 'react';
import { ComplementConverterInput } from './complement-converter-input';

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


describe('ComplementConverterInput', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <ComplementConverterInput/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
