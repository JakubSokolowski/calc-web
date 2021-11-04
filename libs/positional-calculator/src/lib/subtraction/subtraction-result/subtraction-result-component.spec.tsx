import { shallow } from 'enzyme';
import React from 'react';
import { SubtractionResultComponent } from './subtraction-result-component';
import { fromNumber, subtractPositionalNumbers } from '@calc/calc-arithmetic';

describe('SubtractionResultComponent', () => {
    let container;

    const a = fromNumber(41, 10);
    const b = fromNumber(19, 10);
    const result = subtractPositionalNumbers([a, b]);

    beforeEach(() => {
        container = shallow(
            <SubtractionResultComponent result={result}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
