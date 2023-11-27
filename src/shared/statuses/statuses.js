/**
 * STATUS_RESPONSE_SUCCESSFUL - используется когда ответ успешный
 * @constant
 * @type {number}
 */
export const STATUS_RESPONSE_SUCCESSFUL = 2000;

/**
 * @summary определяет является ли запрос успешным
 * @param {Object} body body ответа с status полем
 * @return {boolean}
 */
export function IsSuccessfulRequest(body) {
    return body?.status === STATUS_RESPONSE_SUCCESSFUL;
}

/**
 * STATUS_REDIRECT_AFTER_SUCCESSFUL - используется когда ответ успешный и нужно перенаправить на другой ресурс
 * @constant
 * @type {number}
 */
export const STATUS_REDIRECT_AFTER_SUCCESSFUL = 3003;

/**
 * @summary определяет является ли ответ rediret-ом
 * @param {Object} body body ответа с status полем
 * @return {boolean}
 */
export function IsRedirectResponse(body) {
    return body?.status === STATUS_REDIRECT_AFTER_SUCCESSFUL;
}

/**
 * STATUS_BAD_FORMAT_REQUEST - используется когда был отправлен неккоректный запрос на сервер.
 * Содержимое этой ошибки нужно только для разработчиков. Не показывать пользователям!
 * @constant
 * @type {number}
 */
export const STATUS_BAD_FORMAT_REQUEST = 4000;

/**
 * @summary определяет произошла ли ошибка из-за неккоретного формата запроса
 * @param {Object} body body ответа с status полем
 * @return {boolean}
 */
export function IsBadFormatRequest(body) {
    return body?.status === STATUS_BAD_FORMAT_REQUEST;
}

/**
 * STATUS_BAD_CONTENT_REQUEST - используется когда был отправлен неккоректный запрос на сервер, но проблема в данных,
 * введенных клиентом. Эти ошибки нужно показывать пользователям.
 * @constant
 * @type {number}
 */
export const STATUS_BAD_CONTENT_REQUEST = 4400;

/**
 * @summary определяет является ли ошибка такой, которую можно показать пользователю
 * @param {Object} body body ответа с status полем
 * @return {boolean}
 */
export function IsUserError(body) {
    return body?.status === STATUS_BAD_CONTENT_REQUEST;
}

/**
 * status_internal_server - используется когда произошла ошибка на сервере.
 * @constant
 * @type {number}
 */
export const STATUS_INTERNAL_SERVER = 5000;

/**
 * @summary определяет произошла ли ошибка на сервере
 * @param {Object} body body ответа с status полем
 * @return {boolean}
 */
export function IsInternalServerError(body) {
    return body?.status === STATUS_INTERNAL_SERVER;
}
