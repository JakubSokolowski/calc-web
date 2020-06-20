export function intersect<T>(a: Array<T>, b: Array<T>, comparer: (a: T, b: T) => boolean): Array<T> {
    return a.filter(n => b.some(n2 => comparer(n, n2)));
}
