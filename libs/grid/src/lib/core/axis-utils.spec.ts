import { buildAxis } from './axis-utils';
import { AxisConfig } from '../models/axis-config';

describe('axis-utils', () => {
    describe('#buildAxis', () => {
        it('should return proper axis config, with decrementing indices starting at given number', () => {
            // given
            const start = 2;
            const desiredLength = 4;

            // when
            const result = buildAxis(start, desiredLength);

            // then
            const expected: AxisConfig = {
                indices: [ 2, 1, 0, -1],
                prefix: 'n'
            };

            expect(result).toEqual(expected);
        });

        it('should return proper axis config, with decrementing indices starting at given number and custom prefix', () => {
            // given
            const start = 2;
            const desiredLength = 4;
            const prefix = 'S';

            // when
            const result = buildAxis(start, desiredLength, prefix);

            // then
            const expected: AxisConfig = {
                indices: [2, 1, 0, -1],
                prefix: 'S'
            };

            expect(result).toEqual(expected);
        });
    });
});
