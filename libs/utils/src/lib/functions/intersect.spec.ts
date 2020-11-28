import { intersect } from './intersect';

describe('intersect', () => {
    it('should return array of common values in two arrays', () => {
        // given
        const a = [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 3, y: 3},
        ];

        const b = [
            {x: 1, y: 1},
            {x: 2, y: 2},
        ];

        const expected = [
            {x: 1, y: 1},
            {x: 2, y: 2},
        ];

        const comparer = (a, b) => {
            return a.x === b.x && a.y === b.y;
        };

        // when
        const result = intersect(a, b, comparer);

        // then
        expect(result).toEqual(expected);
    });
});
