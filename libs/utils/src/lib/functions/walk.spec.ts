import { walk } from '@calc/utils';

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
