
export function range(start: number, end: number): number[] {
    if(start === end) return [];
    return Array.from({ length: end - start + 1 }, (_, i) => i)
}

export function nNext(start: number, n: number): number[] {
    if(n === 0) return [];
    return Array.from({ length: n }, (_, i) => i + start + 1);
}


export function nPrev(start: number, n: number): number[] {
    if(n === 0) return [];
    return Array.from({ length: n }, (_, i) => start - i - 1);
}

