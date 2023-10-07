import {API} from "../constants/api.mjs";

(function () {
    const POST_SERVICE = {
        feed: async () => {
            return await Ajax.get({
                url: API.POST_LIST,
                params: {
                    count: 20
                }
            });
        }
    }

    window.POST_SERVICE = POST_SERVICE;
})();
