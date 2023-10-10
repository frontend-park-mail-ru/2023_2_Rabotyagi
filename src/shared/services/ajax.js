/**
 * @file ajax.mjs
 * @module Ajax
 */

(function () { /**
     * @constant
     * @summary Методы, поддерживаемые беком на данный момент
     */
    const AJAX_METHODS = {
        GET: 'GET',
        POST: 'POST'
    }

    /**
     * @classdesc класс-обертка над fetch с нашими обработчиками
     * @name Ajax
     * @class
     */
    class Ajax {
        port = '8080';
        ADRESS_BACKEND = 'http://84.23.53.28' + ':' + this.port + '/api/v1/';

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
            headers = {}
        } = {}) {
            url = this.ADRESS_BACKEND + url;
            if (params) {
                url += '?' + new URLSearchParams(params)
            }

            headers['Content-Type'] = 'application/json';
            headers['Accept'] = 'application/json';
            // headers['Access-Control-Allow-Credentials'] = "true";

            let response = await fetch(url, {
                method: method,
                mode: 'cors',
                headers: headers,
                body: body,
                credentials: 'include'
            })
            console.log(response.headers.get('Set-Cookie'));
            return await response.json();
        }

        /**
         * @method
         * @param {string} url Адрес хоста
         * @param {string} params Параметры для GET запроса
         * @returns {Promise}
         */
        get({url, params, headers}) {
            return this.#ajax({method: AJAX_METHODS.GET, url, params, headers});
        }

        /**
         * @method
         * @param {string} url Адрес хоста
         * @param {string} params Параметры для POST Запроса
         * @returns {Promise}
         */
        post({url, body, headers}) {
            return this.#ajax({method: AJAX_METHODS.POST, url, body, headers});
        }
    }

    window.Ajax = new Ajax();
})();
