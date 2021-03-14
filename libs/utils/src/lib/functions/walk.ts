type WalkCallback<T> = (chunk: T[], index: number, arr?: T[]) => void

export function walk<T>(arr: T[], n: number, callback: WalkCallback<T>): void {
    for (let i = 0; i < arr.length; i += n)
        callback(arr.slice(i, i + n), i, arr);
}

export function walkOverlaping<T>(arr: T[], groupSize: number, overlapSize: number, callback: WalkCallback<T>): void {
    const advance = groupSize - overlapSize;
    if(advance <= 0) return;

    let groupIndex = 0;
    for (let i = 0; i < arr.length - overlapSize; i += advance) {
        callback(arr.slice(i, i + groupSize), groupIndex, arr);
        groupIndex += 1;
    }
}
