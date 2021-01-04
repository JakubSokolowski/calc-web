import { shallow } from 'enzyme';
import React from 'react';
import SiderMenu from './sider-menu';

describe('SiderMenu', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <SiderMenu/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
