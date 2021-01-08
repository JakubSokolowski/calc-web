import { mount } from 'enzyme';
import React from 'react';
import { fromNumber, subtractPositionalNumbers } from '@calc/calc-arithmetic';
import { SubtractAtPositionResult } from './subtraction-position-result';

describe('SubtractAtPositionResult', () => {
    let container;

    const a = fromNumber(41, 10).result;
    const b = fromNumber(19, 10).result;
    const result = subtractPositionalNumbers([a, b]);
    const positionResult = result.stepResults[0];

    beforeEach(() => {
        container = mount(
            <SubtractAtPositionResult positionResult={positionResult}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });

    it('should render row with proper latex str representing operands difference', () => {
        // when
        const asciiOpRowText = container
            .find('.opDiffRow')
            .at(0)
            .text()
            .replace(/[^\x00-\x7F]/g, '');


        // non-ascii is stripped from row, and the minus (−) sign the
        // katex uses is also non-ascii so it will be stripped
        // the expected below is D0=11-9
        const expectedStr = 'D0=119';

        // then
        expect(asciiOpRowText).toContain(expectedStr);

    });

    it('should render row with proper position result', () => {
        // when
        const asciiOpRowText = container
            .find('.posResultRow')
            .at(0)
            .text()
            .replace(/[^\x00-\x7F]/g, '');


        const expectedStr = 'D0=2';

        // then
        expect(asciiOpRowText).toContain(expectedStr);
    })
});
