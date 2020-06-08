import { addDigitsArrays, addDigitsAtPosition, addPositionalNumbers } from './addition';
import { Digit, fromNumber, fromString, PositionResult } from '@calc/calc-arithmetic';

describe('addition', () => {
    describe('#addDigitsAtPosition', () => {
        it('should return correct result for two decimal numbers', () => {
            // given
            const x: Digit = {
                valueInDecimal: 4,
                valueInBase: '4',
                base: 10,
                position: 0
            };

            const y: Digit = {
                valueInDecimal: 2,
                valueInBase: '2',
                base: 10,
                position: 0
            };

            const expected: PositionResult = {
                valueAtPosition: {
                    valueInDecimal: 6,
                    valueInBase: '6',
                    base: 10,
                    position: 0
                },
                carry: [],
                operands: [x, y]
            };

            // when
            const result = addDigitsAtPosition([x,y], 0);

            // then
            expect(result).toEqual(expected);
        });

        it('should return correct result for two decimal numbers when the result produces a carry', () => {
            // given
            const x: Digit = {
                valueInDecimal: 9,
                valueInBase: '9',
                base: 10,
                position: 0
            };

            const y: Digit = {
                valueInDecimal: 9,
                valueInBase: '9',
                base: 10,
                position: 0
            };

            const expected: PositionResult = {
                valueAtPosition: {
                    valueInDecimal: 8,
                    valueInBase: '8',
                    base: 10,
                    position: 0
                },
                carry: [
                    {
                        valueInDecimal: 1,
                        valueInBase: '1',
                        base: 10,
                        position: 1
                    }
                ],
                operands: [x, y]
            };

            // when
            const result = addDigitsAtPosition([x, y], 0);

            // then
            expect(result).toEqual(expected);
        });

        it('should return correct result when addition of decimal numbers produces multiple carries at different positions', () => {
            // given
            const numDigits = 14;

            const digits: Digit[] = Array(numDigits).fill( {
                valueInDecimal: 9,
                valueInBase: '9',
                base: 10,
                position: 0
            });

            const expected: PositionResult = {
                valueAtPosition: {
                    valueInDecimal: 6,
                    valueInBase: '6',
                    base: 10,
                    position: 0
                },
                carry: [
                    {
                        valueInDecimal: 1,
                        valueInBase: '1',
                        position: 2,
                        base: 10
                    },
                    {
                        valueInDecimal: 2,
                        valueInBase: '2',
                        position: 1,
                        base: 10
                    }
                ],
                operands: [...digits]
            };

            // when
            const result = addDigitsAtPosition(digits, 0);

            // then
            expect(result).toEqual(expected);
        });

        it('should return correct result when addition of binary numbers produces multiple carries at different positions', () => {
            // given
            const numDigits = 5;

            const digits: Digit[] = Array(numDigits).fill( {
                valueInDecimal: 1,
                valueInBase: '1',
                base: 2,
                position: 0
            });

            const expected: PositionResult = {
                valueAtPosition: {
                    valueInDecimal: 1,
                    valueInBase: '1',
                    base: 2,
                    position: 0
                },
                carry: [
                    {
                        valueInDecimal: 1,
                        valueInBase: '1',
                        position: 2,
                        base: 2
                    }
                ],
                operands: [...digits]
            };

            // when
            const result = addDigitsAtPosition(digits, 0);

            // then
            expect(result).toEqual(expected);
        });
    });

    describe('#addDigits', () => {
        it('should add two digit arrays correctly', () => {
            // given
            const x: Digit[] = [
                {
                    valueInDecimal: 7,
                    valueInBase: '7',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 9,
                    valueInBase: '9',
                    base: 10,
                    position: 0
                }
            ];

            const y: Digit[] = [
                {
                    valueInDecimal: 6,
                    valueInBase: '6',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 5,
                    valueInBase: '5',
                    base: 10,
                    position: 0
                }
            ];

            const expectedDigits: Digit[] = [
                {
                    valueInDecimal: 1,
                    valueInBase: '1',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 4,
                    valueInBase: '4',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 4,
                    valueInBase: '4',
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
            const a: Digit[] = fromString('1B49', 16, 16).result.toDigitsList();
            const b: Digit[] = fromString('FF2B', 16, 16).result.toDigitsList();

            const expectedDigits: Digit[] = [
                {
                    valueInDecimal: 1,
                    valueInBase: '1',
                    base: 16,
                    position: 4
                },
                {
                    valueInDecimal: 1,
                    valueInBase: '1',
                    base: 16,
                    position: 3
                },
                {
                    valueInDecimal: 10,
                    valueInBase: 'A',
                    base: 16,
                    position: 2
                },
                {
                    valueInDecimal: 7,
                    valueInBase: '7',
                    base: 16,
                    position: 1
                },
                {
                    valueInDecimal: 4,
                    valueInBase: '4',
                    base: 16,
                    position: 0
                },

            ];

            // when
            const result = addDigitsArrays([a, b]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        });

        it('should add digit arrays correctly when numbers are binary', () => {
            // given
            const a: Digit[] = fromNumber(11, 2).result.toDigitsList();
            const b: Digit[] = fromNumber(13, 2).result.toDigitsList();
            const c: Digit[] = fromNumber(9, 2).result.toDigitsList();
            const d: Digit[] = fromNumber(15, 2).result.toDigitsList();

            const expectedDigits: Digit[] = [
                {
                    valueInDecimal: 1,
                    valueInBase: '1',
                    base: 2,
                    position: 5
                },
                {
                    valueInDecimal: 1,
                    valueInBase: '1',
                    base: 2,
                    position: 4
                },
                {
                    valueInDecimal: 0,
                    valueInBase: '0',
                    base: 2,
                    position: 3
                },
                {
                    valueInDecimal: 0,
                    valueInBase: '0',
                    base: 2,
                    position: 2
                },
                {
                    valueInDecimal: 0,
                    valueInBase: '0',
                    base: 2,
                    position: 1
                },
                {
                    valueInDecimal: 0,
                    valueInBase: '0',
                    base: 2,
                    position: 0
                }
            ];

            // when
            const result = addDigitsArrays([a, b, c, d]);

            // then
            expect(result.resultDigits).toEqual(expectedDigits);
        })
    });

    describe('#addPositionalNumbers', () => {
        it('should add 2 decimal positional numbers correctly', () => {
            // given
            const a = fromNumber(5999, 10).result;
            const b = fromNumber(5999, 10).result;
            const expected = fromNumber(11998, 10).result;

            // when
            const result = addPositionalNumbers([a, b]);

            // then
            expect(expected.toDigitsList()).toEqual(result.numberResult.toDigitsList());
        });

        it('should add 2 zeros correctly', () => {
            // given
            const a = fromNumber(0, 10).result;
            const b = fromNumber(0, 10).result;
            const expected = fromNumber(0, 10).result;

            // when
            const result = addPositionalNumbers([a, b]);

            // then
            expect(expected.toDigitsList()).toEqual(result.numberResult.toDigitsList());
        });

        it('should add binary numbers correctly', () => {
            // given
            const a = fromNumber(0, 10).result;
            const b = fromNumber(0, 10).result;
            const expected = fromNumber(0, 10).result;

            // when
            const result = addPositionalNumbers([a, b]);

            // then
            expect(expected.toDigitsList()).toEqual(result.numberResult.toDigitsList());
        });
    })
});
