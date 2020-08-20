import { GridLine, LineDefinition } from '../models/grid-line';
import { LineType } from '../models/line-type';

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

