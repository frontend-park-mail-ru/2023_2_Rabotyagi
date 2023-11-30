export enum ResponseStatus {
    /**
     * RESPONSE_SUCCESSFUL - используется когда ответ успешный
     */
    RESPONSE_SUCCESSFUL = 2000,

    /**
     * REDIRECT_AFTER_SUCCESSFUL - используется когда ответ успешный и нужно перенаправить на другой ресурс
     */
    REDIRECT_AFTER_SUCCESSFUL = 3003,

    /**
     * BAD_FORMAT_REQUEST - используется когда был отправлен неккоректный запрос на сервер.
     * Содержимое этой ошибки нужно только для разработчиков. Не показывать пользователям!
     */
    BAD_FORMAT_REQUEST = 4000,

    /**
     * BAD_CONTENT_REQUEST - используется когда был отправлен неккоректный запрос на сервер, но проблема в данных,
     * введенных клиентом. Эти ошибки нужно показывать пользователям.
     */
    BAD_CONTENT_REQUEST = 4400,

    /**
     * INTERNAL_SERVER - используется когда произошла ошибка на сервере.
     */
    INTERNAL_SERVER = 5000,
}

export enum ResponseMessage {
        /**
     * USER_MESSAGE - используется как сообщение для пользователя при ошибке разработчика
     */
    USER_MESSAGE = 'Произошла внутренняя ошибка',

    /**
     * SERVER_MESSAGE - используется как сообщение при ошибке на сервере
     */
    SERVER_MESSAGE = 'Ошибка на сервере',
}

interface ResponseBody {
    status: number,
    body: object
}

export class ResponseStatusChecker {
        /**
     * @summary определяет является ли запрос успешным
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    static IsSuccessfulRequest(body: ResponseBody) {
        return body.status === ResponseStatus.RESPONSE_SUCCESSFUL;
    }

    /**
     * @summary определяет является ли ответ rediret-ом
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    static IsRedirectResponse(body: ResponseBody) {
        return body.status === ResponseStatus.REDIRECT_AFTER_SUCCESSFUL;
    }

    /**
     * @summary определяет произошла ли ошибка из-за неккоретного формата запроса
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    static IsBadFormatRequest(body: ResponseBody) {
        return body?.status === ResponseStatus.BAD_FORMAT_REQUEST;
    }

    /**
     * @summary определяет является ли ошибка такой, которую можно показать пользователю
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    static IsUserError(body: ResponseBody) {
        return body?.status === ResponseStatus.BAD_CONTENT_REQUEST;
    }

    /**
     * @summary определяет произошла ли ошибка на сервере
     * @param {Object} body body ответа с status полем
     * @return {boolean}
     */
    static IsInternalServerError(body: ResponseBody) {
        return body?.status === ResponseStatus.INTERNAL_SERVER;
    }
}
