import { deepAssign } from './deep-assign';

describe('deepAssign', () => {
    it('should correctly assign surface level property', () => {
        // given
        const obj = {};
        const property = 'surface';
        const value = 'test';

        // when
        deepAssign(obj, property, value);

        // then
        expect(obj[property]).toBeDefined();
    });

    it('should correctly assign deep level property', () => {
        // given
        const obj = {};
        const property = 'deep/under/surface';
        const value = 'test';

        // when
        deepAssign(obj, property, value);

        // then
        expect(obj['deep']['under']['surface']).toBeDefined();
    });
});
