import { mount } from 'enzyme';
import React from 'react';
import { ComplementDetailsRenderer } from './complement-details-renderer';

describe('ComplementDetailsRenderer', () => {
    let container;
    const params = {
        representation: '1234',
        base: 10
    };
    beforeEach(() => {
        container = mount(
            <ComplementDetailsRenderer {...params}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
