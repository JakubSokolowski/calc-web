import { getSlug } from './slug';

describe('#getSlug', () => {
    it('should return slug for heading', () => {
        // given
        const heading = 'Some heading with żółć tekst';

        // when
        const result = getSlug(heading);

        // then
        const expected = 'some-heading-with-zolc-tekst';
        expect(result).toEqual(expected);
    });
});
