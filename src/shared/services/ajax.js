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
    class Ajax { /**
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
            body = null
        } = {}) {
            if (params) {
                url += '?' + new URLSearchParams(params)
            }

            try {
                let response = await fetch(url, {
                    method: method,
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                })

                if (response.ok) {
                    let json = await response.json();

                    return json
                }
            } catch (err) { /** some code */
                return err;
            }
        }

        /**
         * @method
         * @param {string} url Адрес хоста
         * @param {string} params Параметры для GET запроса
         * @returns {Promise}
         */
        async get({url, params}) {
            return await this.#ajax({method: AJAX_METHODS.GET, url, params});
        }

        /**
         * @method
         * @param {string} url Адрес хоста
         * @param {string} params Параметры для POST Запроса
         * @returns {Promise}
         */
        async post({url, body}) {
            return await this.#ajax({method: AJAX_METHODS.POST, url, body});
        }
    }

    window.Ajax = new Ajax();
})();
