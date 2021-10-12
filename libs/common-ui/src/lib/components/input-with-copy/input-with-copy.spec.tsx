import { shallow } from 'enzyme';
import React from 'react';
import { InputWithCopy } from '@calc/common-ui';

describe('InputWithCopy', () => {
    let container;
    const onChange = jest.fn();

    beforeEach(() => {
        container = shallow(
            <InputWithCopy label={''} onChange={onChange}  value={''}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
