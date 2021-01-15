import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { PositionalNumberComponent } from './positional-number-component';
import { Tooltip } from '@material-ui/core';

describe('PositionalNumberComponent', () => {
    let container;

    const a = fromNumber(10, 10).result;
    const b = fromNumber(5, 10).result;
    const {numberResult} = addPositionalNumbers([a, b]);

    beforeEach(() => {
        container = mount(
            <PositionalNumberComponent
             base={numberResult.base()}
             representation={numberResult.valueInBase}
            />
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should render tooltip when tooltipBase is specified and showAsComplement is false', () => {
       // when
        container = mount(
            <PositionalNumberComponent
                base={numberResult.base()}
                representation={numberResult.valueInBase}
                tooltipBase={10}
                showAsComplement={false}
            />
        );

        // then
        const tooltip = container.find(Tooltip);
        expect(tooltip.length).toEqual(1);
    });

    it('should not render tooltip when tooltipBase is not specified', () => {
        // when
        container = mount(
            <PositionalNumberComponent
                base={numberResult.base()}
                representation={numberResult.valueInBase}
            />
        );

        // then
        const tooltip = container.find(Tooltip);
        expect(tooltip.length).toEqual(0);
    });

    it('should not render tooltip on hover when tooltipBase is specified but showAsComplement is true', () => {
        // when
        container = mount(
            <PositionalNumberComponent
                base={numberResult.base()}
                representation={numberResult.valueInBase}
                tooltipBase={10}
                showAsComplement={true}
            />
        );

        // then
        const tooltip = container.find(Tooltip);
        expect(tooltip.length).toEqual(0);
    });
});
