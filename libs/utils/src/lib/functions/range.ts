
export function range(start: number, end: number): number[] {
    if(start === end) return [];
    return Array.from({ length: end - start + 1 }, (_, i) => i)
}
