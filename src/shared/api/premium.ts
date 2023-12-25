import { PremiumRoutes } from '../constants/api';
import { PremiumPeriods } from '../models/premium';
import { Ajax } from '../services/ajax';

export class PremiumApi {
    static async add(id: number, period: PremiumPeriods) {
        console.log(id, period);

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
