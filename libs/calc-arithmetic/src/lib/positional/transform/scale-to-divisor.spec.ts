import { digitsToStr, fromStringDirect } from '@calc/calc-arithmetic';
import { ScaleToDivisor } from './scale-to-divisor';


describe('ScaleToDivisor', () => {

    it('should return prepared operands when divisor has fraction part', () => {
        // given
        const base = 10;
        const dividend = fromStringDirect('62', base).toDigits();
        const divisor = fromStringDirect('0.5', base).toDigits();
        const operands = [dividend, divisor];

        const preprocessor = new ScaleToDivisor();

        // when
        const [resDividend, resDivisor] = preprocessor.transform(operands);

        // then
        const expectedDividendStr = '620';
        const expectedDivisorStr = '5';

        expect(digitsToStr(resDividend)).toEqual(expectedDividendStr);
        expect(digitsToStr(resDivisor)).toEqual(expectedDivisorStr);
    });

    it('should return initial operands when divisor has no part', () => {
        // given
        const base = 10;
        const dividend = fromStringDirect('62.2', base).toDigits();
        const divisor = fromStringDirect('5', base).toDigits();
        const operands = [dividend, divisor];

        const preprocessor = new ScaleToDivisor();

        // when
        const [resDividend, resDivisor] = preprocessor.transform(operands);

        // then
        const expectedDividendStr = '62.2';
        const expectedDivisorStr = '5';

        expect(digitsToStr(resDividend)).toEqual(expectedDividendStr);
        expect(digitsToStr(resDivisor)).toEqual(expectedDivisorStr);
    });

});
