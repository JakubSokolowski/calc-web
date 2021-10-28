import { replaceAll } from '@calc/utils';
import { PositionalNumber } from '@calc/calc-arithmetic';

export function formatWithLatexSpaces(rep: string): string {
    const hardSpace = '\\;';
    return replaceAll(rep, ' ', hardSpace);
}

export function posNumToLatexStrWithBase(num: PositionalNumber): string {
    const latexStr = `${num.toStringWithoutExcessZeros()}_{${num.base()}}`;
    return formatWithLatexSpaces(latexStr);
}
