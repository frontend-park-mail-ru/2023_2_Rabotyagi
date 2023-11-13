import ajax from '../services/ajax.js';
import { ORDER_API } from '../constants/order_api.js';

export const Order = {
    create: async (product) => {
        return await ajax.post({
            url: ORDER_API.ADD,
            body: product,
            credentials: 'include',
        });
    },
    getCart: async () => {
        return await ajax.get({
            url: ORDER_API.GET_BASKET,
            credentials: 'include',
        });
    },
    deleteOrder: async(orderId) => {
        return await ajax.delete({
            url: ORDER_API.DELETE,
            params: {
                id: orderId
            },
            credentials: 'include',
        });
    },
    buyAll: async() => {
        return await ajax.patch({
            url: ORDER_API.BUY_FULL_BASKET,
            credentials: 'include',
        });
    },
    updateCount: async({ id, count }) => {
        return await ajax.patch({
            url: ORDER_API.UPDATE_COUNT,
            body: {
                id: id,
                count: count
            },
            credentials: 'include'
        });
    },
    updateStatus: async({ id, status }) => {
        return await ajax.patch({
            url: ORDER_API.UPDATE_STATUS,
            body: {
                id: id,
                status: status
            },
            credentials: 'include'
        });
    }
};
