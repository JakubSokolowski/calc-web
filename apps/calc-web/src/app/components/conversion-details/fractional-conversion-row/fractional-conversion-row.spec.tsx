import React from 'react';
import { shallow } from 'enzyme';
import { FloatingPartConversionInfo } from '../../../core/operation-grid';
import { FractionalConversionRow } from './fractional-conversion-row';


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
