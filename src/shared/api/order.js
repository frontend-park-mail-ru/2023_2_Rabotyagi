import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Order = {
    create: async (product) => {
        return await ajax.post({
            url: API.ORDER.ADD,
            body: JSON.stringify(product),
            credentials: 'include',
        });
    },
    getCart: async () => {
        return await ajax.get({
            url: API.ORDER.GET_BASKET,
            credentials: 'include',
        });
    },
    deleteOrder: async(orderId) => {
        return await ajax.delete({
            url: API.ORDER.BASE + orderId,
            credentials: 'include',
        });
    },
    buyAll: async() => {
        return await ajax.patch({
            url: API.ORDER.BUY_FULL_BASKET,
            credentials: 'include',
        });
    },
    updateCount: async({ id, count }) => {
        return await ajax.patch({
            url: API.ORDER.UPDATE_COUNT,
            body: JSON.stringify({
                id: id,
                count: count
            }),
            credentials: 'include'
        });
    },
    updateStatus: async({ id, status }) => {
        return await ajax.patch({
            url: API.ORDER.UPDATE_STATUS,
            body: JSON.stringify({
                id: id,
                status: status
            }),
            credentials: 'include'
        });
    }
};
