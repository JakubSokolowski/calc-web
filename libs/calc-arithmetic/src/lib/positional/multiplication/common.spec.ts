import { MultiplicationOperand, MultiplicationPositionResult } from '../../models';
import { multiplyDigits } from './common';

describe('multiplication-common', () => {
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
                operands: [multiplicand, multiplier],
                decimalProduct: 6
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
                },
                decimalProduct: 12
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
                valueInDecimal: 6,
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
                },
                decimalProduct: 18
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
                operands: [multiplicand, multiplier],
                decimalProduct: 6
            };
            expect(result).toEqual(expected);
        });
    });
});
