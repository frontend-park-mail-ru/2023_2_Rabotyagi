import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const UserApi = {
    getProfile: async () => {
        return await ajax.get({
            url: API.USER.PROFILE,
            credentials: 'include'
        });
    },

    getProducts: async () => {
        return await ajax.get({
            url: API.USER.PRODUCTS,
            credentials: 'include'
        });
    },

    getOrders: async () => {
        return await ajax.get({
            url: API.USER.ORDERS,
            credentials: 'include'
        });
    },

    getFavs: async () => {
        return await ajax.get({
            url: API.USER.FAVS,
            credentials: 'include'
        });
    },

    addToFav: async (id) => {
        return await ajax.get({
            url: API.USER.ADD_TO_FAV,
            credentials: 'include',
            params: {
                id: id
            }
        });
    }
};