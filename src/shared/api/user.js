import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const UserApi = {
    patchProfile: async (body) => {
        return await ajax.patch({
            url: API.USER.PROFILE.PATCH,
            body: body,
            credentials: 'include',
        });
    },

    getProfile: async (id) => {
        if (id === undefined) {
            // throw new Error('getProfile, id=undefined');
            return undefined;
        }
        return await ajax.get({
            url: API.USER.PROFILE.GET,
            params: {
                id: id
            },
            credentials: 'include'
        });
    },

    getProducts: async () => {
        return await ajax.get({
            url: API.USER.PRODUCTS.SAME,
            params: {
                count: 20,
                last_id: 0
            },
            credentials: 'include'
        });
    },

    getProductsOfAnotherSaler: async (salerID) => {
        return await ajax.get({
            url: API.USER.PRODUCTS.ANOTHER,
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
            url: API.USER.ORDERS,
            credentials: 'include'
        });
    },

    getSaler: async (saler_id) => {
        return await ajax.get({
            url: API.USER.PROFILE.GET,
            params: {
                id: saler_id
            },
            credentials: 'include'
        })
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