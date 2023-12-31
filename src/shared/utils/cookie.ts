interface cookie {
    [key: string]: any
}

export function cookieParser(cookieString: string): cookie | null {
    if (!cookieString.length) {
        return null;
    }

    const pairs = cookieString.split(';');
    const splittedPairs = pairs.map((cookie) => cookie.split('='));

    const cookieObj = splittedPairs.reduce((obj: cookie, cookie) => {
        const [ key, value ] = cookie;

        const decodedKey = decodeURIComponent(key.trim());
        const decodedValue = decodeURIComponent(value.trim());

        obj[ decodedKey ] = decodedValue;

        return obj;
    }, {});

    return cookieObj;
}

export function deleteCookie(key: string): boolean {
    if (!key.length) {
        return false;
    }
    document.cookie = key + '=' + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';

    return true;
}
