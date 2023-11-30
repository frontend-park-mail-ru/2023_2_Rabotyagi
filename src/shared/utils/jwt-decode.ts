export interface userCookie {
    userID: number
    [key: string]: any
}

/**
 * @summary раскодирует с помощью base64 payload токена
 * @param {String} token сырой jwt токен
 * @throws {SyntaxError} если payload токена не получилось распарсить в json
 * @return {Object} объект который распарсился с jwt payload токена
 */
export default function jwtDecode(token: string): userCookie {
    const idxStart = token.indexOf('.');
    const idxEnd = token.lastIndexOf('.');
    const payload = token.slice(idxStart + 1, idxEnd);
    const decoded = decodeURIComponent(escape(window.atob(payload)));
    const parsed = JSON.parse(decoded);

    return parsed;
}
