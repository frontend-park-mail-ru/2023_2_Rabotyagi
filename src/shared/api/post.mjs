import {API} from "../constants/Api.mjs";

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
