import { mount } from 'enzyme';
import React from 'react';
import { ConversionToDecimal, fromString, fromStringDetailed } from '@calc/calc-arithmetic';
import { ConversionToDecimalDetails } from './conversion-to-decimal';

describe('ConversionToDecimalDetails', () => {
    let container;

    const conversion = fromStringDetailed('221232',5, 2);
    const toDecimal = conversion.getFirstStage() as ConversionToDecimal;

    beforeEach(() => {
        container = mount(
            <ConversionToDecimalDetails  conversionStage={toDecimal}/>
        );
    });

    it('should render', () => {
        expect(container).toBeTruthy();
    });
});
