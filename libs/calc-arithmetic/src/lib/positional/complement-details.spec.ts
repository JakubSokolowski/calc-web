import { getComplementWithDetails } from './complement-details';
import { Digit } from '../models';
import { ComplementConversionResult } from '@calc/calc-arithmetic';

describe('complement-details', () => {
    describe('#getComplementWithDetails', () => {
        describe('when number is positive', () => {
            // given
            const representation = '12345';
            const base = 10;
            let result: ComplementConversionResult;

            beforeEach(() => {
                result = getComplementWithDetails(representation, base);
            });

            it('should return details with proper complement digits (without extension)', () => {
                // then
                const expected: Digit[] = [
                    {
                        base: 10,
                        position: 4,
                        representationInBase: '1',
                        valueInDecimal: 1
                    },
                    {
                        base: 10,
                        position: 3,
                        representationInBase: '2',
                        valueInDecimal: 2
                    },
                    {
                        base: 10,
                        position: 2,
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
                        position: 0,
                        representationInBase: '5',
                        valueInDecimal: 5
                    }
                ];

                expect(result.complementDigits).toEqual(expected);
            });

            it('should return details without digits after subtraction transform', () => {
                // when
                expect(result.afterSubtraction).toEqual([]);
            });
        });

        describe('when number is negative', () => {
            // given
            const representation = '-12345';
            const base = 10;
            let result: ComplementConversionResult;

            beforeEach(() => {
                // when
                result = getComplementWithDetails(representation, base);
            });

            it('should return details with proper complement digits (without extension)', () => {
                // then
                const expected: Digit[] = [
                    {
                        base: 10,
                        position: 4,
                        representationInBase: '8',
                        valueInDecimal: 8
                    },
                    {
                        base: 10,
                        position: 3,
                        representationInBase: '7',
                        valueInDecimal: 7
                    },
                    {
                        base: 10,
                        position: 2,
                        representationInBase: '6',
                        valueInDecimal: 6
                    },
                    {
                        base: 10,
                        position: 1,
                        representationInBase: '5',
                        valueInDecimal: 5
                    },
                    {
                        base: 10,
                        position: 0,
                        representationInBase: '5',
                        valueInDecimal: 5
                    }
                ];

                expect(result.complementDigits).toEqual(expected);
            });

            it('should return details with proper digits after subtraction', () => {
                // then
                const expected: Digit[] = [
                    {
                        base: 10,
                        position: 4,
                        representationInBase: '8',
                        valueInDecimal: 8
                    },
                    {
                        base: 10,
                        position: 3,
                        representationInBase: '7',
                        valueInDecimal: 7
                    },
                    {
                        base: 10,
                        position: 2,
                        representationInBase: '6',
                        valueInDecimal: 6
                    },
                    {
                        base: 10,
                        position: 1,
                        representationInBase: '5',
                        valueInDecimal: 5
                    },
                    {
                        base: 10,
                        position: 0,
                        representationInBase: '4',
                        valueInDecimal: 4
                    }
                ];

                expect(result.afterSubtraction).toEqual(expected);
            });
        });
    });
});
