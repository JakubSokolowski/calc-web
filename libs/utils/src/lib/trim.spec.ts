import { trimEndByPredicate, trimStartByPredicate } from './trim';

describe('trim', () => {
    describe('#trimEndByPredicate', () => {
        it('should remove all items from the end of array that match predicate', () => {
            // given
            const arr = [2, 4, 6, 5, 3, 2];
            const predicate = (num: number) => num < 4;

            // when
            const result = trimEndByPredicate(arr, predicate);

            // then
            const expected = [2, 4, 6, 5];
            expect(result).toEqual(expected);
        });

        it('should return empty array if all items match predicate', () => {
            // given
            const arr = [2, 4, 6, 5, 3, 2];
            const predicate = (num: number) => num > 1;

            // when
            const result = trimEndByPredicate(arr, predicate);

            // then
            const expected = [];
            expect(result).toEqual(expected);
        });

        it('should return an unchanged array if no items match predicate', () => {
            // given
            const arr = [2, 4, 6, 5, 3, 2];
            const predicate = (num: number) => num > 10;

            // when
            const result = trimEndByPredicate(arr, predicate);

            // then
            expect(result).toEqual(arr);
        })
    });

    describe('#trimStart', () => {
        it('should remove all items from the start of array that match predicate', () => {
            // given
            const arr = [2, 4, 6, 5, 3, 2];
            const predicate = (num: number) => num < 4;

            // when
            const result = trimStartByPredicate(arr, predicate);

            // then
            const expected = [ 4, 6, 5, 3, 2];
            expect(result).toEqual(expected);
        });

        it('should return empty array if all items match predicate', () => {
            // given
            const arr = [2, 4, 6, 5, 3, 2];
            const predicate = (num: number) => num > 1;

            // when
            const result = trimStartByPredicate(arr, predicate);

            // then
            const expected = [];
            expect(result).toEqual(expected);
        });

        it('should return an unchanged array if no items match predicate', () => {
            // given
            const arr = [2, 4, 6, 5, 3, 2];
            const predicate = (num: number) => num > 10;

            // when
            const result = trimStartByPredicate(arr, predicate);

            // then
            expect(result).toEqual(arr);
        })
    })
});
