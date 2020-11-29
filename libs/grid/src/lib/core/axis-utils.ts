import { AxisConfig } from '../models/axis-config';
import { last } from 'lodash';

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
    const axisEnd = last(axis.indices);
    const continuationStart = axisEnd > 0 ? axisEnd + 1 : axisEnd - 1;
    return buildAxis(continuationStart, additionalWidth, axis.prefix);
}
