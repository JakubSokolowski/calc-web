import { range } from './range';

describe('range', () => {
    it('should return inclusive range of numbers', () => {
        // given
        const start = 0;
        const end = 4;
        const expected = [0, 1, 2, 3, 4];

        // when
        const result = range(start, end);

        // then
        expect(result).toEqual(expected)
    });

    it('should return empty array when start and end are equal', () => {
        // given
        const start = 1;
        const end = 1;
        const expected = [];

        // when
        const result = range(start, end);

        // then
        expect(result).toEqual(expected)
    });

    it('should return empty array when start is greater then end', () => {
        // given
        const from = 2;
        const to = 1;
        const expected = [];

        // when
        const result = range(from, to);

        // then
        expect(result).toEqual(expected)
    });
});
