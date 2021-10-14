import { mount, ReactWrapper } from 'enzyme';
import { buildIntegralConversionGrid, GridLabel, HoverGrid } from '@calc/grid';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';
import HoverGridCell from '../hover-cell/hover-grid-cell';
import { OperandLabel } from '../operand-label/operand-label';

// for Material UI Tooltip. Remove after jest bump to 26.0
document.createRange = () => ({
    setStart: jest.fn(),
    setEnd: jest.fn(),
    commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
    },
} as any);

describe('#HoverGrid', () => {
    let container: ReactWrapper;

    const conversion = fromNumber(24.23, 2);
    const { lines, groups, values } = buildIntegralConversionGrid(conversion);

    beforeEach(() => {
        container = mount(
            <HoverGrid id="test-grid" values={values} groups={groups} lines={lines}/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });

    it('should display all cells from grid', () => {
        // given
        const expectedNumCells = 24;

        // when
        const cells = container.find(HoverGridCell);

        // then
        expect(cells.length).toEqual(expectedNumCells);
    });

    it('should display grid label when label is defined', () => {
        // given
        const labelConfig: GridLabel = {
            labels: ['1', '2']
        };

        // when
        container = mount(
            <HoverGrid id="test-grid" values={values} groups={groups} lines={lines} label={labelConfig}/>
        );

        // then
        const opLabel = container.find(OperandLabel).at(0);
        expect(opLabel.length).toEqual(1);
    })
});
