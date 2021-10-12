import { replaceAll } from '@calc/utils';

export function formatWithLatexSpaces(rep: string): string {
    const hardSpace = '\\;';
    return replaceAll(rep, ' ', hardSpace);
}
