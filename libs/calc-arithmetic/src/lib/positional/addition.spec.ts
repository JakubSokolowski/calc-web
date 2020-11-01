import { addDigitsArrays, addDigitsAtPosition, addPositionalNumbers } from './addition';
import { fromNumber, PositionResult } from '@calc/calc-arithmetic';
import { AdditionOperand } from '../models';
import { fromStringDirect } from './base-converter';

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

            const expected: PositionResult = {
                valueAtPosition: {
                    valueInDecimal: 6,
                    representationInBase: '6',
                    base: 10,
                    position: 0
                },
                carry: [],
                operands: [x, y]
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

            const expected: PositionResult = {
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
                operands: [x, y]
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

            const expected: PositionResult = {
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
                operands: [...digits]
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

            const expected: PositionResult = {
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
                operands: [...digits]
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
            const a: AdditionOperand[] = fromStringDirect('1B49', 16).result.complement.toDigitsList();
            const b: AdditionOperand[] = fromStringDirect('FF2B', 16).result.complement.toDigitsList();

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
            const a: AdditionOperand[] = fromNumber(11, 2).result.complement.toDigitsList();
            const b: AdditionOperand[] = fromNumber(13, 2).result.complement.toDigitsList();
            const c: AdditionOperand[] = fromNumber(9, 2).result.complement.toDigitsList();
            const d: AdditionOperand[] = fromNumber(15, 2).result.complement.toDigitsList();

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
        it('should add 2 decimal positional numbers correctly', () => {
            // given
            const a = fromNumber(5999, 10).result;
            const b = fromNumber(5999, 10).result;

            // when
            const result = addPositionalNumbers([a, b]).numberResult.toDigitsList();

            // then
            const expected = fromNumber(11998, 10).result.toDigitsList();
            expect(result).toEqual(expected);
        });

        it('should add 2 zeros correctly', () => {
            // given
            const a = fromNumber(0, 10).result;
            const b = fromNumber(0, 10).result;

            // when
            const result = addPositionalNumbers([a, b]).numberResult.toDigitsList();

            // then
            const expected = fromNumber(0, 10).result.toDigitsList();
            expect(result).toEqual(expected);
        });

        it('should add binary numbers correctly', () => {
            // given
            const a = fromNumber(4, 2).result;
            const b = fromNumber(2, 2).result;

            // when
            const result = addPositionalNumbers([a, b]).numberResult.toDigitsList();

            // then
            const expected = fromNumber(6, 2).result.toDigitsList();
            expect(result).toEqual(expected);
        });
    });
});
