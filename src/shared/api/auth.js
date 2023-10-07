/**
 * @file auth.js
 * @module Api.Auth
 */

import {API} from "../constants/api.mjs";
import {store} from "../constants/store.mjs";

(function () {

    const AUTH_SERVICE = { /**
     * @summary Функция авторизации
     * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
     * @borrows store, Router
     * @param {string} email Почта юзера
     * @param {string} password Пароль юзера
     */
        signin: async (
            {email, password}
        ) => {
            await Ajax.post({
                url: API.SIGNIN,
                body: JSON.stringify(
                    {email: email, password: password}
                )
            }).then(data => {
                if (data.status == 200) {
                    store.user.login(email);
                    Router.navigateTo('/');
                } else {
                    alert(data.body.error);
                }
            })
        },
        /**
         * @summary Функция регистрации
         * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
         * @borrows store, Router
         * @param {string} email Почта юзера
         * @param {string} password Пароль юзера
         */
        signup: async (
            {email, password}
        ) => {
            await Ajax.post({
                url: API.SIGNUP,
                body: JSON.stringify(
                    {email: email, password: password}
                )
            }).then(data => {
                if (data.status == 200) {
                    store.user.login(email);
                    Router.navigateTo('/');
                } else {
                    alert(data.body.error);
                }
            })
        }
    }
    window.AUTH_SERVICE = AUTH_SERVICE;
})()
