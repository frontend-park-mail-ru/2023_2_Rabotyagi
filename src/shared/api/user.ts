import ajax from '../services/ajax/ajax.js';
import { UserRoutes } from '../constants/api.js';

export const User = {
    patchProfile: async(body: any) => {
        return await ajax.patch({
            url: UserRoutes.PROFILE_PATCH,
            body: body,
            credentials: 'include',
        });
    },

    getProfile: async(id: number) => {
        return await ajax.get({
            url: UserRoutes.PROFILE_GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    },

    getProducts: async() => {
        return await ajax.get({
            url: UserRoutes.GET_LIST_OF_USER,
            params: {
                'count': 20,
                'last_id': 0,
            },
            credentials: 'include',
        });
    },

    getProductsOfAnotherSaler: async(salerID: number) => {
        return await ajax.get({
            url: UserRoutes.GET_LIST_OF_SALER,
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
            url: UserRoutes.ORDERS_GET,
            credentials: 'include',
        });
    },

    getFavs: async() => {
        return await ajax.get({
            url: UserRoutes.PROFILE_FAVS,
            credentials: 'include',
        });
    },

    addToFav: async(id: number) => {
        return await ajax.post({
            url: UserRoutes.ADD_TO_FAV,
            credentials: 'include',
            body: {
                'product_id': id,
            },
        });
    },

    removeFromFav: async(id: number) => {
        return await ajax.delete({
            url: UserRoutes.REMOVE_FROM_FAV,
            credentials: 'include',
            params: {
                'product_id': id,
            },
        });
    },
};
