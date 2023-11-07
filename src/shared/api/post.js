import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Post = {
    feed: async () => {
        return await ajax.get({
            url: API.PRODUCT.LIST,
            // params: {
            //     count: 20,
            // },
        });
    },

    get: async (id) => {
        return await ajax.get({
            url: API.PRODUCT.GET,
            params: {
                id: id
            },
        });
    },

};
