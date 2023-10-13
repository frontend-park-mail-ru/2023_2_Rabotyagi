/**
 * @file ajax.mjs
 * @module Ajax
 */

(function () {
    /**
     * @constant
     * @summary Методы, поддерживаемые беком на данный момент
     */
    const AJAX_METHODS = {
        GET: 'GET',
        POST: 'POST',
    };

    /**
     * @classdesc класс-обертка над fetch с нашими обработчиками
     * @name Ajax
     * @class
     */
    class Ajax {
        port = '3000';

        ADRESS_BACKEND = `http://localhost` + `:${this.port}/api/v1/`;

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
                mode: 'cors',
                headers,
            };

            if (body != null) {
                config.body = body;
            }

            if (credentials != null) {
                config.credentials = credentials;
            }

            const response = await fetch(url, config);
            return await response.json();
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
    }

    window.Ajax = new Ajax();
})();
