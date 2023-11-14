import ajax from '../services/ajax.js';
import { USER_API } from '../constants/user_api.js';

export const User = {
    patchProfile: async (body) => {
        return await ajax.patch({
            url: USER_API.PROFILE.PATCH,
            body: body,
            credentials: 'include',
        });
    },

    getProfile: async (id) => {
        return await ajax.get({
            url: USER_API.PROFILE.GET,
            params: {
                id: id
            },
            credentials: 'include'
        });
    },

    getProducts: async () => {
        return await ajax.get({
            url: USER_API.PRODUCTS.SAME,
            params: {
                count: 20,
                last_id: 0
            },
            credentials: 'include'
        });
    },

    getProductsOfAnotherSaler: async (salerID) => {
        return await ajax.get({
            url: USER_API.PRODUCTS.ANOTHER,
            params: {
                count: 20,
                last_id: 0,
                saler_id: salerID,
            },
            credentials: 'include'
        })
    },

    getOrders: async () => {
        return await ajax.get({
            url: USER_API.ORDERS,
            credentials: 'include'
        });
    },

    getSaler: async (saler_id) => {
        return await ajax.get({
            url: USER_API.PROFILE.GET,
            params: {
                id: saler_id
            },
            credentials: 'include'
        })
    },

    getFavs: async () => {
        return await ajax.get({
            url: USER_API.FAVS,
            credentials: 'include'
        });
    },

    addToFav: async (id) => {
        return await ajax.get({
            url: USER_API.ADD_TO_FAV,
            credentials: 'include',
            params: {
                id: id
            }
        });
    }
};