import { MultiplicationOperand } from '../../models';
import { fromNumber, fromStringDirect } from '../base-converter';
import { multiplyRowByDigit, multiplyWithExtensions } from './multiplication-with-extension';


describe('multiply-with-extensions', () => {
    describe('#multiplyRowByDigit', () => {
        it('should multiply row of digits by digit', () => {
            // given
            const base = 10;
            const digits: MultiplicationOperand[] = fromStringDirect('-3255', base)
                .result
                .complement
                .asDigits();

            const multiplier: MultiplicationOperand = {
                position: 0,
                base,
                valueInDecimal: 3,
                representationInBase: '3'
            };

            // when
            const result = multiplyRowByDigit(digits, multiplier);

            // then
            const expected: MultiplicationOperand[] = [
                { base: 10, isComplementExtension: true, position: 5, representationInBase: '(9)', valueInDecimal: 9 },
                { base: 10, position: 4, representationInBase: '9', valueInDecimal: 9 },
                { base: 10, position: 3, representationInBase: '0', valueInDecimal: 0 },
                { base: 10, position: 2, representationInBase: '2', valueInDecimal: 2 },
                { base: 10, position: 1, representationInBase: '3', valueInDecimal: 3 },
                { base: 10, position: 0, representationInBase: '5', valueInDecimal: 5 }
            ];
            expect(result.resultDigits).toEqual(expected);
        });
    });

    describe('#multiplyWithExtension', () => {
        it('should multiply two positive numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromNumber(999, base).result;
            const multiplier = fromNumber(99, base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '98901';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply negative by positive', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('-33', base).result;
            const multiplier = fromStringDirect('723', base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '-30501';
            expect(result.numberResult.toString()).toEqual(expected);
        });

        it('should multiply positive and negative in base 8', () => {
            // given
            const base = 8;
            const multiplicand = fromStringDirect('(0)3156', base).result;
            const multiplier = fromStringDirect('(7)6423', base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '-4547726';
            const expectedComplement = '(7)3230052';
            expect(result.numberResult.toString()).toEqual(expected);
            expect(result.numberResult.complement.toString()).toEqual(expectedComplement);
        });


        it('should multiply two negative numbers', () => {
            // given
            const base = 10;
            const multiplicand = fromStringDirect('(9)22', base).result;
            const multiplier = fromStringDirect('(9)12', base).result;

            // when
            const result = multiplyWithExtensions([multiplicand, multiplier]);

            // then
            const expected = '6864';
            expect(result.numberResult.toString()).toEqual(expected);
        });
    });
});
