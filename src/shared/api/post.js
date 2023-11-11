import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Post = {
    feed: async () => {
        return await ajax.get({
            url: API.PRODUCT.LIST,
            params: {
                count: 20,
                last_id: 0
            },
        });
    },

    get: async (id) => {
        return await ajax.get({
            url: API.PRODUCT.GET,
            params: {
                id: id
            },
            // credentials: 'include'
        });
    },

    create: async (data) => {
        return await ajax.post({
            url: API.PRODUCT.POST,
            body: data
        });
    },

    delete: async (id) => {
        return await ajax.delete({
            url: API.PRODUCT.DELETE,
            params: {
                id: id
            },
            credentials: 'include'
        })
    },

    patch: async (id, data) => {
        return await ajax.patch({
            url: API.PRODUCT.PATCH,
            params: {
                id: id
            },
            body: data,
            // credentials: 'include'
        })
    },

    put: async (id, data) => {
        return await ajax.put({
            url: API.PRODUCT.PUT,
            params: {
                id: id
            },
            body: data,
            credentials: 'include'
        })
    },

};
