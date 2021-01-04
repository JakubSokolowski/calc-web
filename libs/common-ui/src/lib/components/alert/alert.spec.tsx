import { mount } from 'enzyme';
import React from 'react';
import { Alert } from './alert';

describe('Alert', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <Alert/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
