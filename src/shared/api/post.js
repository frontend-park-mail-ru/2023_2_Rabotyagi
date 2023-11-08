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
            url: API.PRODUCT.GET(id),
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
            url: API.PRODUCT.DELETE(id),
            credentials: 'include'
        })
    },

};
