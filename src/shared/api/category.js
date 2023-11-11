import { API } from "../constants/api";
import ajax from "../services/ajax"

export const CategoryApi = {
    getAll: async () => {
        return await ajax.get({
            url: API.CATEGORY.GET,
        });
    }
}