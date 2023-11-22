import ajax from '../services/ajax';
import { CATEGORY_API } from '../constants/category_api';

export const CategoryApi = {
    getAll: async() => {
        return await ajax.get({
            url: CATEGORY_API.GET,
        });
    },
};
