import { latinize } from './latinize';
import { ContentsEntry } from '../models/contents-entry';


export function extractHeadingIds(markdown: string): ContentsEntry[] {
    const headingRegex =  /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/gm;

    return markdown.match(headingRegex).map((heading) => {
        const withoutHashes = heading.replace(/#/g, '');
        const level = heading.split('#').length - 1;

        return {
            id: getHeadingSlug(withoutHashes),
            level: level
        }
    })
}

export function getHeadingSlug(heading: string): string {
    const slug = heading.trim().toLowerCase();
    return latinize(slug).replace(/\W/g, '-')
}
