import { ContentType } from '../constants/contentType';

interface AjaxPropsType {
    method: string,
    url: string,
    params?: any,
    body?: any,
    headers?: any,
    credentials?: any,
    contentType?: string,
}

interface RequestPropsType {
    url: string,
    params?: any,
    body?: any,
    headers?: any,
    credentials?: any,
    contentType?: string
}

interface ContextType {
    [key: string]: any;
}

const { SCHEMA, API_URL } = process.env;

const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    PUT: 'PUT',
};

export class Ajax {
    public ADRESS_BACKEND: string;
    private static instance: Ajax;

    private constructor() {
        if (!SCHEMA || !API_URL) {
            throw new Error('SCHEMA or API_URL are undefined');
        }

            this.ADRESS_BACKEND = SCHEMA + API_URL + '/api/v1/';
    }

    public static getInstance(): Ajax {
        if (!Ajax.instance) {
            Ajax.instance = new Ajax();
        }

        return Ajax.instance;
    }

    async #ajax({
        method = AJAX_METHODS.GET,
        url = '/',
        params = null,
        body = null,
        headers = {},
        credentials = null,
        contentType = ContentType.applicationJson,
    }: AjaxPropsType) {
        url = this.ADRESS_BACKEND + url;
        if (params) {
            url += `?${new URLSearchParams(params)}`;
        }

        headers.Accept = ContentType.applicationJson;
        headers[ 'Content-Type' ] = contentType;

        const config: ContextType = {
            method,
            mode: 'cors',
            headers,
        };

        if (body != null) {
            switch (contentType){
                case ContentType.applicationJson:
                    config.body = JSON.stringify(body);
                    break;

                case ContentType.multipartFormData: {
                    const formData = new FormData();
                    if (Object.keys(body).length !== 0) {
                        Object.keys(body).forEach((key) => {
                            if (Array.isArray(body[ key ])){
                                body[ key ].forEach((file: any) => {
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

        return await (await fetch(url, config)).json();
    }

    get({ url, params, headers={}, credentials, contentType=ContentType.applicationJson }: RequestPropsType) {
        return this.#ajax({
            method: AJAX_METHODS.GET,
            url,
            params,
            headers,
            credentials,
            contentType,
        });
    }

    post({ url, body, headers={}, credentials, contentType=ContentType.applicationJson }: RequestPropsType) {
        return this.#ajax({
            method: AJAX_METHODS.POST,
            url,
            body,
            headers,
            contentType,
            credentials,
        });
    }

    delete({ url, params, headers, credentials, contentType=ContentType.applicationJson }: RequestPropsType) {
        return this.#ajax({
            method: AJAX_METHODS.DELETE,
            url,
            params,
            headers,
            credentials,
            contentType,
        });
    }

    patch({ url, params, body, headers, credentials, contentType=ContentType.applicationJson }: RequestPropsType) {
        return this.#ajax({
            method: AJAX_METHODS.PATCH,
            url,
            params,
            body,
            headers,
            credentials,
            contentType,
        });
    }

    put({ url, params, body, headers, credentials, contentType=ContentType.applicationJson }: RequestPropsType) {
        return this.#ajax({
            method: AJAX_METHODS.PUT,
            url,
            params,
            body,
            headers,
            credentials,
            contentType,
        });
    }
}
