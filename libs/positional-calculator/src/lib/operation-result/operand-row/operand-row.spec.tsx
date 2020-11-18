import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { OperandRow } from './operand-row';

describe('OperandRow', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const result = addPositionalNumbers([a, b]);

    beforeEach(() => {
        container = mount(
            <OperandRow
                result={result.numberResult}
                operands={result.numberOperands}
                joinSymbol={'-'}
                tooltipBase={10}
            />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
