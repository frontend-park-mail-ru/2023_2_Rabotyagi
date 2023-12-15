import { OrderRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class Order {
    static async create(product: any) {
        return await Ajax.getInstance().post({
            url: OrderRoutes.ADD,
            body: product,
            credentials: 'include',
        });
    }

    static async getCart() {
        return await Ajax.getInstance().get({
            url: OrderRoutes.GET_BASKET,
            credentials: 'include',
        });
    }

    static async deleteOrder(orderId: number) {
        return await Ajax.getInstance().delete({
            url: OrderRoutes.DELETE,
            params: {
                id: orderId,
            },
            credentials: 'include',
        });
    }

    static async buyAll() {
        return await Ajax.getInstance().patch({
            url: OrderRoutes.BUY_FULL_BASKET,
            credentials: 'include',
        });
    }

    static async updateCount({ id, count }: {id: number, count: number}) {
        return await Ajax.getInstance().patch({
            url: OrderRoutes.UPDATE_COUNT,
            body: {
                id: id,
                count: count,
            },
            credentials: 'include',
        });
    }

    static async updateStatus({ id, status }: {id: number, status: number}) {
        return await Ajax.getInstance().patch({
            url: OrderRoutes.UPDATE_STATUS,
            body: {
                id: id,
                status: status,
            },
            credentials: 'include',
        });
    }
}
