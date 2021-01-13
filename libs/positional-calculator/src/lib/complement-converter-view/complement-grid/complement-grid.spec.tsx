import { GridCellConfig, GridLine, HoverOperationGrid, LineType } from '@calc/grid';
import { getComplementWithDetails } from '@calc/calc-arithmetic';
import { buildComplementGrid } from './complement-grid';
import React from 'react';

describe('#buildComplementGrid', () => {
    describe('for base 10 numbers', () => {
        describe('when building grid for negative number complement', () => {
            let grid: HoverOperationGrid;

            beforeEach(() => {
                // when
                const complement = getComplementWithDetails('-1234.5', 10);
                grid = buildComplementGrid(complement);
            });

            it('should return proper grid values', () => {
                // then
                const expected: GridCellConfig[][] = [
                    [{ content: '' }, { content: '' }, { content: '9' }, { content: '9' }, { content: '9' }, { content: '9' }, { content: '9' }],
                    [{ content: '-' }, { content: '' }, { content: '1' }, { content: '2' }, { content: '3' }, { content: '4' }, { content: '5' }],
                    [{ content: '' }, { content: '' }, { content: '8' }, { content: '7' }, { content: '6' }, { content: '5' }, { content: '4' }],
                    [{ content: '+' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '1' }],
                    [{ content: '' }, { content: '' }, { content: '8' }, { content: '7' }, { content: '6' }, { content: '5' }, { content: '5' }]
                ];
                expect(grid.values).toEqual(expected);
            });

            it('should return proper line config with horizontal line separating subtraction, addition and result', () => {
                // then
                const expected: GridLine[] = [
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

        describe('when building grid for negative number complement that will have leading zeros', () => {
            let grid: HoverOperationGrid;

            beforeEach(() => {
                // when
                const complement = getComplementWithDetails('-9934.5', 10);
                grid = buildComplementGrid(complement);
            });

            it('should return proper grid values', () => {
                // then
                const expected: GridCellConfig[][] = [
                    [{ content: '' }, { content: '' }, { content: '9' }, { content: '9' }, { content: '9' }, { content: '9' }, { content: '9' }],
                    [{ content: '-' }, { content: '' }, { content: '9' }, { content: '9' }, { content: '3' }, { content: '4' }, { content: '5' }],
                    [{ content: '' }, { content: '' }, { content: '0' }, { content: '0' }, { content: '6' }, { content: '5' }, { content: '4' }],
                    [{ content: '+' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '1' }],
                    [{ content: '' }, { content: '' }, { content: '0' }, { content: '0' }, { content: '6' }, { content: '5' }, { content: '5' }]
                ];
                expect(grid.values).toEqual(expected);
            });
        });

        describe('when building grid for complements  complement', () => {
            let grid: HoverOperationGrid;

            beforeEach(() => {
                // when
                const complement = getComplementWithDetails('(9)812.74', 10);
                grid = buildComplementGrid(complement);
            });

            it('should return proper grid values', () => {
                // then
                const expected: GridCellConfig[][] = [
                    [{ content: '' }, { content: '' }, { content: '9' }, { content: '9' }, { content: '9' }, { content: '9' }, { content: '9' }],
                    [{ content: '-' }, { content: '' }, { content: '8' }, { content: '1' }, { content: '2' }, { content: '7' }, { content: '4' }],
                    [{ content: '' }, { content: '' }, { content: '1' }, { content: '8' }, { content: '7' }, { content: '2' }, { content: '5' }],
                    [{ content: '+' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '' }, { content: '1' }],
                    [{ content: '' }, { content: '' }, { content: '1' }, { content: '8' }, { content: '7' }, { content: '2' }, { content: '6' }]
                ];
                expect(grid.values).toEqual(expected);
            });

            it('should return proper line config with horizontal line separating subtraction, addition and result', () => {
                // then
                const expected: GridLine[] = [
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
    });
});
