import { SubtractionOperand, SubtractionPositionResult, SubtractionResult } from '../models';
import { subtractDigitArrays, subtractDigitsAtPosition, subtractPositionalNumbers } from './subtraction';
import { fromNumber } from '@calc/calc-arithmetic';

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
                        base: 10,
                        position: 1,
                        isComplementExtension: true
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
                            position: 1,
                        },
                        {
                            valueInDecimal: 6,
                            representationInBase: '6',
                            base: 10,
                            position: 1,
                        },
                    ]
                };
                expect(positionWithBorrow).toEqual(expected);
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
                const expected: SubtractionOperand []= [
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
        })
    })
});
