import { cookieParser, deleteCookie } from '../utils/cookie';
import jwtDecode from '../utils/jwt-decode';

import { ResponseStatus } from '../constants/response';

import { Store } from '../services/store/Store';
import { UserApi } from '../api/user';

interface StoreUserState {
    fields: object | null,
    accessToken: string | null,
}

const initState: StoreUserState = {
    fields: null,
    accessToken: null,
};

// async function fill(accessToken: string) {
//     const id = jwtDecode(accessToken).userID;

//     if (id) {
//         const res = await User.getProfile(id);
//         switch (res.status){
//             case ResponseStatus.RESPONSE_SUCCESSFUL:
//                 update(res.body);
//                 break;
//             case ResponseStatus.INTERNAL_SERVER:
//                 deleteCookie('access_token');
//                 break;
//         }
//     }
// }

(async function init() {
    const accessToken = cookieParser(document.cookie)?.access_token;
    if (!accessToken){
        return;
    }

    const id = jwtDecode(accessToken).userID;

    if (id) {
        const res = await UserApi.getProfile(id);
        switch (res.status){
            case ResponseStatus.RESPONSE_SUCCESSFUL:
                initState.fields = res.body;
                break;
            case ResponseStatus.INTERNAL_SERVER:
                deleteCookie('access_token');
                break;
        }
    }
})();

class StoreUser extends Store<StoreUserState> {
    public getFields(): object | null {
        return this.state.fields;
    }

    update(data: object): void {
        if (data) {
            this.state.fields = {
                ...this.state.fields,
                ...data,
            };
        }
    }

    clear() {
        this.state.fields = null;
        this.state.accessToken = null;
    }

    // async init() {
    //     const accessToken = cookieParser(document.cookie)?.access_token;
    //     if (!accessToken){
    //         return;
    //     }

    //     await this.fill(accessToken);
    // }

    // isAuth() {
    //     return this.state.fields !== null ? true : false;
    // }

    // async login(accessToken) {

    //     this.clear();

    //     if (accessToken === undefined) {
    //         return;
    //     }

    //     await this.fill(accessToken);
    // }

    // async fill(accessToken: string) {
    //     const id = jwtDecode(accessToken).userID;

    //     if (id) {
    //         const res = await User.getProfile(id);
    //         switch (res.status){
    //             case ResponseStatus.RESPONSE_SUCCESSFUL:
    //                 this.update(res.body);
    //                 break;
    //             case ResponseStatus.INTERNAL_SERVER:
    //                 deleteCookie('access_token');
    //                 break;
    //         }
    //     }
    // }

    public addActions(): void {
        this.addAction({
            name: 'STORE_USER_UPDATE',
            operation: (data) => this.update(data),
        });
    }
}

export default new StoreUser(initState);

// const user = {
//     clear: function() {
//         this.state.fields = null;
//         this.state.accessToken = null;
//     },
//     /**
//      * @summary Редьюсер для инициализирования стейта пользователя
//      * @description Забирает из localStorage ключ email \
//      * Выставляет необходимые флаги и заполняет стейт user.email
//      * @borrows localStorage[email]
//      * @function
//      * @returns None
//      */
//     init: async function() {
//         const accessToken = cookieParser(document.cookie)?.access_token;
//         if (!accessToken){
//             return;
//         }

//         await this.fill(accessToken);
//     },

//     isAuth: function() {
//         return this.state.fields !== null ? true : false;
//     },
//     /**
//      * @summary Редьюсер для изменения стейта пользователя на авторизированного
//      * @description Сетит в localStorage ключ email \
//      * Выставляет необходимые флаги и заполняет стейт user.email
//      * @param {string}email Почта юзера
//      * @borrows localStorage[email]
//      * @function
//      * @returns None
//      */
//     login: async function(accessToken) {

//         this.clear();

//         if (accessToken === undefined) {
//             return;
//         }

//         await this.fill(accessToken);
//     },

//     fill: async function(accessToken) {
//         const id = jwtDecode(accessToken).userID;

//         if (id) {
//             const res = await User.getProfile(id);
//             switch (res.status){
//                 case ResponseStatus.RESPONSE_SUCCESSFUL:
//                     this.update(res.body);
//                     break;
//                 case ResponseStatus.INTERNAL_SERVER:
//                     deleteCookie('access_token');
//                     break;
//             }
//         }
//     },

//     update: function(data) {
//         if (data) {
//             this.state.fields = {
//                 ...this.state.fields,
//                 ...data,
//             };
//         }
//     },
//     state: {
//         fields: null,
//     },
// };

