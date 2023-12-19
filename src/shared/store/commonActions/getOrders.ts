import { OrderApi } from '../../api/order';
import { UserApi } from '../../api/user';
import { ResponseStatusChecker } from '../../constants/response';

import { CartStoreAction } from '../cart';
import Dispatcher from '../../services/store/Dispatcher';

export async function getOrders() {
    try {
        const resp = await OrderApi.getCart();
        const body = resp.body;
        if (!ResponseStatusChecker.IsSuccessfulRequest(resp)) {
            throw body.error;
        }

        if (Array.isArray(body)) {
            if (body.length !== 0) {
                const respUser = await UserApi.getProfile(body[ 0 ].saler_id);
                const bodyUser = respUser.body;
                if (!ResponseStatusChecker.IsSuccessfulRequest(respUser)) {
                    throw bodyUser.error;
                }

                Dispatcher.dispatch({
                    name: CartStoreAction.FULL_CART,
                    payload: { goods: body || [], saler: bodyUser },
                });
            }
        }
    } catch(err) {
        console.error(err);
    }
}
