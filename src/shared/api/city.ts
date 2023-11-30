import ajax from '../services/ajax';
import { CityRoutes } from '../constants/api';

export class CityApi {
    static async getAll() {
        return await ajax.get({
            url: CityRoutes.GET,
        });
    }
}
