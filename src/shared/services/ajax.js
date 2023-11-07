/**
 * @file ajax.mjs
 * @module Ajax
 */

const { API_URL } = process.env;

/**
 * @constant
 * @summary Методы, поддерживаемые беком на данный момент
 */
const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
};

/**
 * @classdesc класс-обертка над fetch с нашими обработчиками
 * @name Ajax
 * @class
 */
class Ajax {
    port = '8080';

    ADRESS_BACKEND = API_URL + `:${this.port}/api/v1/`;

    /**
     * @async
     * @private
     * @method
     *
     * @param {string} method  Метод запроса
     * @param {string} url Адрес хоста
     * @param {string} params Параметры для GET запроса
     * @param {string} body Параметры для POST Запроса
     *
     * @default method 'GET'
     * @default url '/'
     * @default params null
     * @default body null
     *
     * @returns {Promise}
     */
    async #ajax({
        method = AJAX_METHODS.GET,
        url = '/',
        params = null,
        body = null,
        headers = {},
        credentials = null,
    } = {}) {
        url = this.ADRESS_BACKEND + url;
        if (params) {
            url += `?${new URLSearchParams(params)}`;
        }
        
        headers.Accept = 'application/json';
        headers[ 'Content-Type' ] = 'application/json';

        const config = {
            method,
            // mode: NODE_ENV === 'development' ? 'no-cors' : 'cors',
            mode: 'cors',
            headers,
        };

        if (body != null) {
            config.body = JSON.stringify(body);
        }

        if (credentials != null) {
        // if (credentials != null && NODE_ENV !== 'development') {
            config.credentials = credentials;
        }

        return await fetch(url, config);
    }

    /**
     * @method
     * @param {string} url Адрес хоста
     * @param {string} params Параметры для GET запроса
     * @returns {Promise}
     */
    get({ url, params, headers, credentials }) {
        return this.#ajax({
            method: AJAX_METHODS.GET,
            url,
            params,
            headers,
            credentials,
        });
    }

    /**
     * @method
     * @param {string} url Адрес хоста
     * @param {string} params Параметры для POST Запроса
     * @returns {Promise}
     */
    post({ url, body, headers, credentials }) {
        return this.#ajax({
            method: AJAX_METHODS.POST,
            url,
            body,
            headers,
            credentials,
        });
    }

    patch({ url, body, headers, credentials }) {
        return this.#ajax({
            method: AJAX_METHODS.PATCH,
            url,
            body,
            headers,
            credentials,
        });
    }
}

export default new Ajax();