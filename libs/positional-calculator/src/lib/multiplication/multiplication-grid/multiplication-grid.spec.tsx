import React from 'react';
import { GridCellConfig, GridLine, HoverOperationGrid, LineType } from '@calc/grid';
import { fromStringDirect, multiplyDefault, multiplyWithExtensions } from '@calc/calc-arithmetic';
import { buildMultiplicationGrid } from './multiplication-grid';

describe('multiplication-grid', () => {
    describe('#buildMultiplicationGrid', () => {
        describe('for default multiplication', () => {
            describe('when multiplying two positive numbers without fractional part', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('99', 10).result;
                    const b = fromStringDirect('99', 10).result;
                    const product = multiplyDefault([a, b]);
                    grid = buildMultiplicationGrid(product);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '9' }, { content: '9' }],
                        [{ content: '*' }, { content: '' }, { content: '' }, { content: '' }, { content: '9' }, { content: '9' }],
                        [{ content: '' }, { content: '' }, { content: '(0)' }, { content: '8' }, { content: '9' }, { content: '1' }],
                        [{ content: '+' }, { content: '(0)' }, { content: '8' }, { content: '9' }, { content: '1' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '9' }, { content: '8' }, { content: '0' }, { content: '1' }]
                    ];
                    expect(grid.values).toEqual(expected);
                });

                it('should return proper hover groups with position addition info', () => {
                    // then
                    expect(grid.groups).toMatchSnapshot();
                });

                it('should return proper line config with horizontal lines separating multiplication operands, addition operands and result', () => {
                    // then
                    const expected: GridLine[] = [
                        {
                            index: 5,
                            type: LineType.Vertical
                        },
                        {
                            index: 1,
                            type: LineType.Horizontal
                        },
                        {
                            index: 3,
                            type: LineType.Horizontal
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });

            describe('when multiplying two positive numbers with fractional part of same length', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('12.8', 10).result;
                    const b = fromStringDirect('9.9', 10).result;
                    const product = multiplyDefault([a, b]);
                    grid = buildMultiplicationGrid(product);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '1' }, { content: '2' }, { content: '8' }],
                        [{ content: '*' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '9' }, { content: '9' }],
                        [{ content: '' }, { content: '' }, { content: '(0)' }, { content: '1' }, { content: '1' }, { content: '5' }, { content: '2' }],
                        [{ content: '+' }, { content: '(0)' }, { content: '1' }, { content: '1' }, { content: '5' }, { content: '2' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '1' }, { content: '2' }, { content: '6' }, { content: '7' }, { content: '2' }]
                    ];
                    expect(grid.values).toEqual(expected);
                });

                it('should return proper hover groups with position addition info', () => {
                    // then
                    expect(grid.groups).toMatchSnapshot();
                });

                it('should return proper line config with horizontal lines separating multiplication operands, addition operands and result ' +
                    'and vertical lines separating integer and fraction parts', () => {
                    // then
                    const expected: GridLine[] = [
                        {
                            index: 6,
                            type: LineType.Vertical
                        },
                        {
                            index: 1,
                            type: LineType.Horizontal
                        },
                        {
                            index: 3,
                            type: LineType.Horizontal
                        },
                        {
                            index: 5,
                            span: {
                                from: 0,
                                to: 1
                            },
                            type: LineType.Vertical
                        },
                        {
                            index: 4,
                            span: {
                                from: 4,
                                to: 5
                            },
                            type: LineType.Vertical
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });

            describe('when multiplying two numbers with fractional parts of different length', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('76.1', 10).result;
                    const b = fromStringDirect('12.123', 10).result;
                    const product = multiplyDefault([a, b]);
                    grid = buildMultiplicationGrid(product);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '7' }, { content: '6' }, { content: '1' }, { content: '0' }, { content: '0' }],
                        [{ content: '*' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '1' }, { content: '2' }, { content: '1' }, { content: '2' }, { content: '3' }],
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(0)' }, { content: '2' }, { content: '2' }, { content: '8' }, { content: '3' }, { content: '0' }, { content: '0' }],
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '(0)' }, { content: '1' }, { content: '5' }, { content: '2' }, { content: '2' }, { content: '0' }, { content: '0' }, { content: '' }],
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '(0)' }, { content: '7' }, { content: '6' }, { content: '1' }, { content: '0' }, { content: '0' }, { content: '' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '1' }, { content: '5' }, { content: '2' }, { content: '2' }, { content: '0' }, { content: '0' }, { content: '' }, { content: '' }, { content: '' }],
                        [{ content: '+' }, { content: '(0)' }, { content: '7' }, { content: '6' }, { content: '1' }, { content: '0' }, { content: '0' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '9' }, { content: '2' }, { content: '2' }, { content: '5' }, { content: '6' }, { content: '0' }, { content: '3' }, { content: '0' }, { content: '0' }]
                    ];
                    expect(grid.values).toEqual(expected);
                });
            });
        });

        describe('for multiplication with extension', () => {
            describe('when multiplying positive and negative numbers without fractional part', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('(0)3156', 8).result;
                    const b = fromStringDirect('(7)6423', 8).result;
                    const product = multiplyWithExtensions([a, b]);
                    grid = buildMultiplicationGrid(product);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(7)' }, { content: '4' }, { content: '6' }, { content: '2' }, { content: '2' }],
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(0)' }, { content: '3' }, { content: '1' }, { content: '5' }, { content: '6' }],
                        [{ content: '*' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(7)' }, { content: '6' }, { content: '4' }, { content: '2' }, { content: '3' }],
                        [{ content: '' }, { content: '(0)' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '1' }, { content: '1' }, { content: '5' }, { content: '1' }, { content: '2' }],
                        [{ content: '' }, { content: '(0)' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '6' }, { content: '3' }, { content: '3' }, { content: '4' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '0' }, { content: '1' }, { content: '4' }, { content: '6' }, { content: '7' }, { content: '0' }, { content: '' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '2' }, { content: '3' }, { content: '2' }, { content: '2' }, { content: '4' }, { content: '' }, { content: '' }, { content: '' }],
                        [{ content: '+' }, { content: '(7)' }, { content: '4' }, { content: '6' }, { content: '2' }, { content: '2' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }],
                        [{ content: '' }, { content: '(7)' }, { content: '7' }, { content: '3' }, { content: '2' }, { content: '3' }, { content: '0' }, { content: '0' }, { content: '5' }, { content: '2' }]
                    ];

                    expect(grid.values).toEqual(expected);
                });

                it('should return proper hover groups with position addition info', () => {
                    // then
                    expect(grid.groups).toMatchSnapshot();
                });
            });

            describe('when multiplying positive and negative numbers with fractional part', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('(0)31.12', 8).result;
                    const b = fromStringDirect('(7)64', 8).result;
                    const product = multiplyWithExtensions([a, b]);
                    grid = buildMultiplicationGrid(product);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] =[
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(7)' }, { content: '4' }, { content: '6' }, { content: '6' }, { content: '6' }],
                        [{ content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(0)' }, { content: '3' }, { content: '1' }, { content: '1' }, { content: '2' }],
                        [{ content: '*' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '(7)' }, { content: '6' }, { content: '4' }, { content: '0' }, { content: '0' }],
                        [{ content: '' }, { content: '(0)' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }],
                        [{ content: '' }, { content: '(0)' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '0' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '0' }, { content: '1' }, { content: '4' }, { content: '4' }, { content: '5' }, { content: '0' }, { content: '' }, { content: '' }],
                        [{ content: '' }, { content: '(0)' }, { content: '2' }, { content: '2' }, { content: '6' }, { content: '7' }, { content: '4' }, { content: '' }, { content: '' }, { content: '' }],
                        [{ content: '+' }, { content: '(7)' }, { content: '4' }, { content: '6' }, { content: '6' }, { content: '6' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }],
                        [{ content: '' }, { content: '(7)' }, { content: '7' }, { content: '3' }, { content: '2' }, { content: '2' }, { content: '1' }, { content: '0' }, { content: '0' }, { content: '0' }]
                    ];

                    expect(grid.values).toEqual(expected);
                });

                it('should return proper hover groups with position addition info', () => {
                    // then
                    expect(grid.groups).toMatchSnapshot();
                });
            });
        });
    });
});
