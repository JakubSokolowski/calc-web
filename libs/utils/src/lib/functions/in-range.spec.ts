import { inRangeExclusive, inRangeInclusive } from './in-range';

describe('in-range', () => {
    describe('#inRangeExclusive', () => {
        it('should return true if number is in range exclusively', () => {
            // given
            const num = 3;
            const lower = 1;
            const upper = 4;

            // when
            const result = inRangeExclusive(num, lower, upper);

            // then
            expect(result).toBeTruthy();
        });

        it('should return false if number is not in range exclusively', () => {
            // given
            const num = 1;
            const lower = 1;
            const upper = 4;

            // when
            const result = inRangeExclusive(num, lower, upper);

            // then
            expect(result).toBeFalsy();
        })
    });

    describe('#inRangeInclusive', () => {
        it('should return true if number is in range inclusively', () => {
            // given
            const num = 4;
            const lower = 1;
            const upper = 4;

            // when
            const result = inRangeInclusive(num, lower, upper);

            // then
            expect(result).toBeTruthy();
        });

        it('should return false if number is not in range inclusively', () => {
            // given
            const num = 7;
            const lower = 1;
            const upper = 4;

            // when
            const result = inRangeInclusive(num, lower, upper);

            // then
            expect(result).toBeFalsy();
        })
    });

});


