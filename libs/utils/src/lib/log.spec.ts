import { logBase } from './log';

describe('#logBase', () => {
    it('should return logarithm of specified base', () => {
        // given
        const num = 9;
        const base = 3;

        // when
        const result = logBase(num, base);

        // then
        expect(result).toBeCloseTo(2, 8);
    })
});
