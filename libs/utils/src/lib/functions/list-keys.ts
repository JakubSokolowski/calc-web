

export function listKeys(obj: Record<string, any>, startKey: string, array: string[]): string[] {
    for (const property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            if (typeof obj[property] === 'object') {
                listKeys(obj[property], `${startKey}.${property}`, array);
            } else {
                array.push(`${startKey.slice(1)}.${property}`);
            }
        }
    }

    return array;
}
