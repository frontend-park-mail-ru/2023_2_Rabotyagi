import ajax from '../services/ajax.js';
import { PRODUCT_API } from '../constants/api.js';

export const Product = {
    feed: async() => {
        return await ajax.get({
            url: PRODUCT_API.LIST,
            params: {
                'count': 20,
                'last_id': 0,
            },
        });
    },

    get: async(id) => {
        return await ajax.get({
            url: PRODUCT_API.GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    },

    create: async(data) => {
        return await ajax.post({
            url: PRODUCT_API.POST,
            body: data,
            credentials: 'include',
        });
    },

    delete: async(id) => {
        return await ajax.delete({
            url: PRODUCT_API.DELETE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    },

    patch: async(id, data) => {
        return await ajax.patch({
            url: PRODUCT_API.PATCH,
            params: {
                'id': id,
            },
            body: data,
            credentials: 'include',
        });
    },

    activate: async(id) => {
        return await ajax.patch({
            url: PRODUCT_API.ACTIVATE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    },

    deactivate: async(id) => {
        return await ajax.patch({
            url: PRODUCT_API.DEACTIVATE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    },

    put: async(id, data) => {
        return await ajax.put({
            url: PRODUCT_API.PUT,
            params: {
                'id': id,
            },
            body: data,
            credentials: 'include',
        });
    },

    search: async(searchString) => {
        return await ajax.get({
            url: PRODUCT_API.SEARCH,
            params: {
                'searched': searchString,
            },
            credentials: 'include',
        });
    },

    searchFeed: async(searchString) => {
        return await ajax.get({
            url: PRODUCT_API.SEARCH_FEED,
            params: {
                'count': 20,
                'offset': 0,
                'searched': searchString,
            },
            credentials: 'include',
        });
    },
};
