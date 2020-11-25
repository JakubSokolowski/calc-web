import { listKeys } from './list-keys';

describe('list-keys', () => {
    it('should list all keys in object', () => {
        // given
        const obj = {
            key1: 'asd',
            key2: 'qwe'
        };

        // when
        const result = listKeys(obj, '', []);

        // then
        const expected = ['.key1', '.key2'];
        expect(result).toEqual(expected);
    });

    it('should list all keys in nested object', () => {
        // given
        const obj = {
            key1: 'asd',
            key2: 'qwe',
            nested: {
                'nested1': '123',
                'nested2': '456'
            }
        };

        // when
        const result = listKeys(obj, '', []);

        // then
        const expected = ['.key1', '.key2', 'nested.nested1', 'nested.nested2'];
        expect(result).toEqual(expected);
    });
});
