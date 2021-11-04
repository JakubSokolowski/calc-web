import {
    addDigitsArrays,
    addDigitsAtPosition,
    addPositionalNumbers,
    extractResultDigitsFromAddition
} from './addition';
import { AdditionOperand, AdditionPositionResult } from '../models';
import { fromNumber, fromStringDirect } from './base-converter';

describe('addition', () => {
    describe('#addDigitsAtPosition', () => {
        it('should return correct result for two decimal numbers', () => {
            // given
            const x: AdditionOperand = {
                valueInDecimal: 4,
                representationInBase: '4',
                base: 10,
                position: 0
            };

            const y: AdditionOperand = {
                valueInDecimal: 2,
                representationInBase: '2',
                base: 10,
                position: 0
            };

            const expected: AdditionPositionResult = {
                valueAtPosition: {
                    valueInDecimal: 6,
                    representationInBase: '6',
                    base: 10,
                    position: 0
                },
                carry: [],
                operands: [x, y],
                decimalSum: 6
            };

            // when
            const result = addDigitsAtPosition([x, y], 0, 10);

            // then
            expect(result).toEqual(expected);
        });

        it('should return correct result for two decimal numbers when the result produces a carry', () => {
            // given
            const x: AdditionOperand = {
                valueInDecimal: 9,
                representationInBase: '9',
                base: 10,
                position: 0
            };

            const y: AdditionOperand = {
                valueInDecimal: 9,
                representationInBase: '9',
                base: 10,
                position: 0
            };

            const expected: AdditionPositionResult = {
                valueAtPosition: {
                    valueInDecimal: 8,
                    representationInBase: '8',
                    base: 10,
                    position: 0
                },
                carry: [
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        base: 10,
                        position: 1,
                        carrySourcePosition: 0
                    }
                ],
                operands: [x, y],
                decimalSum: 18
            };

            // when
            const result = addDigitsAtPosition([x, y], 0, 10);

            // then
            expect(result).toEqual(expected);
        });

        it('should return correct result when addition of decimal numbers produces multiple carries at different positions', () => {
            // given
            const numDigits = 14;

            const digits: AdditionOperand[] = Array(numDigits).fill({
                valueInDecimal: 9,
                valueInBase: '9',
                base: 10,
                position: 0
            });

            const expected: AdditionPositionResult = {
                valueAtPosition: {
                    valueInDecimal: 6,
                    representationInBase: '6',
                    base: 10,
                    position: 0
                },
                carry: [
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 2,
                        base: 10,
                        carrySourcePosition: 0
                    },
                    {
                        valueInDecimal: 2,
                        representationInBase: '2',
                        position: 1,
                        carrySourcePosition: 0,
                        base: 10
                    }
                ],
                operands: [...digits],
                decimalSum: 126
            };

            // when
            const result = addDigitsAtPosition(digits, 0, 10);

            // then
            expect(result).toEqual(expected);
        });

        it('should return correct result when addition of binary numbers produces multiple carries at different positions', () => {
            // given
            const numDigits = 5;

            const digits: AdditionOperand[] = Array(numDigits).fill({
                valueInDecimal: 1,
                valueInBase: '1',
                base: 2,
                position: 0
            });

            const expected: AdditionPositionResult = {
                valueAtPosition: {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 2,
                    position: 0
                },
                carry: [
                    {
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 2,
                        base: 2,
                        carrySourcePosition: 0
                    }
                ],
                operands: [...digits],
                decimalSum: 5
            };

            // when
            const result = addDigitsAtPosition(digits, 0, 10);

            // then
            expect(result).toEqual(expected);
        });
    });

    describe('#addDigits', () => {
        it('should add two digit arrays correctly', () => {
            // given
            const x: AdditionOperand[] = [
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

            const y: AdditionOperand[] = [
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

            const expectedDigits: AdditionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 10,
                    position: 3,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
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
            const result = addDigitsArrays([x, y]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        });

        it('should add two digit arrays correctly when numbers are hexadecimal', () => {
            // given
            const a: AdditionOperand[] = fromStringDirect('1B49', 16).complement.asDigits();
            const b: AdditionOperand[] = fromStringDirect('FF2B', 16).complement.asDigits();

            const expectedDigits: AdditionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 16,
                    position: 5,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 16,
                    position: 4
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 16,
                    position: 3
                },
                {
                    valueInDecimal: 10,
                    representationInBase: 'A',
                    base: 16,
                    position: 2
                },
                {
                    valueInDecimal: 7,
                    representationInBase: '7',
                    base: 16,
                    position: 1
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
                    base: 16,
                    position: 0
                }

            ];

            // when
            const result = addDigitsArrays([a, b]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        });

        it('should add digit arrays correctly when numbers are binary', () => {
            // given
            const a: AdditionOperand[] = fromNumber(11, 2).complement.asDigits();
            const b: AdditionOperand[] = fromNumber(13, 2).complement.asDigits();
            const c: AdditionOperand[] = fromNumber(9, 2).complement.asDigits();
            const d: AdditionOperand[] = fromNumber(15, 2).complement.asDigits();

            const expectedDigits: AdditionOperand[] = [
                {
                    base: 2,
                    isComplementExtension: true,
                    position: 6,
                    representationInBase: '(0)',
                    valueInDecimal: 0
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 2,
                    position: 5
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 2,
                    position: 4
                },
                {
                    valueInDecimal: 0,
                    representationInBase: '0',
                    base: 2,
                    position: 3
                },
                {
                    valueInDecimal: 0,
                    representationInBase: '0',
                    base: 2,
                    position: 2
                },
                {
                    valueInDecimal: 0,
                    representationInBase: '0',
                    base: 2,
                    position: 1
                },
                {
                    valueInDecimal: 0,
                    representationInBase: '0',
                    base: 2,
                    position: 0
                }
            ];

            // when
            const result = addDigitsArrays([a, b, c, d]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        });

        it('should add negative and positive number complement digit arrays correctly', () => {
            // given
            const x: AdditionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 10,
                    position: 3,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 5,
                    representationInBase: '5',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 6,
                    representationInBase: '6',
                    base: 10,
                    position: 0
                }
            ];
            const y: AdditionOperand[] = [
                {
                    valueInDecimal: 9,
                    representationInBase: '(9)',
                    base: 10,
                    position: 3,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 7,
                    representationInBase: '7',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 3,
                    representationInBase: '3',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 8,
                    representationInBase: '8',
                    base: 10,
                    position: 0
                }
            ];

            // when
            const result = addDigitsArrays([x, y]);

            // then
            const expectedDigits: AdditionOperand[] = [
                {
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    base: 10,
                    position: 3,
                    isComplementExtension: true
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 9,
                    representationInBase: '9',
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
            expect(result.resultDigits).toEqual(expectedDigits);
        });

        it('should add multiple negative numbers complements digit arrays correctly', () => {
            // given
            const x: AdditionOperand[] = [
                {
                    valueInDecimal: 9,
                    representationInBase: '(9)',
                    base: 10,
                    isComplementExtension: true,
                    position: 3
                },
                {
                    valueInDecimal: 7,
                    representationInBase: '7',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 8,
                    representationInBase: '8',
                    base: 10,
                    position: 0
                }
            ];

            const y: AdditionOperand[] = [
                {
                    valueInDecimal: 9,
                    representationInBase: '(9)',
                    isComplementExtension: true,
                    base: 10,
                    position: 3
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 2,
                    representationInBase: '2',
                    base: 10,
                    position: 0
                }
            ];

            const z: AdditionOperand[] = [
                {
                    valueInDecimal: 9,
                    representationInBase: '(9)',
                    isComplementExtension: true,
                    base: 10,
                    position: 3
                },
                {
                    valueInDecimal: 2,
                    representationInBase: '2',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 7,
                    representationInBase: '7',
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

            const expectedDigits: AdditionOperand[] = [
                {
                    base: 10,
                    isComplementExtension: true,
                    position: 4,
                    representationInBase: '(9)',
                    valueInDecimal: 9
                },
                {
                    base: 10,
                    position: 3,
                    representationInBase: '8',
                    valueInDecimal: 8
                },
                {
                    base: 10,
                    position: 2,
                    representationInBase: '4',
                    valueInDecimal: 4
                },
                {
                    base: 10,
                    position: 1,
                    representationInBase: '3',
                    valueInDecimal: 3
                },
                {
                    base: 10,
                    position: 0,
                    representationInBase: '5',
                    valueInDecimal: 5
                }
            ];

            // when
            const result = addDigitsArrays([x, y, z]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        });
    });


    describe('#addPositionalNumbers', () => {
        describe('when numbers are base 2', () => {
            const base = 2;

            test.each([
                ['0', '0', '0'],
                ['-1', '1', '0'],
                ['111011', '101101', '1101000'],
                ['-111', '-111', '-1110'],
                ['100', '-10', '10'],
                ['0.00101', '-11101', '-11100.11011'],
                ['10010', '0.00110', '10010.00110'],
                ['10010', '-0.00110', '10001.11010']
            ])('addPositionalNumbers([%i, %i]) should return proper result', (a: string, b: string, expected: string) => {
                // given
                const numA = fromStringDirect(a, base);
                const numB = fromStringDirect(b, base);

                // when
                const result = addPositionalNumbers([numA, numB]).numberResult.toDigitsList();

                // then
                const numExpected = fromStringDirect(expected, base).toDigitsList();
                expect(result).toEqual(numExpected);
            });
        });

        describe('when numbers are base 10', () => {
            const base = 10;

            test.each([
                [0, 0, 0],
                [-1, 1, 0],
                [5999, 5999, 11998],
                [-199, -123, -322],
                [10, -20, -10],
                [10, 0.0009, 10.0009],
                [10.1236, 0.0009, 10.1245],
                [10.1236, -0.0009, 10.1227],
            ])('addPositionalNumbers([%i, %i]) should return proper result', (a, b, expected) => {
                // given
                const numA = fromNumber(a, base);
                const numB = fromNumber(b, base);

                // when
                const result = addPositionalNumbers([numA, numB]).numberResult.toDigitsList();

                // then
                const numExpected = fromNumber(expected, base).toDigitsList();
                expect(result).toEqual(numExpected);
            });
        });

        describe('when numbers are base 64', () => {
            const base = 64;

            test.each([
                ['00', '00', '00'],
                ['-01', '01', '00'],
                ['56 34 21', '11 08 19', '01 03 42 40'],
                ['10', '-20', '-10'],
                ['10', '-20', '-10'],
                ['12 13.45', '44 32', '56 45.45'],
                ['12 13.45', '-44 32', '-32 18.19'],
            ])('addPositionalNumbers([%s, %s]) should return proper result', (a: string, b: string, expected: string) => {
                // given
                const numA = fromStringDirect(a, base);
                const numB = fromStringDirect(b, base);

                // when
                const result = addPositionalNumbers([numA, numB]).numberResult.toDigitsList();

                // then
                const numExpected = fromStringDirect(expected, base).toDigitsList();
                expect(result).toEqual(numExpected);
            });
        });
    });

    describe('#extractResultDigitsFromAddition', () => {
        it('should extract proper digits for results that have digits that look like extension but are not', () => {
            // given
            const positionResults: AdditionPositionResult[] = [
                {
                    valueAtPosition: {
                        base: 10,
                        representationInBase: '0',
                        valueInDecimal: 0,
                        position: 0
                    },
                    carry: [],
                    operands: [
                        {
                            position: 0,
                            base: 10,
                            representationInBase: '0',
                            valueInDecimal: 0
                        },
                        {
                            position: 0,
                            base: 10,
                            representationInBase: '0',
                            valueInDecimal: 0
                        }
                    ],
                    decimalSum: 0
                },
                {
                    valueAtPosition: {
                        base: 10,
                        representationInBase: '9',
                        valueInDecimal: 9,
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
                            representationInBase: '8',
                            valueInDecimal: 8
                        }
                    ],
                    decimalSum: 0
                },
                {
                    valueAtPosition: {
                        base: 10,
                        representationInBase: '9',
                        valueInDecimal: 9,
                        position: 2
                    },
                    carry: [],
                    operands: [
                        {
                            isComplementExtension: true,
                            position: 2,
                            representationInBase: '(0)',
                            valueInDecimal: 0,
                            base: 10
                        },
                        {
                            isComplementExtension: true,
                            position: 2,
                            representationInBase: '(9)',
                            valueInDecimal: 9,
                            base: 10
                        }
                    ],
                    decimalSum: 0
                },
                {
                    valueAtPosition: {
                        base: 10,
                        representationInBase: '9',
                        valueInDecimal: 9,
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
                            isComplementExtension: true,
                            position: 3,
                            representationInBase: '(9)',
                            valueInDecimal: 9,
                            base: 10
                        }
                    ],
                    decimalSum: 0
                }
            ];

            // when
            const digits = extractResultDigitsFromAddition(positionResults);

            // then
            const expected: AdditionOperand[] = [
                {
                    base: 10,
                    isComplementExtension: true,
                    position: 2,
                    representationInBase: '(9)',
                    valueInDecimal: 9
                },
                {
                    base: 10,
                    position: 1,
                    representationInBase: '9',
                    valueInDecimal: 9
                },
                {
                    base: 10,
                    position: 0,
                    representationInBase: '0',
                    valueInDecimal: 0
                }
            ];
            expect(digits).toEqual(expected);
        });
    });
});
