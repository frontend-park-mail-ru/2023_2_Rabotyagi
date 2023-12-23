import { ProductRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class ProductApi {
    static async feed(lastId = 0, count = 20) {
        return await Ajax.getInstance().get({
            url: ProductRoutes.LIST,
            params: {
                'count': count,
                'last_id': lastId,
            },
        });
    }

    static async get(id: number) {
        return await Ajax.getInstance().get({
            url: ProductRoutes.GET,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async create(data: ProductModelPut) {
        return await Ajax.getInstance().post({
            url: ProductRoutes.POST,
            body: data,
            credentials: 'include',
        });
    }

    static async delete(id: number) {
        return await Ajax.getInstance().delete({
            url: ProductRoutes.DELETE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async patch(id: number, data: ProductModel) {
        return await Ajax.getInstance().patch({
            url: ProductRoutes.PATCH,
            params: {
                'id': id,
            },
            body: data,
            credentials: 'include',
        });
    }

    static async changeActive(id: number, status: boolean) {
        return await Ajax.getInstance().patch({
            url: ProductRoutes.PATCH,
            params: {
                'id': id,
            },
            body: {
                'is_active': status,
            },
            credentials: 'include',
        });
    }

    static async activate(id: number) {
        return await Ajax.getInstance().patch({
            url: ProductRoutes.ACTIVATE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async deactivate(id: number) {
        return await Ajax.getInstance().patch({
            url: ProductRoutes.DEACTIVATE,
            params: {
                'id': id,
            },
            credentials: 'include',
        });
    }

    static async put(id: number, data: ProductModelPut) {
        return await Ajax.getInstance().put({
            url: ProductRoutes.PUT,
            params: {
                'id': id,
            },
            body: data,
            credentials: 'include',
        });
    }

    static async search(searchString: string) {
        return await Ajax.getInstance().get({
            url: ProductRoutes.SEARCH,
            params: {
                'searched': searchString,
            },
            credentials: 'include',
        });
    }

    static async searchFeed(searchString: string) {
        return await Ajax.getInstance().get({
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
