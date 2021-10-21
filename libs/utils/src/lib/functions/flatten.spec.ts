import { flatten } from './flatten';

describe('flatten', () => {
    describe('#flatten', () => {
        it('should convert array of array of values to array of values', () => {
            // given
            const arr: string[][] = [["1", "2"], ["3"], ["4", "5"], []];

            // when
            const result = flatten(arr);

            // then
            const expected = ["1", "2", "3", "4", "5"];
            expect(result).toEqual(expected);
        });

        it('should return empty array if input is also empty', () => {
            // given
            const arr: string[][] = [[], []];

            // when
            const result = flatten(arr);

            // then
            const expected = [];
            expect(result).toEqual(expected);
        });
    });
});


