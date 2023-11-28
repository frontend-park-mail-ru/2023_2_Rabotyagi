class Statuses {
    /**
     * STATUS_RESPONSE_SUCCESSFUL - используется когда ответ успешный
     * @type {number}
     */
    STATUS_RESPONSE_SUCCESSFUL = 2000;

    /**
     * STATUS_REDIRECT_AFTER_SUCCESSFUL - используется когда ответ успешный и нужно перенаправить на другой ресурс
     * @type {number}
     */
    STATUS_REDIRECT_AFTER_SUCCESSFUL = 3003;

    /**
     * STATUS_BAD_FORMAT_REQUEST - используется когда был отправлен неккоректный запрос на сервер.
     * Содержимое этой ошибки нужно только для разработчиков. Не показывать пользователям!
     * @type {number}
     */
    STATUS_BAD_FORMAT_REQUEST = 4000;

    /**
     * STATUS_BAD_CONTENT_REQUEST - используется когда был отправлен неккоректный запрос на сервер, но проблема в данных,
     * введенных клиентом. Эти ошибки нужно показывать пользователям.
     * @type {number}
     */
    STATUS_BAD_CONTENT_REQUEST = 4400;

    /**
     * status_internal_server - используется когда произошла ошибка на сервере.
     * @type {number}
     */
    STATUS_INTERNAL_SERVER = 5000;

    /**
     * user_message - используется как сообщение для пользователя при ошибке разработчика
     * @type {string}
     */
    USER_MESSAGE = 'Произошла внутренняя ошибка';

    /**
     * server_message - используется как сообщение при ошибке на сервере
     * @type {string}
     */
    SERVER_MESSAGE = 'Ошибка на сервере';

    /**
     * @summary определяет является ли запрос успешным
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    IsSuccessfulRequest(body) {
        return body?.status === this.STATUS_RESPONSE_SUCCESSFUL;
    }

    /**
     * @summary определяет является ли ответ rediret-ом
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    IsRedirectResponse(body) {
        return body?.status === this.STATUS_REDIRECT_AFTER_SUCCESSFUL;
    }

    /**
     * @summary определяет произошла ли ошибка из-за неккоретного формата запроса
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    IsBadFormatRequest(body) {
        return body?.status === this.STATUS_BAD_FORMAT_REQUEST;
    }

    /**
     * @summary определяет является ли ошибка такой, которую можно показать пользователю
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    IsUserError(body) {
        return body?.status === STATUS_BAD_CONTENT_REQUEST;
    }

    /**
     * @summary определяет произошла ли ошибка на сервере
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    IsInternalServerError(body) {
        return body?.status === STATUS_INTERNAL_SERVER;
    }
};

export default new Statuses();
