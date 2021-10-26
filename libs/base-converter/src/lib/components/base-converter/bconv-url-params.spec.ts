import { urlParamsToBaseConverterParams } from './bconv-url-params';
import { BaseConverterParams } from './bconv-params';


describe('#urlParamsToBaseConverterParams', () => {

    it('should return undefined when some arg is not present in url params', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=2&precision=2');

        // when
        const result = urlParamsToBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when inputBase param is not valid', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=1&outputBase=2&precision=10');

        // when
        const result = urlParamsToBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when outputBase param is not valid', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=2&outputBase=ASD&precision=10');

        // when
        const result = urlParamsToBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when precision param is not valid', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=2&outputBase=10&precision=TEST');

        // when
        const result = urlParamsToBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when input representation is not valid for inputBase', () => {
        // given
        const params = new URLSearchParams('input=987&inputBase=2&outputBase=10&precision=1');

        // when
        const result = urlParamsToBaseConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return options obj when all params are valid', () => {
        // given
        const params = new URLSearchParams('input=987&inputBase=10&outputBase=2&precision=5');

        // when
        const result = urlParamsToBaseConverterParams(params);

        // when
        const expected: BaseConverterParams = {
            inputBase: 10,
            outputBase: 2,
            inputStr: '987',
            precision: 5
        };

        expect(result).toEqual(expected);
    });
});
