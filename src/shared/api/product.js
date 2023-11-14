import ajax from '../services/ajax.js';
import { PRODUCT_API } from '../constants/product_api.js';

export const Product = {
    feed: async () => {
        return await ajax.get({
            url: PRODUCT_API.LIST,
            params: {
                count: 20,
                last_id: 0
            },
        });
    },

    get: async (id) => {
        return await ajax.get({
            url: PRODUCT_API.GET,
            params: {
                id: id
            },
            // credentials: 'include'
        });
    },

    create: async (data) => {
        return await ajax.post({
            url: PRODUCT_API.POST,
            body: data
        });
    },

    delete: async (id) => {
        return await ajax.delete({
            url: PRODUCT_API.DELETE,
            params: {
                id: id
            },
            credentials: 'include'
        })
    },

    patch: async (id, data) => {
        return await ajax.patch({
            url: PRODUCT_API.PATCH,
            params: {
                id: id
            },
            body: data,
            // credentials: 'include'
        })
    },

    put: async (id, data) => {
        return await ajax.put({
            url: PRODUCT_API.PUT,
            params: {
                id: id
            },
            body: data,
            credentials: 'include'
        })
    },

};