export function cookieParser(cookieString) {

    if (cookieString === "") {
        return {};
    }

    const pairs = cookieString.split(";");
    const splittedPairs = pairs.map(cookie => cookie.split("="));
    const cookieObj = splittedPairs.reduce((obj, cookie) => {
        const value = decodeURIComponent(cookie[1].trim());
        obj[decodeURIComponent(cookie[0].trim())] = value;

        return obj;
    }, {})

    return cookieObj;
}
