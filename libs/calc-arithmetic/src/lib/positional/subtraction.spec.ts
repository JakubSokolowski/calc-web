import { SubtractionOperand, SubtractionPositionResult, SubtractionResult } from '../models';
import { subtractDigitArrays, subtractDigitsAtPosition, subtractPositionalNumbers } from './subtraction';
import { fromNumber, fromStringDirect } from './base-converter';

describe('subtraction', () => {
    describe('#subtractDigitsAtPosition', () => {
        it('should return proper result when subtracting smaller number from greater', () => {
            // given
            const base = 10;
            const position = 0;
            const minuend: SubtractionOperand = {
                base,
                position,
                representationInBase: '8',
                valueInDecimal: 8
            };

            const subtrahend: SubtractionOperand = {
                base,
                position,
                representationInBase: '3',
                valueInDecimal: 3
            };

            const operands = [minuend, subtrahend];

            // when
            const result = subtractDigitsAtPosition(operands, position, base);

            // then
            const expected: SubtractionPositionResult = {
                valueAtPosition: {
                    base,
                    position,
                    representationInBase: '5',
                    valueInDecimal: 5
                },
                operands
            };
            expect(result).toEqual(expected);
        });

        it('should return proper result when subtracting greater number from smaller', () => {
            // given
            const base = 10;
            const position = 0;
            const minuend: SubtractionOperand = {
                base,
                position,
                representationInBase: '4',
                valueInDecimal: 4
            };

            const subtrahend: SubtractionOperand = {
                base,
                position,
                representationInBase: '6',
                valueInDecimal: 6
            };

            const operands = [minuend, subtrahend];

            // when
            const result = subtractDigitsAtPosition(operands, position, base);

            // then
            const expected: SubtractionPositionResult = {
                valueAtPosition: {
                    base,
                    position,
                    representationInBase: '8',
                    valueInDecimal: 8
                },
                operands,
                borrow: { amount: 1, fromPosition: 1, sourcePosition: 0 }
            };
            expect(result).toEqual(expected);
        });

        it('should return proper result when subtracting max digit for base from min digit for base', () => {
            // given
            const base = 10;
            const position = 0;
            const minuend: SubtractionOperand = {
                base,
                position,
                representationInBase: '0',
                valueInDecimal: 0
            };

            const subtrahend: SubtractionOperand = {
                base,
                position,
                representationInBase: '9',
                valueInDecimal: 9
            };

            const operands = [minuend, subtrahend];

            // when
            const result = subtractDigitsAtPosition(operands, position, base);

            // then
            const expected: SubtractionPositionResult = {
                valueAtPosition: {
                    base,
                    position,
                    representationInBase: '1',
                    valueInDecimal: 1
                },
                operands,
                borrow: { amount: 1, fromPosition: 1, sourcePosition: 0 }
            };
            expect(result).toEqual(expected);
        });

        it('should return proper result when subtracting multiple numbers position borrow from non subsequent position', () => {
            // given
            const base = 2;
            const position = 0;
            const minuend: SubtractionOperand = {
                base,
                position,
                representationInBase: '1',
                valueInDecimal: 1
            };

            const subtrahend: SubtractionOperand = {
                base,
                position,
                representationInBase: '1',
                valueInDecimal: 1
            };

            const operands = [minuend, ...Array(4).fill(subtrahend)];

            // when
            const result = subtractDigitsAtPosition(operands, position, base);

            // then
            const expected: SubtractionPositionResult = {
                valueAtPosition: {
                    base,
                    position,
                    representationInBase: '1',
                    valueInDecimal: 1
                },
                operands, borrow: { amount: 1, fromPosition: 2, sourcePosition: 0 }
            };
            expect(result).toEqual(expected);
        });
    });

    describe('#subtractDigitArrays', () => {
        it('should subtract two digit arrays correctly', () => {
            // given
            const x: SubtractionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 10,
                    position: 2,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 7,
                    representationInBase: '7',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 9,
                    representationInBase: '9',
                    base: 10,
                    position: 0
                }
            ];

            const y: SubtractionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 10,
                    position: 2,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 6,
                    representationInBase: '6',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 5,
                    representationInBase: '5',
                    base: 10,
                    position: 0
                }
            ];

            const expectedDigits: SubtractionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 10,
                    position: 2,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
                    base: 10,
                    position: 0
                }
            ];

            // when
            const result = subtractDigitArrays([x, y]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        });

        describe('when subtracting two digits arrays with some position that need to borrow', () => {
            let x: SubtractionOperand[];
            let y: SubtractionOperand[];
            let result: SubtractionResult;

            beforeEach(() => {
                // given
                x = [
                    {
                        valueInDecimal: 0,
                        representationInBase: '(0)',
                        base: 10,
                        position: 2,
                        isComplementExtension: true
                    },
                    {
                        valueInDecimal: 7,
                        representationInBase: '7',
                        base: 10,
                        position: 1
                    },
                    {
                        valueInDecimal: 4,
                        representationInBase: '4',
                        base: 10,
                        position: 0
                    }
                ];
                y = [
                    {
                        valueInDecimal: 0,
                        representationInBase: '(0)',
                        base: 10,
                        position: 2,
                        isComplementExtension: true
                    },
                    {
                        valueInDecimal: 6,
                        representationInBase: '6',
                        base: 10,
                        position: 1
                    },
                    {
                        valueInDecimal: 5,
                        representationInBase: '5',
                        base: 10,
                        position: 0
                    }
                ];

                // when
                result = subtractDigitArrays([x, y]);
            });

            it('should subtract two digit arrays correctly', () => {
                // then
                const expectedDigits: SubtractionOperand[] = [
                    {
                        valueInDecimal: 0,
                        representationInBase: '(0)',
                        position: 2,
                        base: 10,
                        isComplementExtension: true
                    },
                    {
                        valueInDecimal: 0,
                        representationInBase: '0',
                        position: 1,
                        base: 10
                    },
                    {
                        valueInDecimal: 9,
                        representationInBase: '9',
                        base: 10,
                        position: 0
                    }
                ];
                expect(result.resultDigits).toEqual(expectedDigits);
            });

            it('should generate proper borrow chain for minuend positions from which it was borrowed', () => {
                // then
                const minuend = result.operands[0];
                const positionWithBorrow = minuend[1];

                const expected: SubtractionOperand = {
                    valueInDecimal: 7,
                    representationInBase: '7',
                    base: 10,
                    position: 1,
                    borrowChain: [
                        {
                            valueInDecimal: 7,
                            representationInBase: '7',
                            base: 10,
                            position: 1
                        },
                        {
                            valueInDecimal: 6,
                            representationInBase: '6',
                            base: 10,
                            position: 1
                        }
                    ]
                };
                expect(positionWithBorrow).toEqual(expected);
            });
        });

        describe('when subtracting two digit arrays when some position is borrowed from, and needs borrow after', () => {
            let x: SubtractionOperand[];
            let y: SubtractionOperand[];
            let result: SubtractionResult;

            beforeEach(() => {
                // given
                x = [
                    {
                        valueInDecimal: 0,
                        representationInBase: '(0)',
                        base: 10,
                        position: 2,
                        isComplementExtension: true
                    },
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        base: 10,
                        position: 1
                    },
                    {
                        valueInDecimal: 0,
                        representationInBase: '0',
                        base: 10,
                        position: 0
                    },
                    {
                        valueInDecimal: 0,
                        representationInBase: '0',
                        base: 10,
                        position: -1
                    }
                ];
                y = [
                    {
                        valueInDecimal: 0,
                        representationInBase: '(0)',
                        base: 10,
                        position: 1,
                        isComplementExtension: true
                    },
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        base: 10,
                        position: 0
                    },
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        base: 10,
                        position: -1
                    }
                ];

                // when
                result = subtractDigitArrays([x, y]);
            });

            it('should subtract two digit arrays correctly', () => {
                // then
                const expectedDigits: SubtractionOperand[] = [
                    {
                        base: 10,
                        isComplementExtension: true,
                        position: 1,
                        representationInBase: '(0)',
                        valueInDecimal: 0
                    },
                    {
                        base: 10,
                        position: 0,
                        representationInBase: '8',
                        valueInDecimal: 8
                    },
                    {
                        base: 10,
                        position: -1,
                        representationInBase: '9',
                        valueInDecimal: 9
                    }
                ];
                expect(result.resultDigits).toEqual(expectedDigits);
            });

            it('should generate proper borrow chain for minuend position that borrows', () => {
                // then
                const positionThatBorrows = result.stepResults[0];

                const expected: SubtractionPositionResult = {
                    borrow: {
                        amount: 1,
                        fromPosition: 0,
                        sourcePosition: -1
                    },
                    operands: [
                        {
                            base: 10,
                            borrowChain: [
                                {
                                    base: 10,
                                    position: -1,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                },
                                {
                                    base: 10,
                                    position: -1,
                                    representationInBase: '10',
                                    valueInDecimal: 10
                                }
                            ],
                            position: -1,
                            representationInBase: '0',
                            valueInDecimal: 0
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
                        representationInBase: '9',
                        valueInDecimal: 9
                    }
                };
                expect(positionThatBorrows).toEqual(expected);
            });

            it('should generate proper borrow chain for minuend position that borrows and is borrowed from', () => {
                // then
                const doubleBorrowPosition = result.stepResults[1];

                const expected: SubtractionPositionResult = {
                    borrow: {
                        amount: 1,
                        fromPosition: 1,
                        sourcePosition: 0
                    },
                    operands: [
                        {
                            base: 10,
                            position: 0,
                            representationInBase: '-1',
                            valueInDecimal: -1,
                            borrowChain: [
                                {
                                    base: 10,
                                    position: 0,
                                    representationInBase: '0',
                                    valueInDecimal: 0
                                },
                                {
                                    base: 10,
                                    position: 0,
                                    representationInBase: '-1',
                                    valueInDecimal: -1
                                },
                                {
                                    base: 10,
                                    position: 0,
                                    representationInBase: '9',
                                    valueInDecimal: 9
                                }
                            ],
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
                        representationInBase: '8',
                        valueInDecimal: 8
                    }
                };
                expect(doubleBorrowPosition).toEqual(expected);
            });
        });
    });

    describe('#subtractPositionalNumbers', () => {
        describe('when subtracting two operands', () => {
            it('should return proper result when subtrahend has fraction part and minuend does not', () => {
                // given
                const minuend = fromNumber(10, 10).result;
                const subtrahend = fromNumber(1.1, 10).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '8.9';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            it('should return proper result for operands with fractional parts', () => {
                // given
                const minuend = fromNumber(98723.123, 10).result;
                const subtrahend = fromNumber(7643.87543, 10).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '91079.24757';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            // BUG #207
            it('should return proper result when result has leading digits that look like complement extension', () => {
                // given
                const base = 9;
                const minuend = fromStringDirect('13.4', base).result;
                const subtrahend = fromStringDirect('23.4', base).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '-10.0';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            // BUG #208
            it('should return proper result for base 9 numbers with fraction parts', () => {
                // given
                const base = 9;
                const minuend = fromStringDirect('0.72', base).result;
                const subtrahend = fromStringDirect('0.78323', base).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '-0.06323';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            // BUG #215
            it('should return proper result for base 10 with -0.01 result', () => {
                // given
                const base = 10;
                const minuend = fromStringDirect('1.001', base).result;
                const subtrahend = fromStringDirect('1.011', base).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '-0.010';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            // BUG #221
            it('should return proper result for base 10 with -10 result', () => {
                // given
                const base = 10;
                const minuend = fromStringDirect('2.3', base).result;
                const subtrahend = fromStringDirect('12.3', base).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '-10.0';
                expect(result.numberResult.toString()).toEqual(expected);
            });

            // BUG #221
            it('should return proper result for base 4 with -10 (-4) result', () => {
                // given
                const base = 4;
                const minuend = fromStringDirect('2.3', base).result;
                const subtrahend = fromStringDirect('12.3', base).result;

                // when
                const result = subtractPositionalNumbers([minuend, subtrahend]);

                // then
                const expected = '-10.0';
                expect(result.numberResult.toString()).toEqual(expected);
            });
        });

        describe('when subtracting multiple operands', () => {
            it('should return result with proper borrow chain when borrow amount is greater than 1', () => {
                // given
                const x = fromNumber(10, 10).result;
                const y = fromNumber(9, 10).result;
                const z = fromNumber(2, 10).result;

                // when
                const result = subtractPositionalNumbers([x, y, z]);

                // then
                const expected: SubtractionOperand [] = [
                    {
                        base: 10,
                        position: 0,
                        representationInBase: '0',
                        valueInDecimal: 0
                    },
                    {
                        base: 10,
                        position: 0,
                        representationInBase: '20',
                        valueInDecimal: 20
                    }
                ];
                expect(result.stepResults[0].operands[0].borrowChain).toEqual(expected);
            });
        });
    });
});
