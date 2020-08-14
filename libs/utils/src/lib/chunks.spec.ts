import { chunks, chunksFromEnd } from './chunks';

describe('chunks', () => {
   describe('#chunks', () => {
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

    describe('#chunksFromEnd', () => {
        it('should split list array into chunks of specified size starting from the end', () => {
            // given
            const items = [1, 2, 3, 4, 5, 6, 7, 8];
            const chunkSize = 3;
            const expectedFirstChunkSize = 2;
            const expectedChunksNum = 3;

            // when
            const result = chunksFromEnd(items, chunkSize);

            // then
            expect(result[0].length).toEqual(expectedFirstChunkSize);
            expect(result[0]).toEqual([1, 2]);
            expect(result.length).toEqual(expectedChunksNum);
        });
    })
});
