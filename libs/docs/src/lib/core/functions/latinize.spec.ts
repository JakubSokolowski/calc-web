import { latinize } from './latinize';

describe('#latinize', () => {
    it('should replace diacritic characters with its latin equivalents', () => {
        // given
        const input = 'Zażółć gęślą jaźń';

        // when
        const result = latinize(input);

        // then
        const expected = 'Zazolc gesla jazn';
        expect(result).toEqual(expected);
    })
});
