import { urlParamsToAsocBaseConverterParams } from './abconv-storage';
import { AsocBaseConverterParams } from './asoc-bconv-params';


describe('#urlParamsToAsocBaseConverterParams', () => {

    it('should return undefined when some arg is not present in url params', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=2');

        // when
        const result = urlParamsToAsocBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when inputBase param is not valid', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=1&outputBase=2&precision=10');

        // when
        const result = urlParamsToAsocBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when outputBase param is not valid', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=2&outputBase=ASD&precision=10');

        // when
        const result = urlParamsToAsocBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when input and output base params are valid, but output cannot be used as base in asoc conversion', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=2&outputBase');

        // when
        const result = urlParamsToAsocBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when input representation is not valid for inputBase', () => {
        // given
        const params = new URLSearchParams('input=987&inputBase=2&outputBase=16');

        // when
        const result = urlParamsToAsocBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return options obj when all params are valid', () => {
        // given
        const params = new URLSearchParams('input=FFA&inputBase=16&outputBase=2');

        // when
        const result = urlParamsToAsocBaseConverterParams(params);

        // when
        const expected: AsocBaseConverterParams = {
            inputBase: 16,
            outputBase: 2,
            inputStr: 'FFA',
        };

        expect(result).toEqual(expected);
    });
});
