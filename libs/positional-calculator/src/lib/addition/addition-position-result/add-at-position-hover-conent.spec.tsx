import { mount } from 'enzyme';
import React from 'react';
import { addPositionalNumbers, fromNumber } from '@calc/calc-arithmetic';
import { AddAtPositionHoverContent } from './add-at-position-hover-content';

describe('AddAtPositionHoverContent', () => {
    let container;

    const a = fromNumber(19, 10).result;
    const b = fromNumber(5, 10).result;
    const result = addPositionalNumbers([a, b]);
    const positionResult = result.stepResults[0];

    beforeEach(() => {
        container = mount(
            <AddAtPositionHoverContent positionResult={positionResult}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should render row with proper latex str representing operands sum', () => {
        // when
        // to make assertion, strip all non-ascii characters from str (different latex spaces)
        const asciiOpRowText = container
            .find('.opSumRow')
            .at(0)
            .text()
            .replace(/[^\x00-\x7F]/g, '');


        const expectedStr = 'S0=9+5=14';

        // then
        expect(asciiOpRowText).toContain(expectedStr);

    });

    it('should render row with proper carries and position result', () => {
        // when
        const asciiOpRowText = container
            .find('.carryPosResultRow')
            .at(0)
            .text()
            .replace(/[^\x00-\x7F]/g, '');


        const expectedStr = 'C1=1,S0=4';

        // then
        expect(asciiOpRowText).toContain(expectedStr);
    })
});
