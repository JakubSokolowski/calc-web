import { Language } from '@calc/i18n';
import { getDocsPathsForLanguage, removeLanguageAndExtension } from './doctree';

describe('doctree', () => {
    describe('docs files', () => {
        const en = Language.en;
        const enPaths = getDocsPathsForLanguage(en)
            .map(p => removeLanguageAndExtension(p, en))
            .sort();

        test.each([
            [Language.pl]
        ])('%s language should have same doc files as EN translation', (language: Language ) => {
            // when
            const docPaths = getDocsPathsForLanguage(language)
                .map(p => removeLanguageAndExtension(p, language))
                .sort();

            // then
            expect(docPaths).toEqual(enPaths);
        });
    });
});
