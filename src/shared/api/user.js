import ajax from '../services/ajax.js';
import { USER_API } from '../constants/api.js';

export const User = {
    patchProfile: async(body) => {
        return await ajax.patch({
            url: USER_API.PROFILE.PATCH,
            body: body,
            credentials: 'include',
        });
    },

    getProfile: async(id) => {
        return await ajax.get({
            url: USER_API.PROFILE.GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    },

    getProducts: async() => {
        return await ajax.get({
            url: USER_API.PRODUCTS.SAME,
            params: {
                'count': 20,
                'last_id': 0,
            },
            credentials: 'include',
        });
    },

    getProductsOfAnotherSaler: async(salerID) => {
        return await ajax.get({
            url: USER_API.PRODUCTS.ANOTHER,
            params: {
                'count': 20,
                'last_id': 0,
                'saler_id': salerID,
            },
            credentials: 'include',
        });
    },

    getOrders: async() => {
        return await ajax.get({
            url: USER_API.ORDERS,
            credentials: 'include',
        });
    },

    getSaler: async(salerId) => {
        return await ajax.get({
            url: USER_API.PROFILE.GET,
            params: {
                'id': salerId,
            },
            credentials: 'include',
        });
    },

    getFavs: async() => {
        return await ajax.get({
            url: USER_API.PROFILE.FAVS,
            credentials: 'include',
        });
    },

    addToFav: async(id) => {
        return await ajax.post({
            url: USER_API.ADD_TO_FAV,
            credentials: 'include',
            body: {
                'product_id': id,
            },
        });
    },

    removeFromFav: async(id) => {
        return await ajax.delete({
            url: USER_API.REMOVE_FROM_FAV,
            credentials: 'include',
            params: {
                'product_id': id,
            },
        });
    },
};
