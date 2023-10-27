/**
 * @summary раскодирует с помощью base64 payload токена
 * @param {String} token сырой jwt токен
 * @throws {SyntaxError} если payload токена не получилось распарсить в json
 * @return {Object} объект который распарсился с jwt payload токена
 */
export default function jwtDecode(token) {
    const idxStart = token.indexOf('.');
    const idxEnd = token.lastIndexOf('.');
    let payload = token.slice(idxStart + 1, idxEnd);
    payload = decodeURIComponent(escape(window.atob(payload)));
    payload = JSON.parse(payload);

    return payload;
}
