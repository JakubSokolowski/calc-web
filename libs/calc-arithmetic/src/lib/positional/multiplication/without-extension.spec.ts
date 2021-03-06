import {
    digitsToStr,
    fromStringDirect,
    MultiplicationOperand,
    multiplyWithoutExtension,
    splitToDigitsList
} from '@calc/calc-arithmetic';
import { MultiplicationWithoutExtensionU2 } from './without-extension-u2';

describe('multiplication-without-extension', () => {
    describe('#multiplyWithoutExtension', () => {
        it('should multiply two negative numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('(9)6745', base).result;
            const multiplier = fromStringDirect('(9)8123', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '6109635';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply negative number by positive', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(7)45', base).result;
            const multiplier = fromStringDirect('(0)723', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '-30501';
            const expectedComplement = '(7)47277';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        it('should multiply positive number by negative', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(0)3156', base).result;
            const multiplier = fromStringDirect('(7)6423', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '-4547726';
            const expectedComplement = '(7)3230052';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        it('should multiply positive U2 numbers by negative', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(0)3156', base).result;
            const multiplier = fromStringDirect('(7)6423', base).result;

            // when
            const result = multiplyWithoutExtension([multiplicand, multiplier]);

            // then
            const expected = '-4547726';
            const expectedComplement = '(7)3230052';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });

        it('should multiply U2 numbers', () => {
            // given
            const base = 2;
            const x = fromStringDirect('(1)101011', base).result;
            const y = fromStringDirect('(1)000110', base).result;

            // when
            const result = multiplyWithoutExtension([x, y]);

            // then
            const expected = '10011000010';
            const expectedComplement = '(0)10011000010';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });
    });

    describe('MultiplicationWithoutExtensionU2', () => {
        describe('#multiplyRowByDigit', () => {
            let algorithm: MultiplicationWithoutExtensionU2;

            const base = 2;
            const multiplicand = fromStringDirect('(1)101011', base).result;
            const multiplier = fromStringDirect('(1)000110', base).result;

            beforeEach(() => {
                algorithm = new MultiplicationWithoutExtensionU2([multiplicand, multiplier]);
            });

            it('should return 0 with negated MSP when multiplier is 0', () => {
                // given
                const row = splitToDigitsList('1101011', 2);

                const multiplierDigit: MultiplicationOperand = {
                    valueInDecimal: 0,
                    base,
                    position: 0,
                    representationInBase: '0'
                };

                // when
                const result = algorithm.multiplyRowByDigit(row, multiplierDigit);

                // then
                const expected = '1000000';
                expect(digitsToStr(result.resultDigits)).toEqual(expected);
            });

            it('should return row with negated MPS when multiplier is 1', () => {
                // given
                const row = splitToDigitsList('1101011', 2);

                const multiplierDigit: MultiplicationOperand = {
                    valueInDecimal: 1,
                    base,
                    position: 0,
                    representationInBase: '1'
                };

                // when
                const result = algorithm.multiplyRowByDigit(row, multiplierDigit);

                // then
                const expected = '0101011';
                expect(digitsToStr(result.resultDigits)).toEqual(expected);
            });
        });
    });

    describe('#prepareOperands', () => {
        it('should prepare operands', () => {
            const base = 2;
            const x = fromStringDirect('(1)01011', base).result;
            const y = fromStringDirect('(1)000110', base).result;

            const alg = new MultiplicationWithoutExtensionU2([x, y]);

            const [multiplicand, multiplier] = alg.prepareOperands();
            expect(digitsToStr(multiplicand)).toEqual('1101011');
            expect(digitsToStr(multiplier)).toEqual('1000110');
        });
    });
});
