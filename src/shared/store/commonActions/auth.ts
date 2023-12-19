import { UserApi } from '../../api/user';
import { getOrders } from './getOrders';
import { ResponseStatus } from '../../constants/response';

import { UserStoreAction } from '../user';
import { CartStoreAction } from '../cart';
import Dispatcher from '../../services/store/Dispatcher';

import jwtDecode from '../../utils/jwt-decode';
import { cookieParser } from '../../utils/cookie';

export async function fillUserByToken(accessToken: string) {
    const id = jwtDecode(accessToken).userID;

    if (id) {
        const res = await UserApi.getProfile(id);
        switch (res.status){
            case ResponseStatus.RESPONSE_SUCCESSFUL:
                Dispatcher.dispatch({ name: UserStoreAction.UPDATE, payload: res.body });
                break;
            case ResponseStatus.INTERNAL_SERVER:
                Dispatcher.dispatch({ name: UserStoreAction.LOGOUT });
                break;
        }
    }
}

export async function login() {
    const accessToken = cookieParser(document.cookie)?.access_token;

    if (!accessToken) {
        return;
    }
    await fillUserByToken(accessToken);
    await getOrders();
}

export async function logout() {
    Dispatcher.dispatch({ name: UserStoreAction.LOGOUT });
    Dispatcher.dispatch({ name: CartStoreAction.CLEAR_CART });
}

