import { replaceAll } from './replace-all';


describe('replaceAll tests', () => {
    it('replaces all characters in string', () => {
        // given
        const input = 'A#CA#C';

        // when
        const actual = replaceAll(input, '#', 'B');

        // then
        const expected = 'ABCABC';
        expect(actual).toEqual(expected);
    });

    it('does not modify string without character to replace', () => {
        // given
        const input = 'ACAC';

        // when
        const actual = replaceAll(input, '#', 'B');

        // then
        const expected = 'ACAC';
        expect(actual).toEqual(expected);
    });
});
