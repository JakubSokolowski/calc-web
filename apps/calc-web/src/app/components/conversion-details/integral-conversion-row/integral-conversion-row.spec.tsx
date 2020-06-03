import React from 'react';
import { shallow } from 'enzyme';
import { IntegralConversionRow } from './integral-conversion-row';
import { RowConversionOperation } from '../../../core/operation-grid';


describe('IntegralConversionRow', () => {
    let container;

    beforeEach(() => {
        const props: RowConversionOperation = {
            remainder: '0',
            base: '2',
            dividend: '12',
            result: '24'
        };
        
        container = shallow(
            <IntegralConversionRow
                {...props}
            />
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
