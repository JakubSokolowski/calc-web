import { MultiplicationOperand, MultiplicationPositionResult } from '../models';
import { fromNumber, fromStringDirect } from './base-converter';
import { multiplyDigitRows, multiplyDigits, multiplyPositionalNumbers, multiplyRowByDigit } from './multiplication';


describe('multiplication', () => {
    describe('#multiplyDigits', () => {
        it('should multiply two digits correctly', () => {
            // given
            const position = 0;
            const base = 10;

            const multiplicand: MultiplicationOperand = {
                position,
                valueInDecimal: 3,
                base,
                representationInBase: '3'
            };

            const multiplier: MultiplicationOperand = {
                position,
                valueInDecimal: 2,
                base,
                representationInBase: '2'
            };

            // when
            const result = multiplyDigits(multiplicand, multiplier);

            // then
            const expected: MultiplicationPositionResult = {
                valueAtPosition: {
                    position,
                    valueInDecimal: 6,
                    base,
                    representationInBase: '6'
                },
                shiftedPosition: 0,
                operands: [multiplicand, multiplier]
            };
            expect(result).toEqual(expected);
        });

        it('should multiply two digits correctly when multiplying digits generates carry', () => {
            // given
            const position = 0;
            const base = 10;

            const multiplicand: MultiplicationOperand = {
                position,
                valueInDecimal: 3,
                base,
                representationInBase: '3'
            };

            const multiplier: MultiplicationOperand = {
                position,
                valueInDecimal: 4,
                base,
                representationInBase: '4'
            };

            // when
            const result = multiplyDigits(multiplicand, multiplier);

            // then
            const expected: MultiplicationPositionResult = {
                valueAtPosition: {
                    position,
                    valueInDecimal: 2,
                    base,
                    representationInBase: '2'
                },
                operands: [multiplicand, multiplier],
                shiftedPosition: 0,
                carry: {
                    isCarry: true,
                    base,
                    position: 1,
                    carrySourcePosition: 0,
                    representationInBase: '1',
                    valueInDecimal: 1
                }
            };
            expect(result).toEqual(expected);
        });

        it('should multiply two digits correctly when position has carry from previous', () => {
            // given
            const position = 1;
            const base = 10;

            const multiplicand: MultiplicationOperand = {
                position,
                valueInDecimal: 3,
                base,
                representationInBase: '3'
            };

            const multiplier: MultiplicationOperand = {
                position,
                valueInDecimal: 4,
                base,
                representationInBase: '4'
            };

            const carry: MultiplicationOperand = {
                isCarry: true,
                base,
                position: position,
                carrySourcePosition: position - 1,
                representationInBase: '6',
                valueInDecimal: 6
            };

            // when
            const result = multiplyDigits(multiplicand, multiplier, carry);

            // then
            const expected: MultiplicationPositionResult = {
                carry: {
                    base: 10,
                    carrySourcePosition: 1,
                    isCarry: true,
                    position: 2,
                    representationInBase: '1',
                    valueInDecimal: 1
                },
                operands: [
                    {
                        base: 10,
                        position: 1,
                        representationInBase: '3',
                        valueInDecimal: 3
                    },
                    {
                        base: 10,
                        position: 1,
                        representationInBase: '4',
                        valueInDecimal: 4
                    },
                    {
                        base: 10,
                        carrySourcePosition: 0,
                        isCarry: true,
                        position: 1,
                        representationInBase: '6',
                        valueInDecimal: 6
                    }
                ],
                shiftedPosition: 2,
                valueAtPosition: {
                    base: 10,
                    position: 1,
                    representationInBase: '8',
                    valueInDecimal: 8
                }
            };
            expect(result).toEqual(expected);
        });

        it('should multiply two digits correctly when multiplier has shifted position', () => {
            // given
            const position = 1;
            const base = 10;

            const multiplicand: MultiplicationOperand = {
                position,
                valueInDecimal: 3,
                base,
                representationInBase: '3'
            };

            const multiplier: MultiplicationOperand = {
                position: 2,
                valueInDecimal: 2,
                base,
                representationInBase: '2'
            };

            // when
            const result = multiplyDigits(multiplicand, multiplier);

            // then
            const expected: MultiplicationPositionResult = {
                valueAtPosition: {
                    position: 1,
                    valueInDecimal: 6,
                    base,
                    representationInBase: '6'
                },
                shiftedPosition: 3,
                operands: [multiplicand, multiplier]
            };
            expect(result).toEqual(expected);
        });
    });

    describe('#multiplyRowByDigit', () => {
        it('should multiply row of digits by digit', () => {
            // given
            const base = 10;
            const digits: MultiplicationOperand[] = fromNumber(99, base).result.toDigitsList();

            const multiplier: MultiplicationOperand = {
                position: 0,
                base,
                valueInDecimal: 9,
                representationInBase: '9'
            };

            // when
            const result = multiplyRowByDigit(digits, multiplier);

            // then
            const expected: MultiplicationOperand[] = [
                {
                    position: 2,
                    base,
                    isCarry: true,
                    carrySourcePosition: 1,
                    valueInDecimal: 8,
                    representationInBase: '8'
                },
                {
                    position: 1,
                    base,
                    valueInDecimal: 9,
                    representationInBase: '9'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 1,
                    representationInBase: '1'
                }
            ];
            expect(result.resultDigits).toEqual(expected);
        });

        it('should return digits starting with least significant multiplicand position, regardless of multiplier shift', () => {
            // given
            const base = 10;
            const digits: MultiplicationOperand[] = fromNumber(99, base).result.toDigitsList();

            const multiplier: MultiplicationOperand = {
                position: 3,
                base,
                valueInDecimal: 9,
                representationInBase: '9'
            };

            // when
            const result = multiplyRowByDigit(digits, multiplier);

            // then
            const expected: MultiplicationOperand[] = [
                {
                    position: 2,
                    base,
                    isCarry: true,
                    carrySourcePosition: 1,
                    valueInDecimal: 8,
                    representationInBase: '8'
                },
                {
                    position: 1,
                    base,
                    valueInDecimal: 9,
                    representationInBase: '9'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 1,
                    representationInBase: '1'
                }
            ];
            expect(result.resultDigits).toEqual(expected);
        });

        it('should multiply row of digits by 0', () => {
            // given
            const base = 10;
            const digits: MultiplicationOperand[] = fromNumber(99, base).result.toDigitsList();

            const multiplier: MultiplicationOperand = {
                position: 0,
                base,
                valueInDecimal: 0,
                representationInBase: '0'
            };

            // when
            const result = multiplyRowByDigit(digits, multiplier);

            // then
            const expected: MultiplicationOperand[] = [
                {
                    position: 1,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '0'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '0'
                }
            ];
            expect(result.resultDigits).toEqual(expected);
        });

        it('should multiply shifted digits', () => {
            // given
            const base = 10;
            const rowDigits: MultiplicationOperand[] = [
                {
                    position: 2,
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
                    position: 0,
                    base: 10,
                    representationInBase: '9',
                    valueInDecimal: 9
                }
            ];

            const multiplier: MultiplicationOperand = {
                position: 1,
                base: 10,
                representationInBase: '9',
                valueInDecimal: 9
            };

            // when
            const result = multiplyRowByDigit(rowDigits, multiplier);

            // then
            const expected: MultiplicationOperand[] = [
                {
                    position: 3,
                    base,
                    carrySourcePosition: 2,
                    isCarry: true,
                    valueInDecimal: 8,
                    representationInBase: '8'
                },
                {
                    position: 2,
                    base,
                    valueInDecimal: 9,
                    representationInBase: '9'
                },
                {
                    position: 1,
                    base,
                    valueInDecimal: 9,
                    representationInBase: '9'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 1,
                    representationInBase: '1'
                }
            ];
            expect(result.resultDigits).toEqual(expected);
        });
    });

    describe('#multiplyDigitRows', () => {
        it('should multiply two rows of digits', () => {
            // given
            const base = 10;
            const multiplicand: MultiplicationOperand[] = fromNumber(999, base).result.toDigitsList();
            const multiplier: MultiplicationOperand[] = fromNumber(99, base).result.toDigitsList();

            // when
            const result = multiplyDigitRows(multiplicand, multiplier);

            // then
            const expected: MultiplicationOperand[] = [
                {
                    base: 10,
                    isComplementExtension: true,
                    position: 5,
                    representationInBase: '(0)',
                    valueInDecimal: 0
                },
                {
                    position: 4,
                    base,
                    valueInDecimal: 9,
                    representationInBase: '9'
                },
                {
                    position: 3,
                    base,
                    valueInDecimal: 8,
                    representationInBase: '8'
                },
                {
                    position: 2,
                    base,
                    valueInDecimal: 9,
                    representationInBase: '9'
                },
                {
                    position: 1,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '0'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 1,
                    representationInBase: '1'
                }
            ];
            expect(result.resultDigits).toEqual(expected);
        });
    });

    describe('#multiplyPositionalNumbers', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(999, base).result;
            const multiplier = fromNumber(99, base).result;

            // when
            const result = multiplyPositionalNumbers([multiplicand, multiplier]);

            // then
            const expected = '98901';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply multiplicand with fractional part by multiplier', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('12.34', base).result;
            const multiplier = fromStringDirect('78', base).result;

            // when
            const result = multiplyPositionalNumbers([multiplicand, multiplier]);

            // then
            const expected = '962.52';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply multiplicand by multiplier with fractional part', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('78', base).result;
            const multiplier = fromStringDirect('12.34', base).result;

            // when
            const result = multiplyPositionalNumbers([multiplicand, multiplier]);

            // then
            const expected = '962.52';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply number by 0', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(9, base).result;
            const multiplier = fromNumber(0, base).result;

            // when
            const result = multiplyPositionalNumbers([multiplicand, multiplier]);

            // then
            const expected = '0';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply number by 0.1', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(1, base).result;
            const multiplier = fromNumber(0.1, base).result;

            // when
            const result = multiplyPositionalNumbers([multiplicand, multiplier]);

            // then
            const expected = '0.1';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply number by 0.001', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(1, base).result;
            const multiplier = fromNumber(0.001, base).result;

            // when
            const result = multiplyPositionalNumbers([multiplicand, multiplier]);

            // then
            const expected = '0.001';
            expect(result.numberResult.toString()).toEqual(expected);
        })
    });
});
