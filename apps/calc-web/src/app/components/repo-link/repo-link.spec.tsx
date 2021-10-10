import { mount } from 'enzyme';
import React from 'react';
import { RepoLink } from './repo-link';

describe('RepoLink', () => {
    let container;

    beforeEach(() => {
        container = mount(
            <RepoLink/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
