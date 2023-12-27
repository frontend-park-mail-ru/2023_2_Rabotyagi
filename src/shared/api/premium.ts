import { PremiumRoutes } from '../constants/api';
import { PremiumPeriods } from '../models/premium';
import { Ajax } from '../services/ajax';

export class PremiumApi {
    static async add(id: number, period: PremiumPeriods, signal?: AbortSignal) {
        return Ajax.getInstance().patch({
            url: PremiumRoutes.ADD,
            params: {
                'product_id': id,
                'period': period,
            },
            credentials: 'include',
            signal: signal,
        });
    }

    static async getStatus(id: number) {
        return Ajax.getInstance().get({
            url: PremiumRoutes.GET_STATUS,
            params: {
                'product_id': id,
            },
            credentials: 'include',
        });
    }
}
