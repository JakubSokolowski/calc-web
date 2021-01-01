import { mount } from 'enzyme';
import React from 'react';
import { Version } from './version';

describe('Version', () => {
    let container;
    
    beforeEach(() => {
        container = mount(
            <Version />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
