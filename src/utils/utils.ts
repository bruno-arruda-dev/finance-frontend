export function findIn(array: any[], field: any, value: any, multiResult?: boolean) {
    const foundedValues = array.filter(a => a[field] === value);


    if (foundedValues.length === 0) return;

    if (multiResult) {
        return foundedValues;
    } else {
        return foundedValues[0]
    }
}