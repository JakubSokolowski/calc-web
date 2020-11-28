import React from 'react';
import { shallow } from 'enzyme';
import { FractionalConversionRow } from './fractional-conversion-row';
import { FloatingPartConversionInfo } from '@calc/grid';


describe('FractionalConversionRow', () => {
    let container;

    beforeEach(() => {
        const props: FloatingPartConversionInfo = {
            base: '2',
            result: '0.4',
            multiplier: '0.2'
        };

        container = shallow(
            <FractionalConversionRow
                {...props}
            />
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
