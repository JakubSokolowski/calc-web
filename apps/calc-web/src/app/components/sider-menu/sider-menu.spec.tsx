import { mount } from 'enzyme';
import React from 'react';
import SiderMenu from './sider-menu';

describe('SiderMenu', () => {
    let container;
    
    beforeEach(() => {
        container = mount(
            <SiderMenu/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
