import { AdditionOperand } from '../models';
import { fromNumber } from './base-converter';

describe('PositionalNumber', () => {
    describe('toDigitsList', () => {
        it('should correctly convert to list of digits', () => {
            // given
            const result = fromNumber(123, 10);

            const expected: AdditionOperand[] = [
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 2,
                    representationInBase: '2',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 3,
                    representationInBase: '3',
                    base: 10,
                    position: 0
                }
            ];


            // when
            const digits = result.asDigits();

            // then
            expect(digits).toEqual(expected);
        });

        it('should correctly convert to list of digits when number has fractional part', () => {
            // given
            const result = fromNumber(123.45, 10);
            const expected: AdditionOperand[] = [
                {
                    valueInDecimal: 1,
                    representationInBase: '1',
                    base: 10,
                    position: 2
                },
                {
                    valueInDecimal: 2,
                    representationInBase: '2',
                    base: 10,
                    position: 1
                },
                {
                    valueInDecimal: 3,
                    representationInBase: '3',
                    base: 10,
                    position: 0
                },
                {
                    valueInDecimal: 4,
                    representationInBase: '4',
                    base: 10,
                    position: -1
                },
                {
                    valueInDecimal: 5,
                    representationInBase: '5',
                    base: 10,
                    position: -2
                }
            ];

            // when
            const digits = result.asDigits();

            // then
            expect(digits).toEqual(expected);
        });
    });
});
