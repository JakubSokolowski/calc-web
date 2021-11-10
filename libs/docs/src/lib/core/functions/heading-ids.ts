import { ContentsEntry } from '../models/contents-entry';
import { getSlug } from '@calc/common-ui';


export function extractHeadingIds(markdown?: string): ContentsEntry[] {
    if(!markdown) return [];

    const headingRegex =  /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/gm;

    const matches = markdown.match(headingRegex);
    if(!matches) return [];

    return matches.map((heading) => {
        const withoutHashes = heading.replace(/#/g, '');
        const level = heading.split('#').length - 1;

        return {
            id: getSlug(withoutHashes),
            level: level
        }
    });
}

