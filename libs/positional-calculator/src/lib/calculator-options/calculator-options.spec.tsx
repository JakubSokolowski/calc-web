import { mount, shallow } from 'enzyme';
import React from 'react';
import { CalculatorOptions } from './calculator-options';
import { DndOperand } from '../operand-list/operand-list';
import { tick } from '@calc/utils';
import { OperandInput } from '../operand-input/operand-input';
import { allOperations, multiplicationAlgorithms } from '@calc/calc-arithmetic';

describe('CalculatorOptions', () => {
    let container;
    const onSubmit = jest.fn();
    const onOperationChange = jest.fn();
    const base = 10;
    const multiplication = allOperations[2];
    const multiplicationAlgorithm = multiplicationAlgorithms[0];

    beforeEach(() => {
        container = shallow(
            <CalculatorOptions onSubmit={onSubmit} onOperationChange={onOperationChange}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should add new operand after add operand click', async () => {
        // given
        const base = 10;
        const multiplication = allOperations[2];
        const defaultAlgorithm = multiplicationAlgorithms[0];
        const buttonTestId = 'new-operand';
        const operands: DndOperand[] =[
            {representation: '10', valid: true, dndKey: '1'},
        ];

        const container = mount(
            <CalculatorOptions
                onSubmit={onSubmit}
                onOperationChange={onOperationChange}
                defaultBase={base}
                defaultOperation={multiplication}
                defaultAlgorithm={defaultAlgorithm}
                defaultOperands={operands}
            />
        );

        // when
        container
            .find(`[data-testid="${buttonTestId}"]`)
            .at(0)
            .simulate('click');

        await tick();

        // then
        const allOperands = container.find(OperandInput);
        expect(allOperands.length).toEqual(2);
    });

    it('should not add any more operands if limit is reached', async () => {
        // given
        const buttonTestId = 'new-operand';
        const operands: DndOperand[] =[
            {representation: '10', valid: true, dndKey: '1'},
            {representation: '13', valid: true, dndKey: '2'},
        ];

        const container = mount(
            <CalculatorOptions
                onSubmit={onSubmit}
                onOperationChange={onOperationChange}
                defaultBase={base}
                defaultOperation={multiplication}
                defaultAlgorithm={multiplicationAlgorithm}
                defaultOperands={operands}
            />
        );

        // when
        container
            .find(`[data-testid="${buttonTestId}"]`)
            .at(0)
            .simulate('click');

        await tick();

        // then
        const allOperands = container.find(OperandInput);
        expect(allOperands.length).toEqual(2);
    });

    describe('when submit button is clicked', () => {
        it('should not call onSubmit handler when some operand is invalid', async () => {
            // given
            const buttonTestId = 'submit';
            const operands: DndOperand[] =[
                {representation: '10', valid: true, dndKey: '1'},
                {representation: 'ABC', valid: false, dndKey: '2'},
            ];

            const container = mount(
                <CalculatorOptions
                    onSubmit={onSubmit}
                    onOperationChange={onOperationChange}
                    defaultBase={base}
                    defaultOperation={multiplication}
                    defaultAlgorithm={multiplicationAlgorithm}
                    defaultOperands={operands}
                />
            );

            // when
            container
                .find(`[data-testid="${buttonTestId}"]`)
                .at(0)
                .simulate('click');

            await tick();

            // then
            expect(onSubmit).not.toBeCalled();
        });

        it('should not call onSubmit handler when there are to few operands for operation', async () => {
            // given
            const buttonTestId = 'submit';
            const operands: DndOperand[] =[
                {representation: '10', valid: true, dndKey: '1'},
            ];

            const container = mount(
                <CalculatorOptions
                    onSubmit={onSubmit}
                    onOperationChange={onOperationChange}
                    defaultBase={base}
                    defaultOperation={multiplication}
                    defaultAlgorithm={multiplicationAlgorithm}
                    defaultOperands={operands}
                />
            );

            // when
            container
                .find(`[data-testid="${buttonTestId}"]`)
                .at(0)
                .simulate('click');

            await tick();

            // then
            expect(onSubmit).not.toBeCalled();
        });

        it('should call onSubmit handler when all operands are valid and num of operands is allowed', async () => {
            // given
            const buttonTestId = 'submit';
            const operands: DndOperand[] =[
                {representation: '10', valid: true, dndKey: '1'},
                {representation: '6', valid: true, dndKey: '2'},
            ];

            const container = mount(
                <CalculatorOptions
                    onSubmit={onSubmit}
                    onOperationChange={onOperationChange}
                    defaultBase={base}
                    defaultOperation={multiplication}
                    defaultAlgorithm={multiplicationAlgorithm}
                    defaultOperands={operands}
                />
            );

            // when
            container
                .find(`[data-testid="${buttonTestId}"]`)
                .at(0)
                .simulate('click');

            await tick();

            // then
            expect(onSubmit).toBeCalledWith(base, operands, multiplication, multiplicationAlgorithm);
        })

    })

});
