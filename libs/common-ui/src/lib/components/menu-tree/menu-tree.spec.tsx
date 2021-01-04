import { mount } from 'enzyme';
import React from 'react';
import { MenuTree } from '@calc/common-ui';

describe('MenuTree', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <MenuTree nodes={[]}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
