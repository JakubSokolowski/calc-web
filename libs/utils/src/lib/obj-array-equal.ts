
export function objArrayEqual<T>(a: Array<T>, b: Array<T>, comparator: (a: T, b: T) => boolean): boolean {
    if(a.length !== b.length) return false;

    let areEqual = true;

    for (let index = 0; index < a.length; index++) {
        const aElement = a[index];
        const bElement = b[index];

        if(!comparator(aElement, bElement)) {
            areEqual = false;
            break;
        }
    }

    return areEqual;
}
