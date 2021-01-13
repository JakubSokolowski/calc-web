import BigNumber from 'bignumber.js';
import { fromNumber, fromString, StandardBaseConverter } from './base-converter';
import { Digit, PositionalSourceType } from '@calc/calc-arithmetic';

describe('base-converter', () => {
    describe('StandardBaseConverter fromNumber tests', () => {
        const BaseConverter = new StandardBaseConverter();

        it('converts positive floating base 10 to base 2', () => {
            // given
            const input = new BigNumber(25.5);
            const base = 2;
            const expected = '11001.1';
            const expectedComplement = '(0)11001.1';

            // when
            const result = BaseConverter.fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative floating base 10 to base 2', () => {
            // given
            const input = new BigNumber(-25.5);
            const base = 2;
            const expected = '-11001.1';
            const expectedComplement = '(1)00110.1';

            // when
            const result = BaseConverter.fromNumber(input, base).result;
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive base 10 to base 16', () => {
            // given
            const input = new BigNumber(255);
            const base = 16;
            const expected = 'FF';
            const expectedComplement = '(0)FF';

            // when
            const result = BaseConverter.fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 10 to base 16', () => {
            // given
            const input = new BigNumber(255.5);
            const base = 16;
            const expected = 'FF.8';
            const expectedComplement = '(0)FF.8';

            // when
            const result = BaseConverter.fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 10 to base 2', () => {
            // given
            const input = 25.5;
            const base = 2;
            const expected = '11001.1';
            const expectedComplement = '(0)11001.1';

            // when
            const result = BaseConverter.fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts 0 to base 64', () => {
            // given
            const input = 0;
            const base = 64;
            const expected = '00';

            // when
            const result = BaseConverter.fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
        });
    });

    describe('StandardBaseConverter fromString tests', () => {
        const BaseConverter = new StandardBaseConverter();

        it('converts positive base 2 integer to base 10', () => {
            // given
            const input = '11001';
            const inputbase = 2;
            const outputbase = 10;
            const expected = new BigNumber(25);
            const expectedComplement = '(0)25';

            // when
            const result = BaseConverter.fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative base 2 integer to base 10', () => {
            // given
            const input = '-11001';
            const inputbase = 2;
            const outputbase = 10;
            const expected = new BigNumber(-25);
            const expectedComplement = '(9)75';

            // when
            const result = BaseConverter.fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 2 to base 10', () => {
            // given
            const input = '11001.1';
            const inputbase = 2;
            const outputbase = 10;
            const expected = new BigNumber(25.5);
            const expectedComplement = '(0)25.5';

            // when
            const result = BaseConverter.fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative floating base 2 to base 10', () => {
            // given
            const input = '-11001.1';
            const inputbase = 2;
            const outputbase = 10;
            const expected = new BigNumber(-25.5);
            const expectedComplement = '(9)74.5';

            // when
            const result = BaseConverter.fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 16 to base 10', () => {
            // given
            const input = 'FF.8';
            const inputbase = 16;
            const outputbase = 10;
            const expected = new BigNumber(255.5);
            const expectedComplement = '(0)255.5';

            // when
            const result = BaseConverter.fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.complement.toString()).toEqual(expectedComplement);
        });
        it('converts negative floating base 16 to base 10', () => {
            // given
            const input = '-FF.8';
            const inputbase = 16;
            const outputbase = 10;
            const expected = new BigNumber(-255.5);
            const expectedComplement = '(9)744.5';

            // when
            const result = BaseConverter.fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.complement.toString()).toEqual(expectedComplement);
        });
        it('converts positive floating base 2 to base 8', () => {
            // given
            const input = '11001.1';
            const inputbase = 2;
            const outputbase = 8;
            const expected = new BigNumber(25.5);
            const expectedValueStr = '31.4';

            // when
            const conv = BaseConverter.fromString(input, inputbase, outputbase);
            const result = conv.result;

            // then
            expect(result.decimalValue).toEqual(expected);
            expect(result.valueInBase).toEqual(expectedValueStr);
            expect(true).toBeTruthy();
        });

        it('throws error if repStr does match input base', () => {
            // given
            const input = '-FF8.923';
            const inputbase = 10;
            const outputbase = 16;

            // then
            expect(() => {
                BaseConverter.fromString(input, inputbase, outputbase);
            }).toThrow();
        });


        // ISSUE_ID: 5
        describe('fromString conversion', () => {
            // given
            const input = '24';
            const inputbase = 10;
            const outputbase = 2;
            const stagesLength = 2;

            it('should generate 2 conversion stages for conversions', () => {
                // when
                const result = BaseConverter.fromString(input, inputbase, outputbase);

                // then
                expect(result.stages.length).toEqual(stagesLength);
            });

            it('should generate first conversion stage from string to base 10 number', () => {
                // when
                const result = BaseConverter.fromString(input, inputbase, outputbase);
                const firstStage = result.getFirstStage();
                const expectedInput = [input, inputbase];

                // then
                expect(firstStage.input).toEqual(expectedInput);
                expect(firstStage.result.valueInBase).toEqual(input);
                expect(firstStage.result.base).toEqual(inputbase);
            });

            it('should generate second conversion stage base 10 number to target base', () => {
                // when
                const result = BaseConverter.fromString(input, inputbase, outputbase);
                const secondStage = result.getLastStage();
                const expectedInput = [input, inputbase];
                const valueInBase = '11000';

                // then
                expect(secondStage.input).toEqual(expectedInput);
                expect(secondStage.result.valueInBase).toEqual(valueInBase);
                expect(secondStage.result.base).toEqual(outputbase);
            });
        });

    });

    describe('StandardBaseConverter fromStringDirect tests', () => {
        const BaseConverter = new StandardBaseConverter();

        it('converts 0', () => {
            // given
            const input = '0';
            const inputBase = 10;
            const expectedValue = new BigNumber(0);

            // when
            const conv = BaseConverter.fromStringDirect(input, inputBase);
            const result = conv.result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
        });

        it('converts floating 0.0', () => {
            // given
            const input = '0.0';
            const inputBase = 10;
            const expectedValue = new BigNumber(0.0);

            // when
            const conv = BaseConverter.fromStringDirect(input, inputBase);
            const result = conv.result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
        });

        it('converts positive base 2 integer', () => {
            // given
            const input = '11001';
            const inputbase = 2;
            const expectedValue = new BigNumber(25);
            const expectedComplement = '(0)11001';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative base 2 integer', () => {
            // given
            const input = '-11001';
            const inputbase = 2;
            const expectedValue = new BigNumber(-25);
            const expectedComplement = '(1)00111';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 2', () => {
            // given
            const input = '11001.1';
            const inputbase = 2;
            const expectedValue = new BigNumber(25.5);
            const expectedComplement = '(0)11001.1';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative floating base 2', () => {
            // given
            const input = '-11001.1';
            const inputbase = 2;
            const expectedValue = new BigNumber(-25.5);
            const expectedComplement = '(1)00110.1';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 16', () => {
            // given
            const input = 'FF.8';
            const inputbase = 16;
            const expectedValue = new BigNumber(255.5);
            const expectedComplement = '(0)FF.8';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative floating base 16', () => {
            // given
            const input = '-FF.8';
            const inputbase = 16;
            const expectedValue = new BigNumber(-255.5);
            const expectedComplement = '(F)00.8';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive floating base 2', () => {
            // given
            const input = '11001.1';
            const inputbase = 2;
            const expectedValue = new BigNumber(25.5);
            const expectedComplement = '(0)11001.1';

            // when
            const conv = BaseConverter.fromStringDirect(input, inputbase);
            const result = conv.result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('throws error if repStr does match input base', () => {
            // given
            const input = '-FF8.923';
            const inputBase = 10;

            // then
            expect(() => {
                BaseConverter.fromStringDirect(input, inputBase);
            }).toThrow();
        });

        it('converts positive base64', () => {
            // given
            const input = '12 45 23';
            const inputbase = 64;
            const expectedValue = new BigNumber(52055);

            // when
            const conv = BaseConverter.fromStringDirect(input, inputbase);
            const result = conv.result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
        });

        it('converts negative base64', () => {
            // given
            const input = '-32 18.19';
            const inputbase = 64;
            const expectedValue = new BigNumber(-2066.296875);

            // when
            const conv = BaseConverter.fromStringDirect(input, inputbase);
            const result = conv.result;

            // then
            expect(result.valueInBase).toEqual(input);
            expect(result.decimalValue).toEqual(expectedValue);
        });

        it('converts positive complement string', () => {
            // given
            const input = '(0)FF.8';
            const inputbase = 16;
            const expectedValue = new BigNumber(255.5);
            const expectedComplement = '(0)FF.8';
            const expectedValueInBase = 'FF.8';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expectedValueInBase);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts negative complement string', () => {
            // given
            const input = '(9)12.8';
            const inputbase = 10;
            const expectedValue = new BigNumber(-87.2);
            const expectedComplement = '(9)12.8';
            const expectedValueInBase = '-87.2';

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase)
                .result;

            // then
            expect(result.isNegative).toEqual(true);
            expect(result.valueInBase).toEqual(expectedValueInBase);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('should set sourceType to ComplementStr when input is complement str', () => {
            // given
            const input = '(F)FF.8';
            const inputbase = 16;

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase).result;

            // then
            expect(result.sourceType).toEqual(PositionalSourceType.ComplementStr);
        });

        it('should set sourceType to RepresentationStr when input is representation str', () => {
            // given
            const input = 'FF.8';
            const inputbase = 16;

            // when
            const result = BaseConverter.fromStringDirect(input, inputbase).result;

            // then
            expect(result.sourceType).toEqual(PositionalSourceType.RepresentationStr);
        });
    });

    describe('StandardBaseConverter fromDigitsDirect tests', () => {
        const BaseConverter = new StandardBaseConverter();

        it('converts positive base 2 integer to base 10', () => {
            // given
            const digits: Digit[] = [
                { base: 2, position: 4, representationInBase: '1', valueInDecimal: 1 },
                { base: 2, position: 3, representationInBase: '1', valueInDecimal: 1 },
                { base: 2, position: 2, representationInBase: '0', valueInDecimal: 0 },
                { base: 2, position: 1, representationInBase: '0', valueInDecimal: 0 },
                { base: 2, position: 0, representationInBase: '1', valueInDecimal: 1 },
            ];
            const expectedValueInBase = '11001';
            const expectedValue = new BigNumber(25);
            const expectedComplement = '(0)11001';

            // when
            const result = BaseConverter.fromDigitsDirect(digits).result;

            // then
            expect(result.valueInBase).toEqual(expectedValueInBase);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts positive base 2 integer with fractional part to base 10', () => {
            // given
            const digits: Digit[] = [
                { base: 2, position: 4, representationInBase: '1', valueInDecimal: 1 },
                { base: 2, position: 3, representationInBase: '1', valueInDecimal: 1 },
                { base: 2, position: 2, representationInBase: '0', valueInDecimal: 0 },
                { base: 2, position: 1, representationInBase: '0', valueInDecimal: 0 },
                { base: 2, position: 0, representationInBase: '1', valueInDecimal: 1 },
                { base: 2, position: -1, representationInBase: '1', valueInDecimal: 1 },
            ];
            const expectedValueInBase = '11001.1';
            const expectedValue = new BigNumber(25.5);
            const expectedComplement = '(0)11001.1';

            // when
            const result = BaseConverter.fromDigitsDirect(digits)
                .result;

            // then
            expect(result.valueInBase).toEqual(expectedValueInBase);
            expect(result.decimalValue).toEqual(expectedValue);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

    });

    describe('fromNumber tests', () => {
        it('converts number with variable precision', () => {
            // given
            const input = new BigNumber(25.5);
            const base = 2;
            const expected = '11001.1';
            const expectedComplement = '(0)11001.1';

            // when
            const result = fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('converts number using StandardBaseConverter', () => {
            // given
            const input = new BigNumber(25.5);
            const base = 2;
            const expected = '11001.1';
            const expectedComplement = '(0)11001.1';

            // when
            const result = fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

        it('sets inputType to Number', () => {
            // given
            const input = new BigNumber(25.5);
            const base = 2;
            const expected = '11001.1';
            const expectedComplement = '(0)11001.1';

            // when
            const result = fromNumber(input, base).result;

            // then
            expect(result.valueInBase).toEqual(expected);
            expect(result.sourceType).toEqual(PositionalSourceType.Number);
            expect(result.complement.toString()).toEqual(expectedComplement);
        });

    });

    describe('fromString tests', () => {
        it('should convert string with extra whitespace', () => {
            // given
            const input = '12  13  45  ';
            const inputbase = 64;
            const outputbase = 10;
            const expected = new BigNumber(50029);

            // when
            const result = fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
        });

        it('should convert b64 number with fractional part', () => {
            // given
            const input = '12 13.45';
            const inputbase = 64;
            const outputbase = 10;
            const expected = new BigNumber(781.703125);

            // when
            const result = fromString(input, inputbase, outputbase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
        });

        it('should convert representation str and set input type to RepresentationStr', () => {
            // given
            const input = '11010';
            const inputBase = 2;
            const outputBase = 10;
            const expected = new BigNumber(26);

            // when
            const result = fromString(input, inputBase, outputBase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.sourceType).toEqual(PositionalSourceType.RepresentationStr);
        });

        it('should convert complement str and set input type to ComplementStr', () => {
            // given
            const input = '(0)11010';
            const inputBase = 2;
            const outputBase = 10;
            const expected = new BigNumber(26);

            // when
            const result = fromString(input, inputBase, outputBase)
                .result;

            // then
            expect(result.valueInBase).toEqual(expected.toString());
            expect(result.sourceType).toEqual(PositionalSourceType.ComplementStr);
        });
    });

});
