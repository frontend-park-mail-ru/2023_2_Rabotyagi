import ajax from '../services/ajax';
import { ProductRoutes } from '../constants/api';
import { ProductModel, ProductModelPut } from '../models/product';

export class Product {
    static async feed() {
        return await ajax.get({
            url: ProductRoutes.LIST,
            params: {
                'count': 20,
                'last_id': 0,
            },
        });
    }

    static async get(id: number) {
        return await ajax.get({
            url: ProductRoutes.GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async create(data: ProductModelPut) {
        return await ajax.post({
            url: ProductRoutes.POST,
            body: data,
            credentials: 'include',
        });
    }

    static async delete(id: number) {
        return await ajax.delete({
            url: ProductRoutes.DELETE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async patch(id: number, data: ProductModel) {
        return await ajax.patch({
            url: ProductRoutes.PATCH,
            params: {
                'id': id,
            },
            body: data,
            credentials: 'include',
        });
    }

    static async activate(id: number) {
        return await ajax.patch({
            url: ProductRoutes.ACTIVATE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async deactivate(id: number) {
        return await ajax.patch({
            url: ProductRoutes.DEACTIVATE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async put(id: number, data: ProductModelPut) {
        return await ajax.put({
            url: ProductRoutes.PUT,
            params: {
                'id': id,
            },
            body: data,
            credentials: 'include',
        });
    }

    static async search(searchString: string) {
        return await ajax.get({
            url: ProductRoutes.SEARCH,
            params: {
                'searched': searchString,
            },
            credentials: 'include',
        });
    }

    static async searchFeed(searchString: string) {
        return await ajax.get({
            url: ProductRoutes.SEARCH_FEED,
            params: {
                'count': 20,
                'offset': 0,
                'searched': searchString,
            },
            credentials: 'include',
        });
    }
}
