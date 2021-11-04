import { fromStringDirect } from '../base-converter';
import { digitsToStr } from '../../helpers/conversion-helpers';
import { BoothConverter } from './booth-converter';


describe('BoothConverter', () => {
    const base = 2;

    it('should return proper Signed Digit representation', () => {
        // given
        const digits = fromStringDirect('1000110', base).toDigits();

        // when
        const result = new BoothConverter(digits).toSignedDigits();

        // then
        const expectedSequence = '-10010-10';
        expect(digitsToStr(result)).toEqual(expectedSequence)
    });

    it('should return proper Signed Digit representation when input has fraction part', () => {
        // given
        const digits = fromStringDirect('1000110.101', base).toDigits();

        // when
        const result = new BoothConverter(digits).toSignedDigits();

        // then
        const expectedSequence = '-10010-11.-11-1';
        expect(digitsToStr(result)).toEqual(expectedSequence)
    });
});
