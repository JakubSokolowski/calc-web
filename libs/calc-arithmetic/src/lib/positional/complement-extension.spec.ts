import { extendComplement, hasInfiniteExtension, mergeExtensionDigits } from './complement-extension';
import { AdditionOperand, AdditionPositionResult, Digit } from '../models';


describe('complement-extension', () => {
    describe('#hasInfiniteExtension', () => {
        it('should return false when global most significant position is more significant than curr position', () => {
            // given
            const prev: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 4,
                    representationInBase: '4',
                    position: 4
                },
                operands: [],
                carry: [],
                decimalSum: 0
            };

            const curr: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 6,
                    representationInBase: '6',
                    position: 5
                },
                operands: [],
                carry: [],
                decimalSum: 0
            };

            // when
            const result = hasInfiniteExtension(prev, curr, 5);

            // then
            expect(result).toBeFalsy();
        });

        it('should return false when prev and curr position results are not equal', () => {
            // given
            const prev: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 4,
                    representationInBase: '4',
                    position: 0
                },
                operands: [],
                carry: [],
                decimalSum: 0
            };

            const curr: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 6,
                    representationInBase: '6',
                    position: 1
                },
                operands: [],
                carry: [],
                decimalSum: 0
            };

            // when
            const result = hasInfiniteExtension(prev, curr, 3);

            // then
            expect(result).toBeFalsy();
        });

        it('should return false when prev and curr have different operands', () => {
            // given
            const prev: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 4,
                    representationInBase: '4',
                    position: 0
                },
                operands: [
                    {
                        base: 10,
                        valueInDecimal: 4,
                        representationInBase: '4',
                        position: 0
                    },
                    {
                        base: 10,
                        valueInDecimal: 5,
                        representationInBase: '5',
                        position: 0
                    },
                    {
                        base: 10,
                        valueInDecimal: 4,
                        representationInBase: '5',
                        position: 0
                    }
                ],
                carry: [
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 1
                    }
                ],
                decimalSum: 14
            };

            const curr: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 4,
                    representationInBase: '4',
                    position: 1
                },
                operands: [
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 1,
                        carrySourcePosition: 0,
                        isCarry: true
                    },
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 1
                    },
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 1
                    },
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 1
                    }
                ],
                carry: [],
                decimalSum: 4
            };

            // when
            const result = hasInfiniteExtension(prev, curr, 0);

            // then
            expect(result).toBeFalsy();
        });

        it('should return false when curr has some carry from non-previous position', () => {
            // given
            const prev: AdditionPositionResult = {
                valueAtPosition: {
                    base: 2,
                    representationInBase: '1',
                    valueInDecimal: 1,
                    position: 4
                },
                carry: [],
                operands: [
                    {
                        position: 4,
                        base: 2,
                        representationInBase: '1',
                        valueInDecimal: 1,
                        isCarry: true
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    }
                ],
                decimalSum: 1
            };

            const curr: AdditionPositionResult = {
                valueAtPosition: {
                    base: 2,
                    representationInBase: '1',
                    valueInDecimal: 1,
                    position: 5
                },
                carry: [],
                operands: [
                    {
                        position: 5,
                        base: 2,
                        representationInBase: '1',
                        valueInDecimal: 1,
                        isCarry: true
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    }
                ],
                decimalSum: 1
            };

            // when
            const result = hasInfiniteExtension(prev, curr, 0);

            // then
            expect(result).toBeFalsy();
        });

        it('should return false when curr has more than one carry', () => {
            // given
            const prev: AdditionPositionResult = {
                valueAtPosition: {
                    base: 2,
                    representationInBase: '1',
                    valueInDecimal: 1,
                    position: 4
                },
                carry: [],
                operands: [
                    {
                        position: 4,
                        base: 2,
                        representationInBase: '1',
                        valueInDecimal: 1,
                        isCarry: true
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    }
                ],
                decimalSum: 1
            };

            const curr: AdditionPositionResult = {
                valueAtPosition: {
                    base: 2,
                    representationInBase: '1',
                    valueInDecimal: 1,
                    position: 5
                },
                carry: [],
                operands: [
                    {
                        position: 5,
                        base: 2,
                        representationInBase: '1',
                        valueInDecimal: 1,
                        carrySourcePosition: 3,
                        isCarry: true
                    },
                    {
                        position: 5,
                        base: 2,
                        representationInBase: '1',
                        valueInDecimal: 1,
                        carrySourcePosition: 2,
                        isCarry: true
                    },
                    {
                        isComplementExtension: true,
                        position: 4,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    },
                    {
                        isComplementExtension: true,
                        position: 5,
                        representationInBase: '(0)',
                        valueInDecimal: 0,
                        base: 2
                    }
                ],
                decimalSum: 2
            };

            // when
            const result = hasInfiniteExtension(prev, curr, 3);

            // then
            expect(result).toBeFalsy();
        });

        it('should return true when prev and curr have same operands, position results and curr has single carry from prev', () => {
            // given
            const prev: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 9,
                    representationInBase: '9',
                    position: 3
                },
                operands: [
                    {
                        base: 10,
                        valueInDecimal: 9,
                        representationInBase: '9',
                        position: 3
                    },
                    {
                        base: 10,
                        valueInDecimal: 9,
                        representationInBase: '9',
                        position: 3
                    },
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 3,
                        isCarry: true
                    }
                ],
                carry: [
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 4,
                        isCarry: true
                    }
                ],
                decimalSum: 19
            };

            const curr: AdditionPositionResult = {
                valueAtPosition: {
                    base: 10,
                    valueInDecimal: 9,
                    representationInBase: '9',
                    position: 4
                },
                operands: [
                    {
                        base: 10,
                        valueInDecimal: 9,
                        representationInBase: '9',
                        position: 4
                    },
                    {
                        base: 10,
                        valueInDecimal: 9,
                        representationInBase: '9',
                        position: 4
                    },
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 4,
                        carrySourcePosition: 3,
                        isCarry: true
                    }
                ],
                carry: [
                    {
                        base: 10,
                        valueInDecimal: 1,
                        representationInBase: '1',
                        position: 5,
                        isCarry: true
                    }
                ],
                decimalSum: 19
            };

            // when
            const result = hasInfiniteExtension(prev, curr, 3);

            // then
            expect(result).toBeTruthy();
        });
    });

    describe('#mergeExtensionDigits', () => {
        it('should return initial digit array when array num of digits in array is less than 3', () => {
            // given
            const resultDigits: Digit[] = [
                {
                    base: 10,
                    representationInBase: '(0)',
                    valueInDecimal: 0,
                    position: 1,
                    isComplementExtension: true
                },
                {
                    base: 10,
                    representationInBase: '1',
                    valueInDecimal: 1,
                    position: 0
                }
            ];

            // when
            const result = mergeExtensionDigits(resultDigits);

            // then
            const expected: Digit[] = [...resultDigits];
            expect(result).toEqual(expected);
        });

        it('should return initial digit array when there is only one extension digit', () => {
            // given
            const resultDigits: Digit[] = [
                {
                    base: 10,
                    representationInBase: '(0)',
                    valueInDecimal: 0,
                    position: 3,
                    isComplementExtension: true
                },
                {
                    base: 10,
                    representationInBase: '1',
                    valueInDecimal: 1,
                    position: 2
                },
                {
                    base: 10,
                    representationInBase: '5',
                    valueInDecimal: 5,
                    position: 1
                },
                {
                    base: 10,
                    representationInBase: '6',
                    valueInDecimal: 6,
                    position: 0
                }
            ];

            // when
            const result = mergeExtensionDigits(resultDigits);

            // then
            const expected: Digit[] = [...resultDigits];
            expect(result).toEqual(expected);
        });

        it('should merge leading zeros into extension', () => {
            // given
            const digits: Digit[] = [
                { base: 8, representationInBase: '(0)', valueInDecimal: 0, position: 3, isComplementExtension: true },
                { base: 8, representationInBase: '0', valueInDecimal: 0, position: 2 },
                { base: 8, representationInBase: '2', valueInDecimal: 2, position: 1 },
                { base: 8, representationInBase: '3', valueInDecimal: 3, position: 0 }
            ];

            // when
            const result = mergeExtensionDigits(digits);

            // then
            const expected: Digit[] = [
                { base: 8, representationInBase: '(0)', valueInDecimal: 0, position: 2, isComplementExtension: true },
                { base: 8, representationInBase: '2', valueInDecimal: 2, position: 1 },
                { base: 8, representationInBase: '3', valueInDecimal: 3, position: 0 }
            ];

            expect(result).toEqual(expected);
        });

        it('should return proper digit array for only zeroes', () => {
            // given
            const resultDigits: AdditionOperand[] = [
                {
                    base: 10,
                    representationInBase: '0',
                    valueInDecimal: 0,
                    position: 2
                },
                {
                    base: 10,
                    representationInBase: '0',
                    valueInDecimal: 0,
                    position: 1
                },
                {
                    base: 10,
                    representationInBase: '0',
                    valueInDecimal: 0,
                    position: 0
                }
            ];

            // when
            const result = mergeExtensionDigits(resultDigits);

            // then
            const expected: AdditionOperand[] = [
                {
                    base: 10,
                    representationInBase: '(0)',
                    isComplementExtension: true,
                    valueInDecimal: 0,
                    position: 1
                },
                {
                    base: 10,
                    representationInBase: '0',
                    valueInDecimal: 0,
                    position: 0
                }
            ];
            expect(result).toEqual(expected);
        });
    });

    describe('#extendComplement', () => {
        it('should return digit array with complement extended to number of positions', () => {
            // given
            const digits: Digit[] = [
                { base: 8, representationInBase: '(0)', valueInDecimal: 0, position: 2, isComplementExtension: true },
                { base: 8, representationInBase: '2', valueInDecimal: 2, position: 1 },
                { base: 8, representationInBase: '3', valueInDecimal: 3, position: 0 }
            ];

            // when
            const numPositions = 3;
            const result = extendComplement(digits, numPositions);

            // then
            const expected: Digit[] = [
                { base: 8, representationInBase: '(0)', valueInDecimal: 0, position: 4, isComplementExtension: true },
                { base: 8, representationInBase: '0', valueInDecimal: 0, position: 3, isComplementExtension: false },
                { base: 8, representationInBase: '0', valueInDecimal: 0, position: 2, isComplementExtension: false },
                { base: 8, representationInBase: '2', valueInDecimal: 2, position: 1 },
                { base: 8, representationInBase: '3', valueInDecimal: 3, position: 0 }
            ];

            expect(result).toEqual(expected);
        });
    });
});
