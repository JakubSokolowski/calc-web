type WalkCallback<T> = (arr: T[], index: number) => void

export function walk<T>(arr: T[], n: number, callback: WalkCallback<T>): void {
    for (let i = 0; i < arr.length; i += n)
        callback(arr.slice(i, i + n), i);
}
