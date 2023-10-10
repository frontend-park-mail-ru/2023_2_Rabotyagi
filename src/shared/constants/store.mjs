/**
 * @file store.mjs
 * @module Store
 */

/**
 * @constant {Dict} store Хранилище стейта всего приложения
 * @property {Dict} user Стейт, хранящий в себе редьюсеры для авторизации и разлогирования
 * @property {boolean} authorized Стейт авторизованности
 */
export const store = {
    user: {
        isAuth: () => {
            return this.user.accessToken ? true : false;
        }, /**
         * @summary Редьюсер для инициализирования стейта пользователя
         * @description Забирает из localStorage ключ email \
         * Выставляет необходимые флаги и заполняет стейт user.email
         * @borrows localStorage[email]
         * @function
         * @returns None
         */
        init: () => {
            const accessToken = localStorage.getItem('access_token');
            if (this.user.isAuth()) {
                store.user.accessToken = accessToken
            }
        }, /**
         * @summary Редьюсер для изменения стейта пользователя на авторизированного
         * @description Сетит в localStorage ключ email \
         * Выставляет необходимые флаги и заполняет стейт user.email
         * @param {string}email Почта юзера
         * @borrows localStorage[email]
         * @function
         * @returns None
         */
        login: (token) => {
            localStorage.setItem('access_token', token.access_token);
            store.user.accessToken = token.access_token
        }, /**
         * @summary Редьюсер для изменения стейта пользователя на авторизированного
         * @description Уздаляет из localStorage ключ email \
         * Выставляет необходимые флаги и очищает стейты user
         * @borrows localStorage[email]
         * @function
         * @returns None
         */
        logout: () => {
            store.user.username = null;
            store.user.email = null;
            store.user.accessToken = null;
            store.user.refreshToken = null;
            localStorage.removeItem('access_token');
        },
        username: null,
        email: null,
        accessToken: null,
        refreshToken: null
    }, /**
     * @default false
     */
}
