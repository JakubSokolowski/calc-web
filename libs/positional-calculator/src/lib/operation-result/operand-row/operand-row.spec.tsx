import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { OperandRow } from './operand-row';

describe('OperandRow', () => {
    let container;

    const a = fromNumber(10, 10);
    const b = fromNumber(5, 10);
    const result = addPositionalNumbers([a, b]);

    beforeEach(() => {
        container = mount(
            <OperandRow
                result={result.numberResult}
                operands={result.numberOperands}
                joinSymbol={'-'}
            />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should render complements when showComplement is true', () => {
        // when
        container = mount(
            <OperandRow
                result={result.numberResult}
                operands={result.numberOperands}
                joinSymbol={'-'}
                showAsComplement
            />
        );

        // then
        const complementRow = container.find('.non-complement-result');

        expect(complementRow.length).toEqual(1);
    });
});
