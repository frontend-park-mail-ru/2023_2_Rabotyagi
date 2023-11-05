import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Order = {
    create: async (product) => {
        return await ajax.post({
            url: API.ORDER.BASE,
            body: JSON.stringify({ product: product }),
            credentials: 'include',
        });
    },
    getCart: async () => {
        return await ajax.get({
            url: API.ORDER.GET_CART,
            credentials: 'include',
        });
    },
    deleteOrder: async(orderId) => {
        return await ajax.delete({
            url: API.ORDER.BASE + "/" + orderId,
            credentials: 'include',
        });
    }
};
