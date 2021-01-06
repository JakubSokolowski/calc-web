import { mount, shallow } from 'enzyme';
import React from 'react';
import { DndOperand, OperandList } from './operand-list';
import { OperandInput } from '../operand-input/operand-input';
import { tick } from '@calc/utils';


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

    it('should render each operand', () => {
        // given
        const operands: DndOperand[] = [
            {dndKey: '1', representation: '10', valid: true},
            {dndKey: '2', representation: '15', valid: true}
        ];

        // when
        const container = mount(
            <OperandList
                inputBase={10}
                canAdd={true}
                onAdd={onAdd}
                operands={operands}
                onChange={onChange}
            />
        );

        // then
        const renderedOperands = container
            .find(OperandInput);

        expect(renderedOperands.length).toEqual(operands.length);
    });

    it('should call onChange handler with operand removed after remove button click', async () => {
        // given
        const operands: DndOperand[] = [
            {dndKey: '1', representation: '10', valid: true},
            {dndKey: '2', representation: '15', valid: true},
            {dndKey: '3', representation: '12', valid: true}
        ];
        const onChange = jest.fn();

        // when
        const container = mount(
            <OperandList
                inputBase={10}
                canAdd={true}
                onAdd={onAdd}
                operands={operands}
                onChange={onChange}
            />
        );

        // then
        container
            .find(OperandInput)
            .at(0)
            .find('button')
            .simulate('click');

        await tick();

        expect(onChange).toBeCalledWith(operands.slice(1));
    });

    it('should call onAdd handler when add operand button is clicked', async () => {
        // given
        const onAdd = jest.fn();

        // when
        const container = mount(
            <OperandList
                inputBase={10}
                canAdd={true}
                onAdd={onAdd}
                operands={[]}
                onChange={onChange}
            />
        );

        // then
        container
            .find('button')
            .at(0)
            .simulate('click');

        await tick();

        expect(onAdd).toBeCalled();
    });

});
