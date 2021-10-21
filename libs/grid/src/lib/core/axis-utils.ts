import { AxisConfig } from '../models/axis-config';

export function buildAxis(start: number, desiredLength: number, prefix = 'n'): AxisConfig {
    const indices: number[] = [];
    let num = start;

    while (indices.length < desiredLength) {
        indices.push(num);
        num--;
    }

    return {
        prefix,
        indices
    };
}

export function buildAxisContinuation(axis: AxisConfig, additionalWidth: number): AxisConfig {
    const axisEnd = axis.indices[axis.indices.length -1];
    const continuationStart = axisEnd > 0 ? axisEnd + 1 : axisEnd - 1;
    return buildAxis(continuationStart, additionalWidth, axis.prefix);
}
