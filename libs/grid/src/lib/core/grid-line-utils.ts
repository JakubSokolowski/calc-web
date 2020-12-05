import { GridLine, LineDefinition } from '../models/grid-line';
import { LineType } from '../models/line-type';
import { GridCellConfig } from '../models/grid-cell-config';
import { DigitsInfo } from './grid-utils';

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

export function getUnderline(carryRows: GridCellConfig[][]): GridLine {
    const index = carryRows.length - 1;
    const span: LineDefinition = {
        from: index > 0
            ? carryRows[index].findIndex((cell) => cell.content !== '')
            : 0
    };

    return {
        type: LineType.Horizontal,
        index,
        span
    };
}

export function getGridLines(info: DigitsInfo, upperRows: GridCellConfig[][]): GridLine[] {
    const lines: GridLine[] = [];

    const horizontalLineIndex = info.numOperands - 1 + upperRows.length;
    lines.push({ type: LineType.Horizontal, index: horizontalLineIndex });

    const hasFractionalPart = info.numResultFractionalPartDigits > 0;

    if (hasFractionalPart) {
        const verticalLineIndex = info.totalWidth - info.numResultFractionalPartDigits -1;
        lines.push({ type: LineType.Vertical, index: verticalLineIndex });
    }

    if (upperRows.length > 0) {
        lines.push(getUnderline(upperRows));
    }

    return lines;
}
