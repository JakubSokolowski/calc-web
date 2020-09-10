import { clean } from './clean';

describe('#clean', () => {
    it('should remove all undefined or null properties from object', () => {
        // given
        const obj = {
            a: 'a',
            b: 'b',
            c: undefined,
            d: undefined,
            e: null
        };

        // when
        const result = clean(obj);

        // then
        const expected = {
            a: 'a',
            b: 'b'
        };

        expect(result).toEqual(expected);
    });
});
