import { shallow } from 'enzyme';
import React from 'react';
import { ViewWrapper } from '@calc/common-ui';

describe('ViewWrapper', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <ViewWrapper path='/tools/positional'/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
