import { reorder } from '@calc/utils';

describe('reorder', () => {
    it('should move element at startIndex to endIndex', () => {
        // given
        const startIndex =1;
        const endIndex = 3;
        const items = [1, 2, 3, 4, 5];

        // when
        const result = reorder(items, startIndex, endIndex);

        // then
        const expected = [1, 3, 4, 2, 5];
        expect(result).toEqual(expected);
    });
});
