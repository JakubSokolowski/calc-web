import { nNext, nPrev, range } from './range';

describe('range', () => {
    describe('#range', () => {
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

    describe('#nNext', () => {
        it('should return n next numbers after start', () => {
            // given
            const start = 4;
            const n = 3;
            const expected = [5, 6, 7];

            // when
            const result = nNext(start, n);

            // then
            expect(result).toEqual(expected)
        });

        it('should return empty array if n is 0', () => {
            // given
            const start = 4;
            const n = 0;
            const expected = [];

            // when
            const result = nNext(start, n);

            // then
            expect(result).toEqual(expected)
        });
    });

    describe('#nPrev', () => {
        it('should return n previous numbers before start', () => {
            // given
            const start = 0;
            const n = 4;
            const expected = [-1, -2, -3, -4];

            // when
            const result = nPrev(start, n);

            // then
            expect(result).toEqual(expected)
        });

        it('should return empty array if n is 0', () => {
            // given
            const start = 4;
            const n = 0;
            const expected = [];

            // when
            const result = nPrev(start, n);

            // then
            expect(result).toEqual(expected)
        });
    });
});
