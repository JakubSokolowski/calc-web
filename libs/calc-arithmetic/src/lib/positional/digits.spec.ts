import { Digit } from '../models';
import {
    alignFractions,
    extendFractionToPosition,
    padWithZeroDigits,
    shiftLeft,
    shiftRight,
    splitAtZeroPosition,
    strArrayToDigits
} from './digits';
import { fromStringDirect } from '@calc/calc-arithmetic';

describe('digits', () => {
    describe('#padWithZeroDigits', () => {
        it('should pad digits with descending positions when direction is Right', () => {
            // given
            const base = 10;
            const desiredLength = 4;
            const direction = 'Right';

            const digits: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            // when
            const result = padWithZeroDigits(digits, base, desiredLength, direction);

            // then
            const expected: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' },
                { position: -1, base, valueInDecimal: 0, representationInBase: '0' },
                { position: -2, base, valueInDecimal: 0, representationInBase: '0' }
            ];

            expect(result).toEqual(expected);
        });

        it('should pad digits with ascending positions when direction is Left', () => {
            // given
            const base = 10;
            const desiredLength = 4;
            const direction = 'Left';

            const digits: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            // when
            const result = padWithZeroDigits(digits, base, desiredLength, direction);

            // then
            const expected: Digit[] = [
                { position: 3, base, valueInDecimal: 0, representationInBase: '0' },
                { position: 2, base, valueInDecimal: 0, representationInBase: '0' },
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            expect(result).toEqual(expected);
        });

        it('should return padded digits array when array is empty', () => {
            // given
            const desiredLength = 4;
            const direction = 'Right';
            const base = 10;

            const digits: Digit[] = [];

            // when
            const result = padWithZeroDigits(digits, base, desiredLength, direction);

            // then
            const expected: Digit[] = [
                {
                    base: 10,
                    position: -1,
                    representationInBase: '0',
                    valueInDecimal: 0
                },
                {
                    base: 10,
                    position: -2,
                    representationInBase: '0',
                    valueInDecimal: 0
                },
                {
                    base: 10,
                    position: -3,
                    representationInBase: '0',
                    valueInDecimal: 0
                },
                {
                    base: 10,
                    position: -4,
                    representationInBase: '0',
                    valueInDecimal: 0
                }
            ];

            expect(result).toEqual(expected);
        });

        it('should return initial array when array length is equal desired length', () => {
            // given
            const base = 10;
            const desiredLength = 2;
            const direction = 'Right';

            const digits: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            // when
            const result = padWithZeroDigits(digits, base, desiredLength, direction);

            // then
            const expected: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            expect(result).toEqual(expected);
        });

        it('should return initial array when array length greater than desired length ', () => {
            // given
            const base = 10;
            const desiredLength = 1;
            const direction = 'Right';

            const digits: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            // when
            const result = padWithZeroDigits(digits, base, desiredLength, direction);

            // then
            const expected: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('#shiftLeft', () => {
        it('should return initial digits when number of positions is less than 1', () => {
            // given
            const base = 10;
            const digits: Digit[] = [
                {
                    position: 1,
                    base,
                    valueInDecimal: 3,
                    representationInBase: '3'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 4,
                    representationInBase: '4'
                }
            ];

            const numPositions = 0;

            // when
            const result = shiftLeft(digits, numPositions);

            // then
            const expected: Digit[] = [...digits];
            expect(result).toEqual(expected);
        });

        it('should shift digits to the left by given number of positions', () => {
            // given
            const base = 10;
            const digits: Digit[] = [
                {
                    position: 1,
                    base,
                    valueInDecimal: 3,
                    representationInBase: '3'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 4,
                    representationInBase: '4'
                }
            ];

            const numPositions = 2;

            // when
            const result = shiftLeft(digits, numPositions);

            // then
            const expected: Digit[] = [
                {
                    position: 3,
                    base,
                    valueInDecimal: 3,
                    representationInBase: '3'
                },
                {
                    position: 2,
                    base,
                    valueInDecimal: 4,
                    representationInBase: '4'
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
                    valueInDecimal: 0,
                    representationInBase: '0'
                }
            ];
            expect(result).toEqual(expected);
        });
    });

    describe('#shiftRight', () => {
        it('should shift digits to the left by given number of positions', () => {
            // given
            const base = 10;
            const digits: Digit[] = [
                {
                    position: 1,
                    base,
                    valueInDecimal: 3,
                    representationInBase: '3'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 4,
                    representationInBase: '4'
                }
            ];

            const numPositions = 2;

            // when
            const result = shiftRight(digits, numPositions);

            // then
            const expected: Digit[] = [
                {
                    position: 0,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '0'
                },
                {
                    position: -1,
                    base,
                    valueInDecimal: 3,
                    representationInBase: '3'
                },
                {
                    position: -2,
                    base,
                    valueInDecimal: 4,
                    representationInBase: '4'
                }
            ];
            expect(result).toEqual(expected);
        });

        it('should shift digits with complement extension', () => {
            // given
            const base = 10;
            const digits: Digit[] = [
                {
                    position: 0,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    isComplementExtension: true
                },
                {
                    position: -1,
                    base,
                    valueInDecimal: 1,
                    representationInBase: '1'
                }
            ];

            const numPositions = 2;

            // when
            const result = shiftRight(digits, numPositions);

            // then
            const expected: Digit[] = [
                {
                    position: 0,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '(0)',
                    isComplementExtension: true
                },
                {
                    position: -1,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '0'
                },
                {
                    position: -2,
                    base,
                    valueInDecimal: 0,
                    representationInBase: '0'
                },
                {
                    position: -3,
                    base,
                    valueInDecimal: 1,
                    representationInBase: '1'
                }
            ];
            expect(result).toEqual(expected);
        });

        it('should return initial digits when number of positions is less than 1', () => {
            // given
            const base = 10;
            const digits: Digit[] = [
                {
                    position: 1,
                    base,
                    valueInDecimal: 3,
                    representationInBase: '3'
                },
                {
                    position: 0,
                    base,
                    valueInDecimal: 4,
                    representationInBase: '4'
                }
            ];

            const numPositions = 0;

            // when
            const result = shiftRight(digits, numPositions);

            // then
            const expected: Digit[] = [...digits];
            expect(result).toEqual(expected);
        });
    });

    describe('#splitAtZeroPosition', () => {
        it('should split digits into integer and fraction parts', () => {
            // given
            const base = 10;
            const integerPart: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];
            const fractionPart: Digit[] = [
                { position: -1, base, valueInDecimal: 0, representationInBase: '0' },
                { position: -2, base, valueInDecimal: 5, representationInBase: '5' }
            ];

            // when
            const result = splitAtZeroPosition([...integerPart, ...fractionPart]);

            // then
            expect(result[0]).toEqual(integerPart);
            expect(result[1]).toEqual(fractionPart);
        });
    });

    describe('#alignFractions', () => {
        it('should align all operands fractions to fraction with most digits', () => {
            // then
            const base = 10;
            const a: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' },
                { position: -1, base, valueInDecimal: 0, representationInBase: '0' },
                { position: -2, base, valueInDecimal: 0, representationInBase: '0' },
                { position: -3, base, valueInDecimal: 1, representationInBase: '1' }
            ];

            const b: Digit[] = [
                { position: 0, base, valueInDecimal: 5, representationInBase: '5' }
            ];

            const c: Digit[] = [
                { position: 1, base, valueInDecimal: 9, representationInBase: '9' },
                { position: 0, base, valueInDecimal: 1, representationInBase: '1' }
            ];

            // when
            const result = alignFractions([a, b, c]);

            // then
            const expected = [
                [
                    { base: 10, position: 1, representationInBase: '3', valueInDecimal: 3 },
                    { base: 10, position: 0, representationInBase: '4', valueInDecimal: 4 },
                    { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -2, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -3, representationInBase: '1', valueInDecimal: 1 }
                ],
                [
                    { base: 10, position: 0, representationInBase: '5', valueInDecimal: 5 },
                    { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -2, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -3, representationInBase: '0', valueInDecimal: 0 }
                ],
                [
                    { base: 10, position: 1, representationInBase: '9', valueInDecimal: 9 },
                    { base: 10, position: 0, representationInBase: '1', valueInDecimal: 1 },
                    { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -2, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -3, representationInBase: '0', valueInDecimal: 0 }
                ]
            ];

            expect(result).toEqual(expected);
        });

        it('should align two numbers with fractions', () => {
            // then
            const base = 10;
            const a: Digit[] = fromStringDirect('76.023', base).result.toDigitsList();
            const b: Digit[] = fromStringDirect('12.04', base).result.toDigitsList();

            // when
            const result = alignFractions([a, b]);

            // then
            const expected = [
                [
                    { base: 10, position: 1, representationInBase: '7', valueInDecimal: 7 },
                    { base: 10, position: 0, representationInBase: '6', valueInDecimal: 6 },
                    { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -2, representationInBase: '2', valueInDecimal: 2 },
                    { base: 10, position: -3, representationInBase: '3', valueInDecimal: 3 }
                ],
                [
                    { base: 10, position: 1, representationInBase: '1', valueInDecimal: 1 },
                    { base: 10, position: 0, representationInBase: '2', valueInDecimal: 2 },
                    { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                    { base: 10, position: -2, representationInBase: '4', valueInDecimal: 4 },
                    { base: 10, position: -3, representationInBase: '0', valueInDecimal: 0 }
                ]
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('#extendFractionToPosition', () => {
        it('should extend fraction until it reaches desired position when number has no fraction part', () => {
            // then
            const base = 10;
            const digit: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' }
            ];

            const position = -2;

            // when
            const result = extendFractionToPosition(digit, position);

            // then
            const expected: Digit[] = [
                { base: 10, position: 1, representationInBase: '3', valueInDecimal: 3 },
                { base: 10, position: 0, representationInBase: '4', valueInDecimal: 4 },
                { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                { base: 10, position: -2, representationInBase: '0', valueInDecimal: 0 }
            ];

            expect(result).toEqual(expected);
        });

        it('should extend fraction until it reaches desired position when number has fraction part', () => {
            // then
            const base = 10;
            const digits: Digit[] = fromStringDirect('12.04', base).result.toDigitsList();

            const position = -3;

            // when
            const result = extendFractionToPosition(digits, position);

            // then
            const expected: Digit[] = [
                { base: 10, position: 1, representationInBase: '1', valueInDecimal: 1 },
                { base: 10, position: 0, representationInBase: '2', valueInDecimal: 2 },
                { base: 10, position: -1, representationInBase: '0', valueInDecimal: 0 },
                { base: 10, position: -2, representationInBase: '4', valueInDecimal: 4 },
                { base: 10, position: -3, representationInBase: '0', valueInDecimal: 0 }
            ];

            expect(result).toEqual(expected);
        });

        it('should return initial array when position is already reached', () => {
            // given
            const base = 10;
            const digit: Digit[] = [
                { position: 1, base, valueInDecimal: 3, representationInBase: '3' },
                { position: 0, base, valueInDecimal: 4, representationInBase: '4' },
                { position: -1, base, valueInDecimal: 0, representationInBase: '0' },
                { position: -2, base, valueInDecimal: 0, representationInBase: '0' },
                { position: -3, base, valueInDecimal: 1, representationInBase: '1' }
            ];
            const position = -2;

            // when
            const result = extendFractionToPosition(digit, position);

            // then
            expect(result).toEqual(digit);
        });
    });

    describe('#strArrayToDigits', () => {
        it('should convert representations arrays to digits array', () => {
            // given
            const representations = ['1', '2', '3', '4', '5'];
            const base = 10;
            const startPosition = 3;

            // when
            const result = strArrayToDigits(representations, base, startPosition);

            // then
            const expected: Digit[] = [
                {
                    base: 10,
                    position: 3,
                    representationInBase: '1',
                    valueInDecimal: 1
                },
                {
                    base: 10,
                    position: 2,
                    representationInBase: '2',
                    valueInDecimal: 2
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
                    representationInBase: '4',
                    valueInDecimal: 4
                },
                {
                    base: 10,
                    position: -1,
                    representationInBase: '5',
                    valueInDecimal: 5
                }
            ];
            expect(result).toEqual(expected);
        });
    });
});
