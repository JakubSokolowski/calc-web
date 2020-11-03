import { SubtractionOperand, SubtractionPositionResult, SubtractionResult } from '../models';
import { subtractDigitArrays, subtractDigitsAtPosition } from './subtraction';

describe('subtraction', () => {
    describe('#addDigitsAtPosition', () => {
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
});
