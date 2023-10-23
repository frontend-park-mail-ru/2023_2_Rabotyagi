import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Post = {
    feed: async () => {
        return await ajax.get({
            url: API.POST_LIST,
            // params: {
            //     count: 20,
            // },
        });
    },
};
