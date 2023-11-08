import { cookieParser } from '../utils/cookie.js';
import jwtDecode from '../utils/jwt-decode.js';

const user = {
    clear: () => {
        user.state.fields = null;
        user.state.accessToken = null;
        user.state.refreshToken = null;
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
        const cookie = cookieParser(document.cookie);
        if (cookie) {
            user.login(cookie);
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
    login: ({ access_token }) => {
        user.state.accessToken = access_token;
        const decoded = jwtDecode(access_token);
        user.state.fields = structuredClone(decoded); 
    },
    state: {
        fields: null,
        accessToken: null,
        // refreshToken:    null,
    },
};

export default user;