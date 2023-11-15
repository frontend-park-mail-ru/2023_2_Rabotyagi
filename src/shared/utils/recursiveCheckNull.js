export const recursiveCheck = (data) => {
    if (data.Valid !== undefined) {
        if (data.Valid) {
            return Object.values(data)[ 0 ];
        }
        return null;
    }
    if (Array.isArray(data)){
        const result = data.map((item) => {
            if (typeof item === 'object') {
                return recursiveCheck(item);
            }

            return item;
        })

        return result;
    }

    data = Object.entries(data).map(([ key, item ]) => {
        if (typeof item === 'object') {
            return { [ key ]: recursiveCheck(item) }
        }

        return { [ key ]: item };
    })

    let result;
    data.forEach((elem) => result = { ...result, ...elem });
    return result;
}