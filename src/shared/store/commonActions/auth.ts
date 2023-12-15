import Dispatcher from '../../services/store/Dispatcher';
import { ResponseStatus } from '../../constants/response';

import jwtDecode from '../../utils/jwt-decode';
import { cookieParser } from '../../utils/cookie';

import { UserApi } from '../../api/user';

export async function fillUserByToken(accessToken: string) {
    const id = jwtDecode(accessToken).userID;

    if (id) {
        const res = await UserApi.getProfile(id);
        switch (res.status){
            case ResponseStatus.RESPONSE_SUCCESSFUL:
                Dispatcher.dispatch({ name: 'USER_STORE_UPDATE', payload: res.body });
                break;
            case ResponseStatus.INTERNAL_SERVER:
                Dispatcher.dispatch({ name: 'USER_STORE_LOGOUT' });
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
}

export async function logout() {
    Dispatcher.dispatch({ name: 'USER_STORE_LOGOUT' });
}
