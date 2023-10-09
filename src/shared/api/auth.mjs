/**
 * @file auth.js
 * @module Api.Auth
 */

import {API} from "../constants/Api.mjs";

export const Auth = { /**
    * @summary Функция авторизации
    * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
    * @borrows store, Router
    * @param {string} email Почта юзера
    * @param {string} password Пароль юзера
    */
    signin: async (
        {email, password}
    ) => {
        return await Ajax.post({
            url: API.SIGNIN,
            body: JSON.stringify(
                {email: email, password: password}
            )
        });
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
        return await Ajax.post({
            url: API.SIGNUP,
            body: JSON.stringify(
                {email: email, password: password}
            )
        });
    }
}
