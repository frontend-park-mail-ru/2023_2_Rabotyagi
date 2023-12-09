import ajax from '../services/ajax';
import { UserRoutes } from '../constants/api';
import { UserModelPatch } from '../models/user';

export class UserApi {
    static async patchProfile(body: UserModelPatch) {
        return await ajax.patch({
            url: UserRoutes.PROFILE_PATCH,
            body: body,
            credentials: 'include',
        });
    }

    static async getProfile(id: number) {
        return await ajax.get({
            url: UserRoutes.PROFILE_GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async getProducts() {
        return await ajax.get({
            url: UserRoutes.GET_LIST_OF_USER,
            params: {
                'count': 20,
                'last_id': 0,
            },
            credentials: 'include',
        });
    }

    static async getProductsOfAnotherSaler(salerID: number) {
        return await ajax.get({
            url: UserRoutes.GET_LIST_OF_SALER,
            params: {
                'count': 20,
                'last_id': 0,
                'saler_id': salerID,
            },
            credentials: 'include',
        });
    }

    static async getOrders() {
        return await ajax.get({
            url: UserRoutes.ORDERS_GET,
            credentials: 'include',
        });
    }

    static async getFavs() {
        return await ajax.get({
            url: UserRoutes.PROFILE_FAVS,
            credentials: 'include',
        });
    }

    static async addToFav(id: number) {
        return await ajax.post({
            url: UserRoutes.ADD_TO_FAV,
            credentials: 'include',
            body: {
                'product_id': id,
            },
        });
    }

    static async removeFromFav(id: number) {
        return await ajax.delete({
            url: UserRoutes.REMOVE_FROM_FAV,
            credentials: 'include',
            params: {
                'product_id': id,
            },
        });
    }
}
