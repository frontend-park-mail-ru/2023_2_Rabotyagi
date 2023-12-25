import { UserRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class UserApi {
    static async patchProfile(body: UserModelPatch) {
        return await Ajax.getInstance().patch({
            url: UserRoutes.PROFILE_PATCH,
            body: body,
            credentials: 'include',
        });
    }

    static async getProfile(id: number) {
        return await Ajax.getInstance().get({
            url: UserRoutes.PROFILE_GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async getProducts() {
        return await Ajax.getInstance().get({
            url: UserRoutes.GET_LIST_OF_USER,
            params: {
                'count': 20,
                'last_id': 0,
            },
            credentials: 'include',
        });
    }

    static async getProductsOfAnotherSaler(salerID: number) {
        return await Ajax.getInstance().get({
            url: UserRoutes.GET_LIST_OF_SALER,
            params: {
                'count': 20,
                'offset': 0,
                'saler_id': salerID,
            },
            credentials: 'include',
        });
    }

    static async getOrders() {
        return await Ajax.getInstance().get({
            url: UserRoutes.ORDERS_GET,
            credentials: 'include',
        });
    }

    static async getFavs() {
        return await Ajax.getInstance().get({
            url: UserRoutes.PROFILE_FAVS,
            credentials: 'include',
        });
    }

    static async addToFav(id: number) {
        return await Ajax.getInstance().post({
            url: UserRoutes.ADD_TO_FAV,
            credentials: 'include',
            body: {
                'product_id': id,
            },
        });
    }

    static async removeFromFav(id: number) {
        return await Ajax.getInstance().delete({
            url: UserRoutes.REMOVE_FROM_FAV,
            credentials: 'include',
            params: {
                'product_id': id,
            },
        });
    }
}
