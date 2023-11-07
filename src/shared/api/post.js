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
    getPost: async (postId) => {
        return await ajax.get({
            url: API.PRODUCT.GET + postId,
            credentials: 'include',
        });
    },
};
