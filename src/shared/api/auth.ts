/**
 * @file auth.js
 * @module Api.Auth
 */

import ajax from '../services/ajax.js';
import { AuthRoutes } from '../constants/api.js';

export class Auth {
    /**
     * @summary Функция авторизации
     * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
     * @borrows store, Router
     * @param {string} email Почта юзера
     * @param {string} password Пароль юзера
     */
    static async signin(email: string, pass: string) {
        return await ajax.get({
            url: AuthRoutes.SIGNIN,
            params: { 'email': email, 'password': pass },
            credentials: 'include',
        });
    }

    /**
     * @summary Функция регистрации
     * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
     * @borrows store, Router
     * @param {string} email Почта юзера
     * @param {string} password Пароль юзера
     */
    static async signup(email: string, pass: string) {
        return await ajax.post({
            url: AuthRoutes.SIGNUP,
            body: {
                email: email,
                password: pass,
            },
            credentials: 'include',
        });
    }
}
