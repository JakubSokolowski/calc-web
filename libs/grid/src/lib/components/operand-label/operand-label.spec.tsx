import { mount } from 'enzyme';
import React from 'react';
import { OperandLabel } from './operand-label';
import { GridLabel } from '@calc/grid';

describe('OperandLabel', () => {
    let container;

    const label: GridLabel = {
        labels: ['1', ' ', '2', '3']
    };

    beforeEach(() => {
        container = mount(
            <OperandLabel  labelConfig={label}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
