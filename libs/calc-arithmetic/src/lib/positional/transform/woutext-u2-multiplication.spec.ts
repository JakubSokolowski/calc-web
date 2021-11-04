import { digitsToStr, fromStringDirect } from '@calc/calc-arithmetic';
import { WithoutExtensionU2Prepare } from './woutext-u2-multiplication';


describe('WithoutExtensionU2Prepare', () => {
    const base = 2;

    it('should return prepared operands when multiplicand is same length as multiplier', () => {
        // given
        const multiplicandStr = '(0)1101001';
        const multiplicand = fromStringDirect(multiplicandStr, base).complement.asDigits();
        const multiplierStr = '(1)1111101';
        const multiplier = fromStringDirect(multiplierStr, base).complement.asDigits();
        const operands = [multiplicand, multiplier];

        const preprocessor = new WithoutExtensionU2Prepare();

        // when
        const [resMultiplicand, resMultiplier] = preprocessor.transform(operands);

        // then
        const expectedMultiplicandStr = '01101001';
        const expectedMultiplierStr = '11111101';

        expect(digitsToStr(resMultiplicand)).toEqual(expectedMultiplicandStr);
        expect(digitsToStr(resMultiplier)).toEqual(expectedMultiplierStr);
    });

    it('should return prepared operands when multiplicand is longer than multiplier', () => {
        // given
        const multiplicandStr = '(0)1101001';
        const multiplicand = fromStringDirect(multiplicandStr, base).complement.asDigits();
        const multiplierStr = '(1)101';
        const multiplier = fromStringDirect(multiplierStr, base).complement.asDigits();
        const operands = [multiplicand, multiplier];

        const preprocessor = new WithoutExtensionU2Prepare();

        // when
        const [resMultiplicand, resMultiplier] = preprocessor.transform(operands);

        // then
        const expectedMultiplicandStr = '01101001';
        const expectedMultiplierStr = '11111101';

        expect(digitsToStr(resMultiplicand)).toEqual(expectedMultiplicandStr);
        expect(digitsToStr(resMultiplier)).toEqual(expectedMultiplierStr);
    });
});
