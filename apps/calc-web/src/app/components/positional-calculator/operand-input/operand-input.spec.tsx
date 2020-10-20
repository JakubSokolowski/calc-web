import { shallow } from 'enzyme';
import React from 'react';
import { OperandInput } from './operand-input';

describe('OperandInput', () => {
    let container;
    const onRemove = jest.fn();

    beforeEach(() => {
        container = shallow(
            <OperandInput
                base={10}
                representationStr={'0.0'}
                index={0}
                onRemove={onRemove}
            />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
