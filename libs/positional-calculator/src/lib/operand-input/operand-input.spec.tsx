import { mount } from 'enzyme';
import React from 'react';
import { OperandInput } from './operand-input';
import { tick } from '@calc/utils';

describe('OperandInput', () => {
    it('should render', () => {
        // when
        const container = mount(
            <OperandInput
                base={10}
                numOperands={1}
                representationStr={'0.0'}
                index={0}
                onRemove={jest.fn()}
                onRepresentationChange={jest.fn()}
            />
        );

        // then
        expect(container).toBeTruthy();
    });

    it('should call onRepresentationChange handler when representation changes', async () => {
        // given
        const onChange = jest.fn();
        const onRemove = jest.fn();
        const index = 0;
        const value = '12.8';
        const isValid = true;

        const container = mount(
            <OperandInput
                base={10}
                numOperands={1}
                representationStr={'0.0'}
                index={0}
                onRemove={onRemove}
                onRepresentationChange={onChange}
            />
        );

        //when
        container
            .find('input')
            .at(0)
            .simulate('change',  { target: { value } });

        await tick();

        // then
        const lastCall = onChange.mock.calls.pop();
        expect(lastCall).toEqual([value, index, isValid]);
    });

    it('should display error message when representation is not valid for given base ', async () => {
        // given
        const onChange = jest.fn();
        const onRemove = jest.fn();
        const errorClassName = '.Mui-error';

        const container = mount(
            <OperandInput
                base={10}
                numOperands={1}
                representationStr={'FFE.8'}
                index={0}
                onRemove={onRemove}
                onRepresentationChange={onChange}
            />
        );

        //when
        const errorMessage =container
            .find(errorClassName)
            .at(0);

        await tick();

        // then
        expect(errorMessage.length).toEqual(1);
    });

    it('should call onRemove handler when remove button is clicked', async () => {
        // given
        const onChange = jest.fn();
        const onRemove = jest.fn();

        const container = mount(
            <OperandInput
                numOperands={1}
                base={10}
                representationStr={'10'}
                index={0}
                onRemove={onRemove}
                onRepresentationChange={onChange}
            />
        );

        //when
        container
            .find('button')
            .at(0)
            .simulate('click');

        await tick();

        // then
        expect(onRemove).toBeCalled();
    })
});

