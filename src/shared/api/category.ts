import { CategoryRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class CategoryApi {
    static async getAll() {
        return await Ajax.getInstance().get({
            url: CategoryRoutes.GET,
        });
    }
}
