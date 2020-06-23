type WalkCallback<T> = (chunk: T[], index: number, arr?: T[]) => void

export function walk<T>(arr: T[], n: number, callback: WalkCallback<T>): void {
    for (let i = 0; i < arr.length; i += n)
        callback(arr.slice(i, i + n), i, arr);
}
