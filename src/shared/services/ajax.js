/**
 * @file ajax.mjs
 * @module Ajax
 */

import { applicationJson, multipartFormData } from '../constants/contentType';

const { SCHEMA, API_URL, NODE_ENV } = process.env;

/**
 * @constant
 * @summary Методы, поддерживаемые беком на данный момент
 */
const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT',
};

/**
 * @classdesc класс-обертка над fetch с нашими обработчиками
 * @name Ajax
 * @class
 */
class Ajax {
    constructor() {
        if (NODE_ENV === 'production') {
            this.ADRESS_BACKEND = SCHEMA + API_URL + '/api/v1/';
        }
        else {
            this.ADRESS_BACKEND = SCHEMA + API_URL + ':8080/api/v1/';
        }
    }
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
        contentType = applicationJson,
    } = {}) {
        headers.Accept = applicationJson;
        headers[ 'Content-Type' ] = contentType;

        const config = {
            method,
            mode: 'cors',
            headers,
        };

        if (body != null) {
            switch (contentType){
                case applicationJson:
                    url = this.ADRESS_BACKEND + url;
                    config.body = JSON.stringify(body);
                    break;

                case multipartFormData: {
                    url = this.ADRESS_UPLOAD + url;
                    const formData = new FormData();
                    if (Object.keys(body).length !== 0) {
                        Object.keys(body).forEach((key) => {
                            if (Array.isArray(body[ key ])){
                                body[ key ].forEach((file) => {
                                    formData.append(`${key}`, file);
                                });
                            }
                            else {
                                formData.append(key, body[ key ]);
                            }
                        });
                        config.body = formData;
                        delete config.headers[ 'Content-Type' ];
                    }
                }
            }
        }

        if (credentials != null) {
            config.credentials = credentials;
        }

        if (params) {
            url += `?${new URLSearchParams(params)}`;
        }

        return await (await fetch(url, config)).json();
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
    post({ url, body, headers, credentials, contentType }) {
        return this.#ajax({
            method: AJAX_METHODS.POST,
            url,
            body,
            headers,
            contentType,
            credentials,
        });
    }

    delete({ url, params, headers, credentials }) {
        return this.#ajax({
            method: AJAX_METHODS.DELETE,
            url,
            params,
            headers,
            credentials,
        });
    }

    patch({ url, params, body, headers, credentials }) {
        return this.#ajax({
            method: AJAX_METHODS.PATCH,
            url,
            params,
            body,
            headers,
            credentials,
        });
    }

    put({ url, params, body, headers, credentials }) {
        return this.#ajax({
            method: AJAX_METHODS.PUT,
            url,
            params,
            body,
            headers,
            credentials,
        });
    }
}

export default new Ajax();
