import { addPositionalNumbers, fromStringDirect } from '@calc/calc-arithmetic';
import { buildAdditionGrid, CellGroup, GridCellConfig, GridLine, HoverOperationGrid, LineType } from '@calc/grid';
import React from 'react';

describe('addition-grid', () => {
    describe('#buildAdditionGrid', () => {
        describe('for base 10 numbers', () => {
            describe('when adding two positive numbers without fractional part', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('123', 10).result;
                    const b = fromStringDirect('321', 10).result;
                    const sum = addPositionalNumbers([a, b]);
                    grid = buildAdditionGrid(sum);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [{ content: '' }, { content: '(0)' }, { content: '1' }, { content: '2' }, { content: '3' }],
                        [{ content: '+' }, { content: '(0)' }, { content: '3' }, { content: '2' }, { content: '1' }],
                        [{ content: '' }, { content: '(0)' }, { content: '4' }, { content: '4' }, { content: '4' }]
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
                                carry: [],
                                decimalSum: 0,
                                operands: [
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 4,
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
                                carry: [],
                                decimalSum: 0,
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
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: 2,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        base: 10,
                                        position: 2,
                                        representationInBase: '3',
                                        valueInDecimal: 3
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 2,
                                    representationInBase: '4',
                                    valueInDecimal: 4
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
                                carry: [],
                                decimalSum: 4,
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
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 1,
                                    representationInBase: '4',
                                    valueInDecimal: 4
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 0
                                },
                                {
                                    x: 4,
                                    y: 1
                                },
                                {
                                    x: 4,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: 0,
                                        representationInBase: '3',
                                        valueInDecimal: 3
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
                                    representationInBase: '4',
                                    valueInDecimal: 4
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

            describe('when adding two positive numbers with fractional part', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('123.321', 10).result;
                    const b = fromStringDirect('321.123', 10).result;
                    const sum = addPositionalNumbers([a, b]);
                    grid = buildAdditionGrid(sum);
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
                                content: '1'
                            },
                            {
                                content: '2'
                            },
                            {
                                content: '3'
                            },
                            {
                                content: '3'
                            },
                            {
                                content: '2'
                            },
                            {
                                content: '1'
                            }
                        ],
                        [
                            {
                                content: '+'
                            },
                            {
                                content: '(0)'
                            },
                            {
                                content: '3'
                            },
                            {
                                content: '2'
                            },
                            {
                                content: '1'
                            },
                            {
                                content: '1'
                            },
                            {
                                content: '2'
                            },
                            {
                                content: '3'
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
                                content: '4'
                            },
                            {
                                content: '4'
                            },
                            {
                                content: '4'
                            },
                            {
                                content: '4'
                            },
                            {
                                content: '4'
                            },
                            {
                                content: '4'
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
                                carry: [],
                                decimalSum: 0,
                                operands: [
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 4,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 4,
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
                                carry: [],
                                decimalSum: 0,
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
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: 2,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        base: 10,
                                        position: 2,
                                        representationInBase: '3',
                                        valueInDecimal: 3
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 2,
                                    representationInBase: '4',
                                    valueInDecimal: 4
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
                                carry: [],
                                decimalSum: 4,
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
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: 1,
                                    representationInBase: '4',
                                    valueInDecimal: 4
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 4,
                                    y: 0
                                },
                                {
                                    x: 4,
                                    y: 1
                                },
                                {
                                    x: 4,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: 0,
                                        representationInBase: '3',
                                        valueInDecimal: 3
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
                                    representationInBase: '4',
                                    valueInDecimal: 4
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 5,
                                    y: 0
                                },
                                {
                                    x: 5,
                                    y: 1
                                },
                                {
                                    x: 5,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: -1,
                                        representationInBase: '3',
                                        valueInDecimal: 3
                                    },
                                    {
                                        base: 10,
                                        position: -1,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: -1,
                                    representationInBase: '4',
                                    valueInDecimal: 4
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 6,
                                    y: 0
                                },
                                {
                                    x: 6,
                                    y: 1
                                },
                                {
                                    x: 6,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: -2,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    },
                                    {
                                        base: 10,
                                        position: -2,
                                        representationInBase: '2',
                                        valueInDecimal: 2
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: -2,
                                    representationInBase: '4',
                                    valueInDecimal: 4
                                }
                            }
                        },
                        {
                            cells: [
                                {
                                    x: 7,
                                    y: 0
                                },
                                {
                                    x: 7,
                                    y: 1
                                },
                                {
                                    x: 7,
                                    y: 2
                                }
                            ],
                            contentProps: {
                                carry: [],
                                decimalSum: 4,
                                operands: [
                                    {
                                        base: 10,
                                        position: -3,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        base: 10,
                                        position: -3,
                                        representationInBase: '3',
                                        valueInDecimal: 3
                                    }
                                ],
                                valueAtPosition: {
                                    base: 10,
                                    position: -3,
                                    representationInBase: '4',
                                    valueInDecimal: 4
                                }
                            }
                        }
                    ];
                    expect(grid.groups).toEqual(expected);
                });

                it('should return proper line config with hor. line separating operands and result and vert. line for integer and fractional parts', () => {
                    // then
                    const expected: GridLine[] = [
                        {
                            type: LineType.Horizontal,
                            index: 1
                        },
                        {
                            type: LineType.Vertical,
                            index: 4
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });

            describe('when adding two opposite numbers', () => {
                let grid: HoverOperationGrid;

                beforeEach(() => {
                    // when
                    const a = fromStringDirect('1', 10).result;
                    const b = fromStringDirect('-1', 10).result;
                    const sum = addPositionalNumbers([a, b]);
                    grid = buildAdditionGrid(sum);
                });

                it('should return proper grid values', () => {
                    // then
                    const expected: GridCellConfig[][] = [
                        [
                            {
                                content: ''
                            },
                            {
                                content: (
                                    <div>{'1'}<sub style={{ fontSize: 8 }}>{0}</sub></div>
                                )
                            },
                            {
                                content: ''
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
                            }
                        ],
                        [
                            {
                                content: '+'
                            },
                            {
                                content: '(9)'
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
                                },
                                {
                                    x: 0,
                                    y: 3
                                }
                            ],
                            contentProps: {
                                carry: [
                                    {
                                        base: 10,
                                        carrySourcePosition: 2,
                                        position: 3,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                decimalSum: 10,
                                operands: [
                                    {
                                        base: 10,
                                        carrySourcePosition: 1,
                                        isCarry: true,
                                        position: 2,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
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
                                        representationInBase: '(9)',
                                        valueInDecimal: 9
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
                                carry: [
                                    {
                                        base: 10,
                                        carrySourcePosition: 1,
                                        position: 2,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                decimalSum: 10,
                                operands: [
                                    {
                                        base: 10,
                                        carrySourcePosition: 0,
                                        isCarry: true,
                                        position: 1,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 1,
                                        representationInBase: '(0)',
                                        valueInDecimal: 0
                                    },
                                    {
                                        base: 10,
                                        isComplementExtension: true,
                                        position: 1,
                                        representationInBase: '(9)',
                                        valueInDecimal: 9
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
                                carry: [
                                    {
                                        base: 10,
                                        carrySourcePosition: 0,
                                        position: 1,
                                        representationInBase: '1',
                                        valueInDecimal: 1
                                    }
                                ],
                                decimalSum: 10,
                                operands: [
                                    {
                                        base: 10,
                                        position: 0,
                                        representationInBase: '1',
                                        valueInDecimal: 1
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
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                }
                            }
                        }
                    ];
                    expect(grid.groups).toEqual(expected);
                });

                it('should return proper line config with hor. lines separating carries, operands and result', () => {
                    // then
                    const expected: GridLine[] = [
                        {
                            type: LineType.Horizontal,
                            index: 2
                        },
                        {
                            type: LineType.Horizontal,
                            index: 0,
                            span: {
                                from: 0
                            }
                        }
                    ];
                    expect(grid.lines).toEqual(expected);
                });
            });
        });
    });
});
