import React from 'react';
import { CellGroup, CellPosition, GridCellConfig, GridLine, HoverOperationGrid, LineType } from '@calc/grid';
import {
    AdditionPositionResult,
    fromStringDirect,
    MultiplicationPositionResult,
    MultiplicationRowResult,
    multiplyPositionalNumbers
} from '@calc/calc-arithmetic';
import { buildMultiplicationGrid, MultiplicationCellProps } from './multiplication-grid';

describe('multiplication-grid', () => {
    describe('#buildMultiplicationGrid', () => {
        describe('for base 10 numbers', () => {
            describe('when multiplying two positive numbers without fractional part', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('99', 10).result;
                    const b = fromStringDirect('99', 10).result;
                    const product = multiplyPositionalNumbers([a, b]);
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
                    const expected: CellGroup<MultiplicationCellProps>[] = [
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 0,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '0',
                                    valueInDecimal: 0,
                                    position: 5
                                },
                                carry: [],
                                operands: [
                                    {
                                        isComplementExtension: true,
                                        position: 5,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    },
                                    {
                                        isComplementExtension: true,
                                        position: 5,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    }
                                ],
                                decimalSum: 0
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 1,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 1,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 1,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '0',
                                    valueInDecimal: 0,
                                    position: 4
                                },
                                carry: [],
                                operands: [
                                    {
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    },
                                    {
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    }
                                ],
                                decimalSum: 0
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 2,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9,
                                    position: 3
                                },
                                carry: [],
                                operands: [
                                    {
                                        position: 3,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        carrySourcePosition: 2,
                                        isCarry: true
                                    },
                                    {
                                        isComplementExtension: true,
                                        position: 3,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    },
                                    {
                                        position: 3,
                                        base: 10,
                                        representationInBase: '8',
                                        valueInDecimal: 8
                                    }
                                ],
                                decimalSum: 9
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 3,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '8',
                                    valueInDecimal: 8,
                                    position: 2
                                },
                                carry: [
                                    {
                                        position: 3,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        carrySourcePosition: 2
                                    }
                                ],
                                operands: [
                                    {
                                        position: 2,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        carrySourcePosition: 1,
                                        isCarry: true
                                    },
                                    {
                                        position: 2,
                                        base: 10,
                                        representationInBase: '8',
                                        valueInDecimal: 8
                                    },
                                    {
                                        position: 2,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                decimalSum: 18
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 4,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 4,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 4,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '0',
                                    valueInDecimal: 0,
                                    position: 1
                                },
                                carry: [
                                    {
                                        position: 2,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        carrySourcePosition: 1
                                    }
                                ],
                                operands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                decimalSum: 10
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 5,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 5,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 5,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '1',
                                    valueInDecimal: 1,
                                    position: 0
                                },
                                carry: [],
                                operands: [
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '0',
                                        valueInDecimal: 0
                                    }
                                ],
                                decimalSum: 1
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 5,
                                    y: 1
                                },
                                {
                                    x: 0,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 0,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 2,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.TopRight,
                            contentProps: {
                                multiplicands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                valueAtPosition: {} as any,
                                operands: [],
                                decimalProduct: 0,
                                multiplier: {
                                    position: 0,
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9
                                },
                                rowPositionResults: [
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '1',
                                            valueInDecimal: 1,
                                            position: 0
                                        },
                                        operands: [
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            }
                                        ],
                                        carry: {
                                            position: 1,
                                            carrySourcePosition: 0,
                                            base: 10,
                                            valueInDecimal: 8,
                                            representationInBase: '8',
                                            isCarry: true
                                        },
                                        shiftedPosition: 0,
                                        decimalProduct: 81
                                    },
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '9',
                                            valueInDecimal: 9,
                                            position: 1
                                        },
                                        operands: [
                                            {
                                                position: 1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 1,
                                                carrySourcePosition: 0,
                                                base: 10,
                                                valueInDecimal: 8,
                                                representationInBase: '8',
                                                isCarry: true
                                            }
                                        ],
                                        carry: {
                                            position: 2,
                                            carrySourcePosition: 1,
                                            base: 10,
                                            valueInDecimal: 8,
                                            representationInBase: '8',
                                            isCarry: true
                                        },
                                        shiftedPosition: 1,
                                        decimalProduct: 89
                                    }
                                ],
                                resultDigits: [
                                    {
                                        position: 2,
                                        carrySourcePosition: 1,
                                        base: 10,
                                        valueInDecimal: 8,
                                        representationInBase: '8',
                                        isCarry: true
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9,
                                        position: 1
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        position: 0
                                    }
                                ]
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 1
                                },
                                {
                                    x: 0,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 0,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 3,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.TopRight,
                            contentProps: {
                                multiplicands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                valueAtPosition: {} as any,
                                operands: [],
                                multiplier: {
                                    position: 1,
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9
                                },
                                rowPositionResults: [
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '1',
                                            valueInDecimal: 1,
                                            position: 0
                                        },
                                        operands: [
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            }
                                        ],
                                        carry: {
                                            position: 1,
                                            carrySourcePosition: 0,
                                            base: 10,
                                            valueInDecimal: 8,
                                            representationInBase: '8',
                                            isCarry: true
                                        },
                                        shiftedPosition: 1,
                                        decimalProduct: 81,
                                    },
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '9',
                                            valueInDecimal: 9,
                                            position: 1
                                        },
                                        operands: [
                                            {
                                                position: 1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 1,
                                                carrySourcePosition: 0,
                                                base: 10,
                                                valueInDecimal: 8,
                                                representationInBase: '8',
                                                isCarry: true
                                            },
                                        ],
                                        carry: {
                                            position: 2,
                                            carrySourcePosition: 1,
                                            base: 10,
                                            valueInDecimal: 8,
                                            representationInBase: '8',
                                            isCarry: true
                                        },
                                        shiftedPosition: 2,
                                        decimalProduct: 89
                                    }
                                ],
                                resultDigits: [
                                    {
                                        position: 2,
                                        carrySourcePosition: 1,
                                        base: 10,
                                        valueInDecimal: 8,
                                        representationInBase: '8',
                                        isCarry: true
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9,
                                        position: 1
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        position: 0
                                    }
                                ],
                                decimalProduct: 0
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 5,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '1',
                                    valueInDecimal: 1,
                                    position: 0
                                },
                                operands: [
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                carry: {
                                    position: 1,
                                    carrySourcePosition: 0,
                                    base: 10,
                                    valueInDecimal: 8,
                                    representationInBase: '8',
                                    isCarry: true
                                },
                                shiftedPosition: 0,
                                decimalProduct: 81
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9,
                                    position: 1
                                },
                                operands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        carrySourcePosition: 0,
                                        base: 10,
                                        valueInDecimal: 8,
                                        representationInBase: '8',
                                        isCarry: true
                                    }
                                ],
                                carry: {
                                    position: 2,
                                    carrySourcePosition: 1,
                                    base: 10,
                                    valueInDecimal: 8,
                                    representationInBase: '8',
                                    isCarry: true
                                },
                                shiftedPosition: 1,
                                decimalProduct: 89
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 3
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '1',
                                    valueInDecimal: 1,
                                    position: 0
                                },
                                operands: [
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                carry: {
                                    position: 1,
                                    carrySourcePosition: 0,
                                    base: 10,
                                    valueInDecimal: 8,
                                    representationInBase: '8',
                                    isCarry: true
                                },
                                shiftedPosition: 1,
                                decimalProduct: 81
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 3,
                                    y: 3
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9,
                                    position: 1
                                },
                                operands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        carrySourcePosition: 0,
                                        base: 10,
                                        valueInDecimal: 8,
                                        representationInBase: '8',
                                        isCarry: true
                                    }
                                ],
                                carry: {
                                    position: 2,
                                    carrySourcePosition: 1,
                                    base: 10,
                                    valueInDecimal: 8,
                                    representationInBase: '8',
                                    isCarry: true
                                },
                                shiftedPosition: 2,
                                decimalProduct: 89
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        }
                    ];
                    expect(grid.groups).toEqual(expected);
                });

                it('should return proper line config with horizontal lines separating multiplication operands, addition operands and result', () => {
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

            describe('when multiplying two positive numbers with fractional part of same length', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('12.8', 10).result;
                    const b = fromStringDirect('9.9', 10).result;
                    const product = multiplyPositionalNumbers([a, b]);
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
                    const expected: CellGroup<MultiplicationCellProps>[] = [
                        {
                            cells: [{ y: 2, x: 0, preventGroupTrigger: true }, { y: 3, x: 0, preventGroupTrigger: true }, { y: 4, x: 0, preventGroupTrigger: false }],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '0',
                                    valueInDecimal: 0,
                                    position: 5
                                },
                                carry: [],
                                operands: [
                                    {
                                        isComplementExtension: true,
                                        position: 5,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    },
                                    {
                                        isComplementExtension: true,
                                        position: 5,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    }
                                ],
                                decimalSum: 0
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 1,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 1,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 1,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '0',
                                    valueInDecimal: 0,
                                    position: 4
                                },
                                carry: [],
                                operands: [
                                    {
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    },
                                    {
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    }
                                ],
                                decimalSum: 0
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 2,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '1',
                                    valueInDecimal: 1,
                                    position: 3
                                },
                                carry: [],
                                operands: [
                                    {
                                        isComplementExtension: true,
                                        position: 3,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0,
                                        base: 10
                                    },
                                    {
                                        position: 3,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                decimalSum: 1
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 3,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '2',
                                    valueInDecimal: 2,
                                    position: 2
                                },
                                carry: [],
                                operands: [
                                    {
                                        position: 2,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: 2,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                decimalSum: 2
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 4,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 4,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 4,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '6',
                                    valueInDecimal: 6,
                                    position: 1
                                },
                                carry: [],
                                operands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '5',
                                        valueInDecimal: 5
                                    }
                                ],
                                decimalSum: 6
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 5,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 5,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 5,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '7',
                                    valueInDecimal: 7,
                                    position: 0
                                },
                                carry: [],
                                operands: [
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '5',
                                        valueInDecimal: 5
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    }
                                ],
                                decimalSum: 7
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    y: 2,
                                    x: 6,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 3,
                                    x: 6,
                                    preventGroupTrigger: true
                                },
                                {
                                    y: 4,
                                    x: 6,
                                    preventGroupTrigger: false
                                }
                            ],
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '2',
                                    valueInDecimal: 2,
                                    position: -1
                                },
                                carry: [],
                                operands: [
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '0',
                                        valueInDecimal: 0
                                    }
                                ],
                                decimalSum: 2
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 6,
                                    y: 1
                                },
                                {
                                    x: 0,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 0,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 2,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 2,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.TopRight,
                            contentBuilder: expect.any(Function),
                            contentProps: {
                                multiplicands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '8',
                                        valueInDecimal: 8
                                    }
                                ],
                                valueAtPosition: {} as any,
                                operands: [],
                                multiplier: {
                                    position: -1,
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9
                                },
                                decimalProduct: 0,
                                rowPositionResults: [
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '2',
                                            valueInDecimal: 2,
                                            position: -1
                                        },
                                        operands: [
                                            {
                                                position: -1,
                                                base: 10,
                                                representationInBase: '8',
                                                valueInDecimal: 8
                                            },
                                            {
                                                position: -1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            }
                                        ],
                                        carry: {
                                            position: 0,
                                            carrySourcePosition: -1,
                                            base: 10,
                                            valueInDecimal: 7,
                                            representationInBase: '7',
                                            isCarry: true
                                        },
                                        shiftedPosition: -2,
                                        decimalProduct: 72
                                    },
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '5',
                                            valueInDecimal: 5,
                                            position: 0
                                        },
                                        operands: [
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '2',
                                                valueInDecimal: 2
                                            },
                                            {
                                                position: -1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 0,
                                                carrySourcePosition: -1,
                                                base: 10,
                                                valueInDecimal: 7,
                                                representationInBase: '7',
                                                isCarry: true
                                            }
                                        ],
                                        carry: {
                                            position: 1,
                                            carrySourcePosition: 0,
                                            base: 10,
                                            valueInDecimal: 2,
                                            representationInBase: '2',
                                            isCarry: true
                                        },
                                        shiftedPosition: -1,
                                        decimalProduct: 25
                                    },
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '1',
                                            valueInDecimal: 1,
                                            position: 1
                                        },
                                        operands: [
                                            {
                                                position: 1,
                                                base: 10,
                                                representationInBase: '1',
                                                valueInDecimal: 1
                                            },
                                            {
                                                position: -1,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 1,
                                                carrySourcePosition: 0,
                                                base: 10,
                                                valueInDecimal: 2,
                                                representationInBase: '2',
                                                isCarry: true
                                            }
                                        ],
                                        carry: {
                                            position: 2,
                                            carrySourcePosition: 1,
                                            base: 10,
                                            valueInDecimal: 1,
                                            representationInBase: '1',
                                            isCarry: true
                                        },
                                        decimalProduct: 11,
                                        shiftedPosition: 0
                                    }
                                ],
                                resultDigits: [
                                    {
                                        position: 2,
                                        carrySourcePosition: 1,
                                        base: 10,
                                        valueInDecimal: 1,
                                        representationInBase: '1',
                                        isCarry: true
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        position: 1
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '5',
                                        valueInDecimal: 5,
                                        position: 0
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2,
                                        position: -1
                                    }
                                ]
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 5,
                                    y: 1
                                },
                                {
                                    x: 0,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 0,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 1,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 2,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 3,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 4,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 3,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 3,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.TopRight,
                            contentProps: {
                                multiplicands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '8',
                                        valueInDecimal: 8
                                    }
                                ],
                                decimalProduct: 0,
                                valueAtPosition: {} as any,
                                operands: [],
                                multiplier: {
                                    position: 0,
                                    base: 10,
                                    representationInBase: '9',
                                    valueInDecimal: 9
                                },
                                rowPositionResults: [
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '2',
                                            valueInDecimal: 2,
                                            position: -1
                                        },
                                        operands: [
                                            {
                                                position: -1,
                                                base: 10,
                                                representationInBase: '8',
                                                valueInDecimal: 8
                                            },
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            }
                                        ],
                                        carry: {
                                            position: 0,
                                            carrySourcePosition: -1,
                                            base: 10,
                                            valueInDecimal: 7,
                                            representationInBase: '7',
                                            isCarry: true
                                        },
                                        decimalProduct: 72,
                                        shiftedPosition: -1
                                    },
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '5',
                                            valueInDecimal: 5,
                                            position: 0
                                        },
                                        operands: [
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '2',
                                                valueInDecimal: 2
                                            },
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 0,
                                                carrySourcePosition: -1,
                                                base: 10,
                                                valueInDecimal: 7,
                                                representationInBase: '7',
                                                isCarry: true
                                            }
                                        ],
                                        carry: {
                                            position: 1,
                                            carrySourcePosition: 0,
                                            base: 10,
                                            valueInDecimal: 2,
                                            representationInBase: '2',
                                            isCarry: true
                                        },
                                        decimalProduct: 25,
                                        shiftedPosition: 0
                                    },
                                    {
                                        valueAtPosition: {
                                            base: 10,
                                            representationInBase: '1',
                                            valueInDecimal: 1,
                                            position: 1
                                        },
                                        operands: [
                                            {
                                                position: 1,
                                                base: 10,
                                                representationInBase: '1',
                                                valueInDecimal: 1
                                            },
                                            {
                                                position: 0,
                                                base: 10,
                                                representationInBase: '9',
                                                valueInDecimal: 9
                                            },
                                            {
                                                position: 1,
                                                carrySourcePosition: 0,
                                                base: 10,
                                                valueInDecimal: 2,
                                                representationInBase: '2',
                                                isCarry: true
                                            }
                                        ],
                                        decimalProduct: 11,
                                        carry: {
                                            position: 2,
                                            carrySourcePosition: 1,
                                            base: 10,
                                            valueInDecimal: 1,
                                            representationInBase: '1',
                                            isCarry: true
                                        },
                                        shiftedPosition: 1
                                    }
                                ],
                                resultDigits: [
                                    {
                                        position: 2,
                                        carrySourcePosition: 1,
                                        base: 10,
                                        valueInDecimal: 1,
                                        representationInBase: '1',
                                        isCarry: true
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1,
                                        position: 1
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '5',
                                        valueInDecimal: 5,
                                        position: 0
                                    },
                                    {
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2,
                                        position: -1
                                    }
                                ]
                            },
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 6,
                                    y: 2
                                },
                                {
                                    x: 6,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '2',
                                    valueInDecimal: 2,
                                    position: -1
                                },
                                operands: [
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '8',
                                        valueInDecimal: 8
                                    },
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                carry: {
                                    position: 0,
                                    carrySourcePosition: -1,
                                    base: 10,
                                    valueInDecimal: 7,
                                    representationInBase: '7',
                                    isCarry: true
                                },
                                shiftedPosition: -2,
                                decimalProduct: 72,
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 5,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '5',
                                    valueInDecimal: 5,
                                    position: 0
                                },
                                operands: [
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 0,
                                        carrySourcePosition: -1,
                                        base: 10,
                                        valueInDecimal: 7,
                                        representationInBase: '7',
                                        isCarry: true
                                    }
                                ],
                                carry: {
                                    position: 1,
                                    carrySourcePosition: 0,
                                    base: 10,
                                    valueInDecimal: 2,
                                    representationInBase: '2',
                                    isCarry: true
                                },
                                decimalProduct: 25,
                                shiftedPosition: -1
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 6,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '1',
                                    valueInDecimal: 1,
                                    position: 1
                                },
                                operands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        carrySourcePosition: 0,
                                        base: 10,
                                        valueInDecimal: 2,
                                        representationInBase: '2',
                                        isCarry: true
                                    }
                                ],
                                decimalProduct: 11,
                                carry: {
                                    position: 2,
                                    carrySourcePosition: 1,
                                    base: 10,
                                    valueInDecimal: 1,
                                    representationInBase: '1',
                                    isCarry: true
                                },
                                shiftedPosition: 0
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 5,
                                    y: 3
                                },
                                {
                                    x: 6,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '2',
                                    valueInDecimal: 2,
                                    position: -1
                                },
                                operands: [
                                    {
                                        position: -1,
                                        base: 10,
                                        representationInBase: '8',
                                        valueInDecimal: 8
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                carry: {
                                    position: 0,
                                    carrySourcePosition: -1,
                                    base: 10,
                                    valueInDecimal: 7,
                                    representationInBase: '7',
                                    isCarry: true
                                },
                                shiftedPosition: -1,
                                decimalProduct: 72,
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 3
                                },
                                {
                                    x: 5,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '5',
                                    valueInDecimal: 5,
                                    position: 0
                                },
                                operands: [
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 0,
                                        carrySourcePosition: -1,
                                        base: 10,
                                        valueInDecimal: 7,
                                        representationInBase: '7',
                                        isCarry: true
                                    }
                                ],
                                carry: {
                                    position: 1,
                                    carrySourcePosition: 0,
                                    base: 10,
                                    valueInDecimal: 2,
                                    representationInBase: '2',
                                    isCarry: true
                                },
                                decimalProduct: 25,
                                shiftedPosition: 0
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        },
                        {
                            cells: [
                                {
                                    x: 3,
                                    y: 3
                                },
                                {
                                    x: 4,
                                    y: 0,
                                    preventGroupTrigger: true
                                },
                                {
                                    x: 5,
                                    y: 1,
                                    preventGroupTrigger: true
                                }
                            ],
                            anchorPosition: CellPosition.Bottom,
                            contentProps: {
                                valueAtPosition: {
                                    base: 10,
                                    representationInBase: '1',
                                    valueInDecimal: 1,
                                    position: 1
                                },
                                operands: [
                                    {
                                        position: 1,
                                        base: 10,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        position: 0,
                                        base: 10,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    },
                                    {
                                        position: 1,
                                        carrySourcePosition: 0,
                                        base: 10,
                                        valueInDecimal: 2,
                                        representationInBase: '2',
                                        isCarry: true
                                    }
                                ],
                                carry: {
                                    position: 2,
                                    carrySourcePosition: 1,
                                    base: 10,
                                    valueInDecimal: 1,
                                    representationInBase: '1',
                                    isCarry: true
                                },
                                decimalProduct: 11,
                                shiftedPosition: 1
                            },
                            popoverPlacement: 'bottom',
                            contentBuilder: expect.any(Function)
                        }
                    ];
                    expect(grid.groups).toEqual(expected);
                });

                it('should return proper line config with horizontal lines separating multiplication operands, addition operands and result ' +
                    'and vertical lines separating integer and fraction parts', () => {
                    // then
                    const expected: GridLine[] = [
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
                    const product = multiplyPositionalNumbers([a, b]);
                    grid = buildMultiplicationGrid(product);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [{ 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '7' }, { 'content': '6' }, { 'content': '1' }, { 'content': '0' }, { 'content': '0' }],
                        [{ 'content': '*' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '1' }, { 'content': '2' }, { 'content': '1' }, { 'content': '2' }, { 'content': '3' }],
                        [{ 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '(0)' }, { 'content': '2' }, { 'content': '2' }, { 'content': '8' }, { 'content': '3' }, { 'content': '0' }, { 'content': '0' }],
                        [{ 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '(0)' }, { 'content': '1' }, { 'content': '5' }, { 'content': '2' }, { 'content': '2' }, { 'content': '0' }, { 'content': '0' }, { 'content': '' }],
                        [{ 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '(0)' }, { 'content': '7' }, { 'content': '6' }, { 'content': '1' }, { 'content': '0' }, { 'content': '0' }, { 'content': '' }, { 'content': '' }],
                        [{ 'content': '' }, { 'content': '(0)' }, { 'content': '1' }, { 'content': '5' }, { 'content': '2' }, { 'content': '2' }, { 'content': '0' }, { 'content': '0' }, { 'content': '' }, { 'content': '' }, { 'content': '' }],
                        [{ 'content': '+' }, { 'content': '(0)' }, { 'content': '7' }, { 'content': '6' }, { 'content': '1' }, { 'content': '0' }, { 'content': '0' }, { 'content': '' }, { 'content': '' }, { 'content': '' }, { 'content': '' }],
                        [{ 'content': '' }, { 'content': '(0)' }, { 'content': '9' }, { 'content': '2' }, { 'content': '2' }, { 'content': '5' }, { 'content': '6' }, { 'content': '0' }, { 'content': '3' }, { 'content': '0' }, { 'content': '0' }]
                    ];
                    expect(grid.values).toEqual(expected);
                });
            });
        });
    });
});
