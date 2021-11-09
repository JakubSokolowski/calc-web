import { urlParamsToComplementConverterParams } from './complement-converter-url-params';
import { ComplementConverterParams } from './complement-converter-params';


describe('#urlParamsToComplementConverterParams', () => {

    it('should return undefined when some arg is not present in url params', () => {
        // given
        const params = new URLSearchParams('input=1010');

        // when
        const result = urlParamsToComplementConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when inputBase param is not valid', () => {
        // given
        const params = new URLSearchParams('input=1010&inputBase=1');

        // when
        const result = urlParamsToComplementConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return undefined when input representation is not valid for inputBase', () => {
        // given
        const params = new URLSearchParams('input=987&inputBase=2');

        // when
        const result = urlParamsToComplementConverterParams(params);

        // when
        expect(result).toBeUndefined();
    });

    it('should return options obj when all params are valid', () => {
        // given
        const params = new URLSearchParams('input=FFA&inputBase=16&outputBase=2');

        // when
        const result = urlParamsToComplementConverterParams(params);

        // when
        const expected: ComplementConverterParams = {
            inputBase: 16,
            inputStr: 'FFA',
        };

        expect(result).toEqual(expected);
    });
});
