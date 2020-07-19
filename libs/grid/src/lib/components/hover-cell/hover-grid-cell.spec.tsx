import { GridCellConfig, GridCellEvent } from '@calc/grid';
import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import HoverGridCell from './hover-grid-cell';

describe('#HoverGridCell', () => {
    let container: ShallowWrapper;
    const defaultClassName = '.default-cell';
    const config: GridCellConfig = {
        content: 'Content',
    };
    const x = 0;
    const y = 0;

    beforeEach(() => {
        container = shallow(
            <HoverGridCell config={config} x={x} y={y}/>
        );
    });

    it('should render successfully', () => {
        expect(container).toBeTruthy();
    });

    describe('cell style', () => {
        it('should render with default style when no preset is specified', () => {
            // when
            const cell = container.find(defaultClassName);

            // then
            expect(cell).toHaveLength(1);
        });

        it('should render with hover style when cell is hovered and preset is not defined', () => {
            // given
            const defaultHoverStyle = '.hover-cell';
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} hovered={true}/>
            );

            // when
            const cell = container.find(defaultHoverStyle);

            // then
            expect(cell).toHaveLength(1);
        });

        it('should render with default hover style when cell is hovered and preset is defined but does not specify hover style', () => {
            // given
            const defaultHoverStyle = '.hover-cell';
            const cellConfig: GridCellConfig = {
                preset: {
                    default: 'some-cell-preset'
                },
                content: 'Cell content'
            };
            container = shallow(
                <HoverGridCell config={cellConfig} x={x} y={y} hovered={true}/>
            );

            // when
            const cell = container.find(defaultHoverStyle);

            // then
            expect(cell).toHaveLength(1);
        });

        it('should render with specified style when cell preset is defined and cell is hovered', () => {
            // given
            const hoverPresetStyle = '.some-hover-preset';
            const cellConfig: GridCellConfig = {
                preset: {
                    default: 'some-cell-preset',
                    hover: 'some-hover-preset'
                },
                content: 'Cell content'
            };
            container = shallow(
                <HoverGridCell config={cellConfig} x={x} y={y} hovered={true}/>
            );

            // when
            const cell = container.find(hoverPresetStyle);

            // then
            expect(cell).toHaveLength(1);
        });

        it('should render with specified style when cell preset is defined', () => {
            // given
            const customPresetClassName = '.some-cell-preset';
            const cellConfig: GridCellConfig = {
                preset: {
                    default: 'some-cell-preset',
                    hover: 'some-hover-preset'
                },
                content: 'Cell content'
            };
            container = shallow(
                <HoverGridCell config={cellConfig} x={x} y={y}/>
            );

            // when
            const cell = container.find(customPresetClassName);

            // then
            expect(cell).toHaveLength(1);
        });

        it('should render with vertical line when cell should display vertical line', () => {
            // given
            const className = 'default-cell vertical-line';
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} verticalLine={true}/>
            );

            // when
            const cell = container.find('div');

            // then
            expect(cell.hasClass(className)).toBeTruthy();
        });

        it('should render with horizontal line style when cell should display horizontal line', () => {
            // given
            const className = 'default-cell horizontal-line';
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} horizontalLine={true}/>
            );

            // when
            const cell = container.find('div');

            // then
            expect(cell.hasClass(className)).toBeTruthy();
        });

        it('should render with horizontal and vertical line style when cell should display both lines', () => {
            // given
            const className = 'default-cell horizontal-line';
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} horizontalLine={true}/>
            );

            // when
            const cell = container.find('div');

            // then
            expect(cell.hasClass(className)).toBeTruthy();
        });
    });

    describe('#onHover', () => {
        it('should emit proper event when mouse is over the cell and onHover callback is defined', () => {
            // given
            const onhoverSpy = jest.fn();
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} onHover={onhoverSpy}/>
            );
            const event: GridCellEvent = {
                x,
                y,
                hovered: true
            };

            // when
            container
                .find(defaultClassName)
                .at(0)
                .simulate('mouseenter');

            // then
            expect(onhoverSpy).toBeCalledWith(event);
        });

        it('should emit proper event when mouse leaves cell and onHover callback is defined', () => {
            // given
            const onhoverSpy = jest.fn();
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} onHover={onhoverSpy}/>
            );
            const event: GridCellEvent = {
                x,
                y,
                hovered: false
            };

            // when
            container
                .find(defaultClassName)
                .at(0)
                .simulate('mouseleave');

            // then
            expect(onhoverSpy).toBeCalledWith(event);
        });

        it('should do nothing when onHover is not defined', () => {
            // given
            const onhoverSpy = jest.fn();
            container = shallow(
                <HoverGridCell config={config} x={x} y={y}/>
            );

            // when
            container
                .find(defaultClassName)
                .at(0)
                .simulate('mouseleave');

            // then
            expect(onhoverSpy).not.toBeCalledWith();
        });
    });

    describe('#onClick', () => {
        it('should emit proper event when cell is clicked and onClick callback is defined', () => {
            // given
            const onClickSpy = jest.fn();
            container = shallow(
                <HoverGridCell config={config} x={x} y={y} onClick={onClickSpy}/>
            );

            // when
            container
                .find(defaultClassName)
                .at(0)
                .simulate('click');

            // then
            expect(onClickSpy).toBeCalled();
        });

        it('should do nothing when cell is clicked but onClick is not defined', () => {
            // given
            const onClickSpy = jest.fn();
            container = shallow(
                <HoverGridCell config={config} x={x} y={y}/>
            );

            // when
            container
                .find(defaultClassName)
                .at(0)
                .simulate('click');

            // then
            expect(onClickSpy).not.toBeCalled();
        });
    })
});
