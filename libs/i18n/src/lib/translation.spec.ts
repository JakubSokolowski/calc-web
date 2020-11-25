import { translationEn, translationPl } from '@calc/i18n';
import { listKeys } from '@calc/utils';


describe('translations', () => {
    const enKeys = listKeys(translationEn, '', []).sort();

    test.each([
        ['PL', translationPl]
    ])('%s translation should have same keys as EN translation', (a: string, translation: Record<string, any> ) => {
        // when
        const translationKeys = listKeys(translation, '', []).sort();

        // then
        expect(translationKeys).toEqual(enKeys);
    });
});
