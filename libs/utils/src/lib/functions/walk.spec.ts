import { walk, walkOverlaping } from './walk';


describe('walk', () => {
    describe('#walk', () => {
        it('should iterate array in chunks of size n and execute callback on them', () => {
            // given
            const n = 2;
            const arr = [1, 2, 3, 4, 5, 6];
            const callback = jest.fn();

            // when
            walk(arr, n, callback);

            // then
            expect(callback).toBeCalledTimes(3);
        });

        it('should do nothing when array is empty', () => {
            // given
            const n = 2;
            const arr = [];
            const callback = jest.fn();

            // when
            walk(arr, n, callback);

            // then
            expect(callback).not.toBeCalled();
        });

        it('should execute callback once when chunk size is larger than array', () => {
            // given
            const n = 4;
            const arr = [1, 2, 3];
            const callback = jest.fn();

            // when
            walk(arr, n, callback);

            // then
            expect(callback).toBeCalledWith([1, 2, 3], 0, [1, 2, 3]);
        });
    });

    describe('#walkOverlapping', () => {
        it('should iterate array in chunks of size overlapping by overlapSize and execute callback on them', () => {
            // given
            const groupSize = 2;
            const overlapSize = 1;
            const arr = [1, 2, 3, 4, 5, 6];
            const callback = jest.fn();

            // when
            walkOverlaping(arr, groupSize, overlapSize, callback);

            // then
            expect(callback.mock.calls).toEqual([
                [[1,2], 0, arr],
                [[2,3], 1, arr],
                [[3,4], 2, arr],
                [[4,5], 3, arr],
                [[5,6], 4, arr]
            ]);
        });

        it('should iterate array in 3 chunks when groupSize is 3 and overlap size is 1', () => {
            // given
            const groupSize = 3;
            const overlapSize = 1;
            const arr = [1, 2, 3, 4, 5, 6];
            const callback = jest.fn();

            // when
            walkOverlaping(arr, groupSize, overlapSize, callback);

            // then
            expect(callback.mock.calls).toEqual([
                [[1,2, 3], 0, arr],
                [[3, 4 ,5], 1, arr],
                [[5,6], 2, arr],
            ]);
        });

        it('should iterate array in chunks when overlapSize is 0', () => {
            // given
            const groupSize = 3;
            const overlapSize = 0;
            const arr = [1, 2, 3, 4, 5, 6];
            const callback = jest.fn();

            // when
            walkOverlaping(arr, groupSize, overlapSize, callback);

            // then
            expect(callback.mock.calls).toEqual([
                [[1,2,3], 0, arr],
                [[4,5,6], 1, arr]
            ]);
        });
    });

});

