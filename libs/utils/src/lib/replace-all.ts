/**
 * Replaces all the occurrences of toReplace with replacement
 * @param str
 * @param toReplace
 * @param replacement
 */
export function replaceAll(
    str: string,
    toReplace: string,
    replacement: string
): string {
    return str.replace(new RegExp(toReplace, 'g'), replacement);
}
