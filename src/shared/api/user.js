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
    }
};