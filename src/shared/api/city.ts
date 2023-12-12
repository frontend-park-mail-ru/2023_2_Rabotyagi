import { CityRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class CityApi {
    static async getAll() {
        return await Ajax.getInstance().get({
            url: CityRoutes.GET,
        });
    }
}
