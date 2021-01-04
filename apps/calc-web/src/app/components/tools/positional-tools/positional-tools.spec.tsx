import { shallow } from 'enzyme';
import React from 'react';
import { PositionalTools } from './positional-tools';

describe('PositionalTools', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <PositionalTools />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
