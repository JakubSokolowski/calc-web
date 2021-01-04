import { shallow } from 'enzyme';
import React from 'react';
import { FloatingTools } from './floating-tools';

describe('FloatingTools', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <FloatingTools />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
