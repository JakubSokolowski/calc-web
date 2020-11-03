import { shallow } from 'enzyme';
import React from 'react';
import { OperandList } from './operand-list';

describe('OperandList', () => {
    let container;
    const onAdd = jest.fn();
    const onChange = jest.fn();

    beforeEach(() => {
        container = shallow(
            <OperandList
                inputBase={10}
                canAdd={true}
                onAdd={onAdd}
                operands={[]}
                onChange={onChange}
            />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
