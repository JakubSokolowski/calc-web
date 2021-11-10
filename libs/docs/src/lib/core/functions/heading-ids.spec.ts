import { extractHeadingIds} from './heading-ids';
import { ContentsEntry } from '../models/contents-entry';

describe('#header-ids', () => {
    describe('#extractHeadingIds', () => {
        it('should return all headers with its ids and levels', () => {
            // given
            const markdown = `
                # First Level
                ## First sublevel
                ## Second sublevel
           `;

            // when
            const result = extractHeadingIds(markdown);

            // then
            const expected: ContentsEntry[] = [
                { level: 1, id: 'first-level' },
                { level: 2, id: 'first-sublevel' },
                { level: 2, id: 'second-sublevel' }
            ];

            expect(result).toEqual(expected);
        });

        it('should return an empty array when markdown is null', () => {
            // given
            const markdown = null;

            // when
            const result = extractHeadingIds(markdown);

            // then
            const expected: ContentsEntry[] = [];
            expect(result).toEqual(expected);
        });
    });
});
