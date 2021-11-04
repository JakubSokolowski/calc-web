import { shallow, ShallowWrapper } from 'enzyme';
import { buildIntegralConversionGrid, HoverGrid, PaddedGrid } from '@calc/grid';
import React from 'react';
import { fromNumber, fromNumberDetailed } from '@calc/calc-arithmetic';

describe('#PaddedGrid', () => {
    let container: ShallowWrapper;

    const conversion = fromNumberDetailed(24.23, 2);
    const { lines, groups, values } = buildIntegralConversionGrid(conversion);

    beforeEach(() => {
        container = shallow(
            <PaddedGrid id='test-grid' desiredWidth={20} values={values} groups={groups} lines={lines}/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });

    it('should render additional grid for padding when desired width is greater than grid width', () => {
        // when
        container = shallow(
            <PaddedGrid id='test-grid' desiredWidth={20} values={values} groups={groups} lines={lines}/>
        );

        // then
        const grids = container.find(HoverGrid);
        expect(grids.length).toEqual(2)
    });

    it('should not render additional grid ofr padding when desired width is smaller or equal to grid width', () => {
        // when
        container = shallow(
            <PaddedGrid id='test-grid' desiredWidth={5} values={values} groups={groups} lines={lines}/>
        );

        // then
        const grids = container.find(HoverGrid);
        expect(grids.length).toEqual(1)
    });
});
