export function flatten<T>(arr: T[][]): T[] {
    return arr.reduce((accumulator, value) => accumulator.concat(value), []);
}
