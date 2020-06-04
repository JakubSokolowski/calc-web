import { CellClickEvent, NumberGridCell } from './number-grid-cell';
import React from 'react';
import { shallow } from 'enzyme';


describe('NumberGridCell', () => {
    let container;

    beforeEach(() => {
        container = shallow(
            <NumberGridCell
                value={{ value: '', highlight: false }}
                x={1}
                y={2}
            />
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });

    it('should render with default style when no modifiers are specified', () => {
        // given
        const defaultBorder = '1px #e3e3e3 dashed';
        const expectedStyle = {
            border: defaultBorder,
            borderBottom: defaultBorder,
            borderRight: defaultBorder,
            background: ''
        };

        // when
        const containerStyle = container
            .find('.number-grid-cell')
            .at(0)
            .prop('style');

        // then
        expect(containerStyle).toEqual(expectedStyle);
    });

    it('should render with solid bottom border when horizontalLine is set to true', () => {
        // given
        const expectedBorder = '1px #333333 solid';
        container = shallow(
            <NumberGridCell
                value={{ value: '', highlight: false }}
                horizontalLine
                x={1}
                y={2}
            />
        );

        // when
        const containerStyle = container
            .find('.number-grid-cell')
            .at(0)
            .prop('style');

        // then
        expect(containerStyle).toHaveProperty('borderBottom', expectedBorder);
    });

    it('should render with solid right border when verticalLine is set to true', () => {
        // given
        const expectedBorder = '1px #333333 solid';
        container = shallow(
            <NumberGridCell
                value={{ value: '', highlight: false }}
                verticalLine
                x={1}
                y={2}
            />
        );

        // when
        const containerStyle = container
            .find('.number-grid-cell')
            .at(0)
            .prop('style');

        // then
        expect(containerStyle).toHaveProperty('borderRight', expectedBorder);
    });

    it('should render with solid right border when verticalLine is set to true', () => {
        // given
        const expectedBorder = '1px #333333 solid';
        container = shallow(
            <NumberGridCell
                value={{ value: '', highlight: false }}
                verticalLine
                x={1}
                y={2}
            />
        );

        // when
        const containerStyle = container
            .find('.number-grid-cell')
            .at(0)
            .prop('style');

        // then
        expect(containerStyle).toHaveProperty('borderRight', expectedBorder);
    });

    it('should render with highlighted background highlight option is set to true', () => {
        // given
        const highlight = '#e3e3e3';
        container = shallow(
            <NumberGridCell
                value={{ value: '', highlight: true }}
                verticalLine
                x={1}
                y={2}
            />
        );

        // when
        const containerStyle = container
            .find('.number-grid-cell')
            .at(0)
            .prop('style');

        // then
        expect(containerStyle).toHaveProperty('background', highlight);
    });

    it('should call onClick with cell data on cell click when onClick is defined', () => {
        // given
        const onClickSpy = jest.fn();
        const x = 1;
        const y = 2;
        const value = 'F';
        const expectedEvent: CellClickEvent = { x, y, value: { value: 'F' } };
        container = shallow(
            <NumberGridCell
                value={{ value }}
                verticalLine
                onClick={onClickSpy}
                x={1}
                y={2}
            />
        );

        // when
        container
            .find('.number-grid-cell')
            .at(0)
            .simulate('click');

        // then
        expect(onClickSpy).toHaveBeenCalledWith(expectedEvent);
    });

    it('should do nothing when cell is clicked and onClick is not defined', () => {
        // given
        const onClickSpy = jest.fn();
        const x = 1;
        const y = 2;
        const value = 'F';
        container = shallow(
            <NumberGridCell
                value={{ value }}
                verticalLine
                x={1}
                y={2}
            />
        );

        // when
        container
            .find('.number-grid-cell')
            .at(0)
            .simulate('click');

        // then
        expect(onClickSpy).not.toHaveBeenCalled();
    });
});
