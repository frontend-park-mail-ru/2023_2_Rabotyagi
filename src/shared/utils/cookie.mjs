export function cookieParser(cookieString) {

    if (cookieString === "") {
        return {};
    }

    const pairs = cookieString.split(";");
    const splittedPairs = pairs.map(cookie => cookie.split("="));
    const cookieObj = splittedPairs.reduce((obj, cookie) => {
        const key = obj[decodeURIComponent(cookie[0].trim())];
        const value = decodeURIComponent(cookie[1].trim());

        key = value;
        return obj;
    }, {})

    return cookieObj;
}
