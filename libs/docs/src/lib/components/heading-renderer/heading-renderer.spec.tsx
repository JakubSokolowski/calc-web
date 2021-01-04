import { shallow } from 'enzyme';
import React from 'react';
import { HeadingRenderer } from './heading-renderer';

describe('HeadingRenderer', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <HeadingRenderer level={1}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
