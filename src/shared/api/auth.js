/**
 * @file auth.js
 * @module Api.Auth
 */

import { API } from '../constants/api.js';
import ajax from '../services/ajax.js';

export const Auth = {
    /**
     * @summary Функция авторизации
     * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
     * @borrows store, Router
     * @param {string} email Почта юзера
     * @param {string} password Пароль юзера
     */
    signin: async (email, pass) => {
        return await ajax.get({
            url: API.SIGNIN,
            params: { 'email': email, 'password': pass },
            credentials: 'include',
        });
    },
    /**
     * @summary Функция регистрации
     * @description Посылает запрос на бек и получает данные пользователя после чего записывает их в хранилище
     * @borrows store, Router
     * @param {string} email Почта юзера
     * @param {string} password Пароль юзера
     */
    signup: async (email, password) => {
        return await ajax.post({
            url: API.SIGNUP,
            body: { email: email, password: password },
            credentials: 'include',
        });
    },
};
