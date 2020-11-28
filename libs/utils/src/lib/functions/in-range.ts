export function inRangeExclusive(x: number, lower: number, upper: number): boolean {
    return lower < x && x < upper
}

export function inRangeInclusive(x: number, from: number, to: number): boolean {
    return from <= x && x <= to
}
