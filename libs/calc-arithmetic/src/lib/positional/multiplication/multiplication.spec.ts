import { MultiplicationOperand } from '../../models';
import { fromNumber, fromStringDirect } from '../base-converter';
import { multiplyDefault, multiplyDigitRows, multiplyRowByDigit } from './multiplication';

describe('multiplication', () => {
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
            const result = multiplyDigitRows(multiplicand, multiplier, false);

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

    describe('#multiplyDefault', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(999, base).result;
            const multiplier = fromNumber(99, base).result;

            // when
            const result = multiplyDefault([multiplicand, multiplier]);

            // then
            const expected = '98901';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply two negative numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(-999, base).result;
            const multiplier = fromNumber(-99, base).result;

            // when
            const result = multiplyDefault([multiplicand, multiplier]);

            // then
            const expected = '98901';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply positive and negative numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(999, base).result;
            const multiplier = fromNumber(-99, base).result;

            // when
            const result = multiplyDefault([multiplicand, multiplier]);

            // then
            const expected = '-98901';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply multiplicand with fractional part by multiplier', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('12.34', base).result;
            const multiplier = fromStringDirect('78', base).result;

            // when
            const result = multiplyDefault([multiplicand, multiplier]);

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
            const result = multiplyDefault([multiplicand, multiplier]);

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
            const result = multiplyDefault([multiplicand, multiplier]);

            // then
            const expected = '0';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply number by 0.0', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('12', base).result;
            const multiplier = fromStringDirect('0.0', base).result;

            // when
            const result = multiplyDefault([multiplicand, multiplier]);

            // then
            const expected = '0.0';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply number by 0.1', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(1, base).result;
            const multiplier = fromNumber(0.1, base).result;

            // when
            const result = multiplyDefault([multiplicand, multiplier]);

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
            const result = multiplyDefault([multiplicand, multiplier]);

            // then
            const expected = '0.001';
            expect(result.numberResult.toString()).toEqual(expected);
        });
    });
});
