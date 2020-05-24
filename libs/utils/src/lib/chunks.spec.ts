import { chunks } from './chunks';

describe('chunks', () => {
    it('should split list array into chunks of specified size', () => {
        // given
        const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const chunkSize = 4;
        const expectedChunksNum = 3;

        // when
        const result = chunks(items, chunkSize);

        // then
        expect(result[0].length).toEqual(chunkSize);
        expect(result[0]).toEqual([1, 2, 3, 4]);
        expect(result.length).toEqual(expectedChunksNum);
    });

    it('should return empty array when items is empty array', () => {
        // given
        const items = [];
        const chunkSize = 4;

        // when
        const result = chunks(items, chunkSize);

        // then
        expect(result).toEqual([]);
    });
});
