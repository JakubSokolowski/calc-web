import { GridLine, LineDefinition } from '../models/grid-line';
import { LineType } from '../models/line-type';
import { GridCellConfig } from '../models/grid-cell-config';
import { DigitsInfo, getUnderline } from './grid-utils';

function isInSpan(index: number, range?: LineDefinition) {
    if(!range) return true;
    if(!range.to) return index >= range.from;
    if(!range.from) return index <= range.to;

    return index >= range.from && index <= range.to;
}

export function verticalLineIntersects(x: number, y: number, line: GridLine): boolean {
    return x === line.index && isInSpan(y, line.span);
}

export function horizontalLineIntersects(x: number, y: number, line: GridLine): boolean {
    return y === line.index && isInSpan(x, line.span);
}

export function anyHorizontalLineIntersects(x: number, y: number, lines: GridLine[]): boolean {
    return lines.some((line) => {
        if(line.type === LineType.Vertical) return false;
        return horizontalLineIntersects(x, y, line);
    });
}

export function anyVerticalLineIntersects(x: number, y: number, lines: GridLine[]): boolean {
    return lines.some((line) => {
        if(line.type === LineType.Horizontal) return false;
        return verticalLineIntersects(x, y, line);
    });
}

export function getGridLines(info: DigitsInfo, upperRows: GridCellConfig[][]): GridLine[] {
    const lines: GridLine[] = [];

    const horizontalLineIndex = info.numOperands - 1 + upperRows.length;
    lines.push({ type: LineType.Horizontal, index: horizontalLineIndex });

    const hasFractionalPart = info.numFractionalDigits > 0;

    if (hasFractionalPart) {
        const verticalLineIndex = info.totalWidth - info.numFractionalDigits -1;
        lines.push({ type: LineType.Vertical, index: verticalLineIndex });
    }

    if (upperRows.length > 0) {
        lines.push(getUnderline(upperRows));
    }

    return lines;
}
