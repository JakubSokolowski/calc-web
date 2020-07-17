import { shallow, ShallowWrapper } from 'enzyme';
import { buildIntegralConversionGrid, HoverGrid } from '@calc/grid';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';

describe('#HoverGrid', () => {
    let container: ShallowWrapper;

    const conversion = fromNumber(24.23, 2);
    const { lines, groups, values } = buildIntegralConversionGrid(conversion);


    beforeEach(() => {
        container = shallow(
            <HoverGrid values={values} groups={groups} lines={lines}/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });
});
