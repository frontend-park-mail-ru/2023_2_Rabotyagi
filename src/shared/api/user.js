import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const UserApi = {
    patchProfile: async (body) => {
        return await ajax.patch({
            url: API.USER.PROFILE,
            body: body,
            credentials: 'include',
        });
    },

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

    getSaler: async (saler_id) => {
        return await ajax.get({
            url: API.PROFILE.GET,
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