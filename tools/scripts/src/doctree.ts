import { sync } from 'glob';
import { join, relative } from 'path';
import { Language } from '@calc/i18n';

const assetPath = join(__dirname, '../../../libs/docs/src/assets');

export function getDocsPathsForLanguage(language: Language): string[] {
    const res = sync(assetPath + '/**/*.md', {});
    const paths = res.map((f) => relative(assetPath, f));

    return paths.filter((p) => {
        const [, langWithExtension] = p.split('_');
        const [lang] = langWithExtension.split('.');
        return lang === language.toString();
    });
}

export function removeLanguageAndExtension(path: string, language: Language): string {
    return path.replace(`_${language}.md`, '');
}
