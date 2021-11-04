import { fromStringDirect } from '../base-converter';
import { digitsToStr } from '../../helpers/conversion-helpers';
import { BoothMcSorleyAltConverter } from './booth-mcsorley-alt-converter';
import {
    SDConversionGroupResult,
    SDConversionResult,
    SDGroupDigit,
    SignedDigitConversionType
} from '@calc/calc-arithmetic';


describe('BoothMcSorleyAltConverter', () => {
    const base = 2;

    describe('#toSignedDigits', () => {
        it('should return proper Signed Digit representation', () => {
            // given
            const digits = fromStringDirect('1000110', base).asDigits();

            // when
            const result = new BoothMcSorleyAltConverter(digits).toSignedDigits();

            // then
            const expectedSequence = '-10010-10';
            expect(digitsToStr(result)).toEqual(expectedSequence);
        });

        it('should return proper Signed Digit representation when digits are assumed to be from negative multiplier', () => {
            // given
            const digits = fromStringDirect('1000110', base).asDigits();

            // when
            const result = new BoothMcSorleyAltConverter(digits, true).toSignedDigits();

            // then
            const expectedSequence = '-10010-10';
            expect(digitsToStr(result)).toEqual(expectedSequence);
        });

        it('should return proper Signed Digit representation when input has fraction part', () => {
            // given
            const digits = fromStringDirect(
                '1000110.101',
                base
            ).asDigits();

            // when
            const result = new BoothMcSorleyAltConverter(digits).toSignedDigits();

            // then
            const expectedSequence = '-10010-10.101';
            expect(digitsToStr(result)).toEqual(expectedSequence);
        });

        it('should return proper Signed Digit representation when input has almost all 1s', () => {
            // given
            const digits = fromStringDirect(
                '11111101111',
                base
            ).asDigits();

            // when
            const result = new BoothMcSorleyAltConverter(digits).toSignedDigits();

            // then
            const expectedSequence = '00000-11000-1';
            expect(digitsToStr(result)).toEqual(expectedSequence);
        });

        it('should return proper Signed Digit representation when input almost all 1s with fraction part', () => {
            // given
            const digits = fromStringDirect('111.101', base).asDigits();

            // when
            const result = new BoothMcSorleyAltConverter(digits).toSignedDigits();

            // then
            const expectedSequence = '000.-101';
            expect(digitsToStr(result)).toEqual(expectedSequence);
        });
    });

    describe('#toSignedDigitsWithDetails', () => {

        describe('The conversion result', () => {
            // given
            const digits = fromStringDirect('1000110', base).asDigits();
            let result: SDConversionResult;

            beforeEach(() => {
                // when
                result = new BoothMcSorleyAltConverter(
                    digits
                ).toSignedDigitsWithDetails();
            });

            it('should have proper output', () => {
                // then
                const expected: SDGroupDigit[] =  [
                    { base: 2, valueInDecimal: -1, representationInBase: '-1', position: 6, },
                    { base: 2, valueInDecimal: 0, representationInBase: '0', position: 5, },
                    { base: 2, valueInDecimal: 0, representationInBase: '0', position: 4, },
                    { base: 2, valueInDecimal: 1, representationInBase: '1', position: 3, },
                    { base: 2, valueInDecimal: 0, representationInBase: '0', position: 2, },
                    { base: 2, valueInDecimal: -1, representationInBase: '-1', position: 1, },
                    { base: 2, valueInDecimal: 0, representationInBase: '0', position: 0, }
                ];

                expect(result.output).toEqual(expected);
            });

            it('should have proper SD conversion type', () => {
                // then
                const expected = SignedDigitConversionType.BoothMcSorleyAlternative;
                expect(result.type).toEqual(expected);
            });

            it('should have proper first (most significant) group', () => {
                // then
                const expected: SDConversionGroupResult = {
                    input: [
                        { valueInDecimal: 1, base: 2, position: 6, representationInBase: '1' },
                        { valueInDecimal: 0, base: 2, position: 5, representationInBase: '0' },
                        { valueInDecimal: 0, base: 2, position: 4, representationInBase: '0' }
                    ],
                    output: [
                        { base: 2, valueInDecimal: -1, representationInBase: '-1', position: 6, },
                        { base: 2, valueInDecimal: 0, representationInBase: '0', position: 5, }
                    ],
                    value: -2
                };

                expect(result.groups[0]).toEqual(expected);
            });

            it('should have proper last (least significant) group', () => {
                // then
                const expected: SDConversionGroupResult = {
                    input: [
                        { valueInDecimal: 0, base: 2, position: 0, representationInBase: '0' },
                        { isPaddingDigit: true, position: -1, base: 2, valueInDecimal: 0, representationInBase: '0' },
                        { isPaddingDigit: true, position: -2, base: 2, valueInDecimal: 0, representationInBase: '0' }
                    ],
                    output: [
                        { base: 2, valueInDecimal: 0, representationInBase: '0', position: 0, },
                        { base: 2, valueInDecimal: 0, representationInBase: '0', position: -1, isPaddingDigit: true }
                    ],
                    value: 0
                };

                expect(result.groups[result.groups.length - 1]).toEqual(expected);
            });
        });
    });
});
