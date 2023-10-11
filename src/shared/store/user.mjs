import { cookieParser } from '../utils/cookie.mjs';

export const user = {
    clear: () => {
        user.state.username = null;
        user.state.email = null;
        user.state.accessToken = null;
        user.state.refreshToken = null;
        user.state.id = null;
    },
    /**
     * @summary Редьюсер для инициализирования стейта пользователя
     * @description Забирает из localStorage ключ email \
     * Выставляет необходимые флаги и заполняет стейт user.email
     * @borrows localStorage[email]
     * @function
     * @returns None
     */
    init: () => {
        const accessToken = cookieParser(document.cookie).access_token;
        if (accessToken) {
            user.state.accessToken = accessToken;
        }
    },
    isAuth: () => Boolean(user.state.accessToken),
    /**
     * @summary Редьюсер для изменения стейта пользователя на авторизированного
     * @description Сетит в localStorage ключ email \
     * Выставляет необходимые флаги и заполняет стейт user.email
     * @param {string}email Почта юзера
     * @borrows localStorage[email]
     * @function
     * @returns None
     */
    login: (token) => {
        user.state.accessToken = token.access_token;
        const decoded = jwt_decode(token.access_token);
        user.state.email = decoded.email;
        user.state.username = decoded.username;
        user.state.id = decoded.userID;
    },
    state: {
        username: null,
        email: null,
        id: null,
        accessToken: null,
        refreshToken: null,
    },
};
