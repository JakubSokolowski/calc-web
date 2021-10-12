import { shallow } from 'enzyme';
import React from 'react';
import { DocRoute } from '@calc/docs';

describe('DocRoute', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <DocRoute  mapping={{}}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
