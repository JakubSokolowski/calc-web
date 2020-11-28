export function chunks<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
    return array.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
}

export function chunksFromEnd<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
    const remainder = array.length % chunkSize;

    return remainder
        ? [array.slice(0, remainder), ...chunks(array.slice(remainder), chunkSize)]
        : chunks(array, chunkSize);
}
