import { AxisConfig } from '../models/axis-config';


export function buildAxis(start: number, desiredLength: number, prefix = 'n'): AxisConfig {
    const indices = [];
    let num = start;

    while(indices.length < desiredLength) {
        indices.push(num.toString());
        num --;
    }

    return {
        prefix,
        indices
    }
}
