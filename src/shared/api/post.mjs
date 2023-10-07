import {API} from "../constants/api.mjs";

export const post = {
    feed: async () => {
        return await Ajax.get({
            url: API.POST_LIST,
            params: {
                count: 20
            }
        });
    }
}
