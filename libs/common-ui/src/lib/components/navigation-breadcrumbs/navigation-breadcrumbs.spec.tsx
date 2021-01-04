import { mount } from 'enzyme';
import React from 'react';
import { NavigationBreadcrumbs } from './navigation-breadcrumbs';

describe('NavigationBreadcrumbs', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <NavigationBreadcrumbs path={'/tools/positional'}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
