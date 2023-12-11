import ajax from '../services/ajax';
import { CITY_API } from '../constants/api';

export const CityApi = {
    getAll: async() => {
        return await ajax.get({
            url: CITY_API.GET,
        });
    },
};