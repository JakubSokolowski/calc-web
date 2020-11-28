import React from 'react';
import { shallow } from 'enzyme';
import { BinaryButton } from './binary-button';


describe('BinaryButton', () => {
    let container;

    beforeEach(() => {
        container = shallow(
          <BinaryButton/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
