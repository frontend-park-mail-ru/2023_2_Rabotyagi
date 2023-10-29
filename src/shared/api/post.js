import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Post = {
    feed: async () => {
        return await ajax.get({
            url: API.POST.LIST,
            // params: {
            //     count: 20,
            // },
        });
    },
};
