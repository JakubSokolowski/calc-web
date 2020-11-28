export function trimEndByPredicate<T>(array: Array<T>, predicate: (T) => boolean): Array<T> {
    if(!array.length) return array;

    let lastFromRightMatching = -1;

    for(let i = array.length -1; i >= 0; i--) {
        if(predicate(array[i]))
            lastFromRightMatching = i;
        else
            break;
    }

    return lastFromRightMatching === -1
        ? array
        : array.slice(0, lastFromRightMatching)
}

export function trimStartByPredicate<T>(array: Array<T>, predicate: (T) => boolean): Array<T> {
    if(!array.length) return array;

    let lastFromLeftMatching = -1;

    for(let i = 0; i <= array.length -1; i++) {
        if(predicate(array[i]))
            lastFromLeftMatching = i;
        else
            break;
    }

    return lastFromLeftMatching === -1
        ? array
        : array.slice(lastFromLeftMatching + 1);
}
