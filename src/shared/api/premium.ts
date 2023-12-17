import { PremiumRoutes } from '../constants/api';
import { Ajax } from '../services/ajax';

export class PremiumApi {
    static async add(id: number, period: PremiumPeriods) {
        return Ajax.getInstance().patch({
            url: PremiumRoutes.ADD,
            params: {
                'product_id': id,
                'period': period,
            },
            credentials: 'include',
        });
    }
}
