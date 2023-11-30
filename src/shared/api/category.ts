import ajax from '../services/ajax';
import { CategoryRoutes } from '../constants/api';

export class CategoryApi {
    static async getAll() {
        return await ajax.get({
            url: CategoryRoutes.GET,
        });
    }
}
