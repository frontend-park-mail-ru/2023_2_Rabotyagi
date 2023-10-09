import {API} from "../constants/api.mjs";

export const Post = {
    feed: async () => {
        return await Ajax.get({
            url: API.POST_LIST,
            params: {
                count: 20
            }
        });
    }
}
