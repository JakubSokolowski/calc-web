import { mount, ReactWrapper } from 'enzyme';
import { buildIntegralConversionGrid, HoverGrid } from '@calc/grid';
import React from 'react';
import { fromNumber } from '@calc/calc-arithmetic';
import HoverGridCell from '../hover-cell/hover-grid-cell';
import { Tooltip } from '@material-ui/core';

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
            <HoverGrid values={values} groups={groups} lines={lines}/>
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

    describe('hovering cells', () => {
        beforeEach(() => {
            container = mount(
                <HoverGrid values={values} groups={groups} lines={lines}/>
            );
        });

        it('should mark cells belonging to hovered cell group on cell mouseover', () => {
            // given
            const hoveredCellClass = '.makeStyles-hoverCell-8';
            const hoveredHighlightedCellClass = '.makeStyles-highlightedCellHover-10';
            const numHovered = 5;
            const numHighlighted = 1;

            // when
            container
                .find(HoverGridCell)
                .at(0)
                .simulate('mouseenter');

            const hoveredCells = container.find(hoveredCellClass);
            const highlightedHoverCells = container.find(hoveredHighlightedCellClass);

            // then
            expect(hoveredCells.length).toEqual(numHovered);
            expect(highlightedHoverCells.length).toEqual(numHighlighted);
        });

        it('should display popover when hovered cell is group anchor and grid has group builder', () => {
            // given
            const anchorCellIndex = 2;
            const groupBuilder = jest.fn();

            container = mount(
                <HoverGrid values={values} groups={groups} lines={lines} groupBuilder={groupBuilder}/>
            );

            // when
            container
                .find(HoverGridCell)
                .at(anchorCellIndex)
                .simulate('mouseenter');

            // then
            const popover = container.find(Tooltip);
            expect(popover.length).toEqual(1);
            expect(groupBuilder).toHaveBeenCalled();
        });

        it('should display popover when hovered cell is group anchor and group has custom builder', () => {
            // given
            const anchorCellIndex = 2;
            const conversionGrid = buildIntegralConversionGrid(conversion);
            const customGroups = [...conversionGrid.groups];
            const groupBuilder = jest.fn();
            customGroups[0].contentBuilder = groupBuilder;

            container = mount(
                <HoverGrid values={values} groups={customGroups} lines={lines}/>
            );

            // when
            container
                .find(HoverGridCell)
                .at(anchorCellIndex)
                .simulate('mouseenter');

            // then
            const popover = container.find(Tooltip);
            expect(popover.length).toEqual(1);
            expect(groupBuilder).toHaveBeenCalled();
        });

        it('should change hovered group if hovered cell changes', () => {
            // given
            const cellInFirstGroupIndex = 0;
            const cellInSecondGroupIndex = 10;
            const hoveredCellClass = '.makeStyles-hoverCell-8';
            const expectedKeys = ['0-1', '1-1', '2-1', '3-1', '4-1'];

            // when
            container
                .find(HoverGridCell)
                .at(cellInFirstGroupIndex)
                .simulate('mouseenter')
                .simulate('mouseleave');

            container
                .find(HoverGridCell)
                .at(cellInSecondGroupIndex)
                .simulate('mouseenter');

            const hoveredCellsKeys = container
                .find(hoveredCellClass)
                .map((node) => node.key());

            // then
            expect(hoveredCellsKeys).toEqual(expectedKeys);
        });
    });
});
