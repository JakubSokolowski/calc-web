import { shallow } from 'enzyme';
import React from 'react';
import { ExtendedSelect } from './extended-select';

describe('ExtendedSelect', () => {
    let container;
    const onChange = jest.fn();

    beforeEach(() => {
        container = shallow(
            <ExtendedSelect label={''} onChange={onChange} options={[]} value={''}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
