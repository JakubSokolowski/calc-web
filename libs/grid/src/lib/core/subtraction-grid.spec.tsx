import React from 'react';
import { fromStringDirect, subtractPositionalNumbers } from '@calc/calc-arithmetic';
import { HoverOperationGrid } from '../models/hover-operation-grid';
import { buildSubtractionGrid } from './subtraction-grid';
import { GridCellConfig } from '../models/grid-cell-config';
import { CellGroup } from '../models/cell-group';
import { GridLine } from '../models/grid-line';
import { LineType } from '../models/line-type';


describe('subtraction-grid', () => {
    describe('#buildSubtractionGrid', () => {
        describe('for base 10 numbers', () => {
            describe('when subtracting numbers without fractional part and without borrow', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('24', 10);
                    const b = fromStringDirect('11', 10);
                    const difference = subtractPositionalNumbers([a, b]);
                    grid = buildSubtractionGrid(difference);

                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [
                            {
                                content: ''
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '2'
                            },
                            {
                                content: '4'
                            }
                        ],
                        [
                            {
                                content: '-'
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '1'
                            },
                            {
                                content: '1'
                            }
                        ],
                        [
                            {
                                content: ''
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '1'
                            },
                            {
                                content: '3'
                            }
                        ]
                    ];
                    expect(grid.values).toEqual(expected);
                });

                it('should return proper hover groups with position addition info', () => {
                    // then
                    const expected: CellGroup[] = [
                        {
                            cells: [
                                {
                                    x: 0,
                                    y: 0
                                },
                                {
                                    x: 0,
                                    y: 1
                                },
                                {
                                    x: 0,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 3,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 3,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 3,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 1,
                                    y: 0
                                },
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 1,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 2,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 2,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 2,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 2,
                                    y: 0
                                },
                                {
                                    x: 2,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        position: 1,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        base: 10,
                                        position: 1,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 1,
                                    representationInBase: '1',
                                    valueInDecimal: 1
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 3,
                                    y: 0
                                },
                                {
                                    x: 3,
                                    y: 1
                                },
                                {
                                    x: 3,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        position: 0,
                                        representationInBase: '4',
                                        valueInDecimal: 4
                                    },
                                    {
                                        base: 10,
                                        position: 0,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 0,
                                    representationInBase: '3',
                                    valueInDecimal: 3
                                }
                            }
                        }
                    ];
                    expect(grid.groups).toEqual(expected);
                });

                it('should return proper line config with vertical line separating operands and result', () => {
                    // then
                    const expected: GridLine[] = [
                        {
                            type: LineType.Horizontal,
                            index: 1
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });

            describe('when subtracting numbers without fractional part and with borrow', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('24', 10);
                    const b = fromStringDirect('19', 10);
                    const difference = subtractPositionalNumbers([a, b]);
                    grid = buildSubtractionGrid(difference);

                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [
                            {
                                content: '',
                                preset: {
                                    'default': 'defaultCell'
                                }
                            },
                            {
                                content: '',
                                preset: {
                                    'default': 'defaultCell'
                                }
                            },
                            {
                                content: '1',
                                preset: {
                                    'default': 'defaultCell'
                                }
                            },
                            {
                                content: '14',
                                preset: {
                                    'default': 'defaultCell'
                                }
                            }
                        ],
                        [
                            {
                                content: ''
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '2',
                                preset: {
                                    'default': 'crossedOutCell',
                                    hover: 'crossedOutHoverCell'
                                }
                            },
                            {
                                content: '4',
                                preset: {
                                    'default': 'crossedOutCell',
                                    hover: 'crossedOutHoverCell'
                                }
                            }
                        ],
                        [
                            {
                                content: '-'
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '1'
                            },
                            {
                                content: '9'
                            }
                        ],
                        [
                            {
                                content: ''
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '0'
                            },
                            {
                                content: '5'
                            }
                        ]
                    ];
                    expect(grid.values).toEqual(expected);
                });

                it('should return proper hover groups with position addition info', () => {
                    // then
                    const expected: CellGroup[] =[
                        {
                            cells: [
                                {
                                    x: 0,
                                    y: 0
                                },
                                {
                                    x: 0,
                                    y: 1
                                },
                                {
                                    x: 0,
                                    y: 2
                                },
                                {
                                    x: 0,
                                    y: 3
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 3,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 3,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 3,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 1,
                                    y: 0
                                },
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 1,
                                    y: 2
                                },
                                {
                                    x: 1,
                                    y: 3
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 2,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 2,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 2,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 2,
                                    y: 0
                                },
                                {
                                    x: 2,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 2
                                },
                                {
                                    x: 2,
                                    y: 3
                                }
                            ],
                            contentProps: {
                                operands: [
                                    {
                                        base: 10,
                                        position: 1,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        base: 10,
                                        position: 1,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 1,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 3,
                                    y: 0
                                },
                                {
                                    x: 3,
                                    y: 1
                                },
                                {
                                    x: 3,
                                    y: 2
                                },
                                {
                                    x: 3,
                                    y: 3
                                }
                            ],
                            contentProps: {
                                borrow: {
                                    amount: 1,
                                    fromPosition: 1,
                                    sourcePosition: 0
                                },
                                operands: [
                                    {
                                        base: 10,
                                        borrowChain: [
                                            {
                                                base: 10,
                                                position: 0,
                                                representationInBase: '4',
                                                valueInDecimal: 4
                                            },
                                            {
                                                base: 10,
                                                position: 0,
                                                representationInBase: '14',
                                                valueInDecimal: 14
                                            }
                                        ],
                                        position: 0,
                                        representationInBase: '4',
                                        valueInDecimal: 4
                                    },
                                    {
                                        base: 10,
                                        position: 0,
                                        representationInBase: '9',
                                        valueInDecimal: 9
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 0,
                                    representationInBase: '5',
                                    valueInDecimal: 5
                                }
                            }
                        }
                    ];
                    expect(grid.groups).toEqual(expected);
                });

                it('should return proper line config with horizontal line separating borrows, operands and result', () => {
                    // then
                    const expected: GridLine[] = [
                        {
                            index: 2,
                            type: LineType.Horizontal
                        },
                        {
                            index: 0,
                            span: {
                                from: 0
                            },
                            type: LineType.Horizontal
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });

            describe('when subtracting numbers with fractional part', () => {
                it('should return proper lines for fractional numbers with integer part length of one', () => {
                    // when
                    const a = fromStringDirect('9.8', 10);
                    const b = fromStringDirect('1.7', 10);
                    const difference = subtractPositionalNumbers([a, b]);
                    const grid = buildSubtractionGrid(difference);

                    // then
                    const expected: GridLine[] = [
                        {
                            index: 1,
                            type:  LineType.Horizontal
                        },
                        {
                            index: 2,
                            type: LineType.Vertical
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });

                it('should return proper lines for fractional numbers with borrow', () => {
                    // when
                    const a = fromStringDirect('21.8', 10);
                    const b = fromStringDirect('11.9', 10);
                    const difference = subtractPositionalNumbers([a, b]);
                    const grid = buildSubtractionGrid(difference);

                    // then
                    const expected: GridLine[] = [
                        {
                            index: 3,
                            type: LineType.Horizontal
                        },
                        {
                            index: 3,
                            type: LineType.Vertical
                        },
                        {
                            index: 1,
                            span: {
                                from: 2
                            },
                            type: LineType.Horizontal
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });

        });
    });
});
