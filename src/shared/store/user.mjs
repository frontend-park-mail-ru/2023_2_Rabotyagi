import {cookieParser} from "../utils/cookie.mjs";

export const user = {
    isAuth: () => Boolean(user.state.accessToken),
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
    fill: (
        {email, username, userID}
    ) => {
        user.state.email = email;
        user.state.username = username;
        user.state.id = userID;
    },
    /**
     * @summary Редьюсер для изменения стейта пользователя на авторизированного
     * @description Сетит в localStorage ключ email \
     * Выставляет необходимые флаги и заполняет стейт user.email
     * @param {string}email Почта юзера
     * @borrows localStorage[email]
     * @function
     * @returns None
     */
    setAccessToken: (token) => {
        user.state.accessToken = token.access_token;
        const decoded = jwt_decode(token.access_token);
        user.fill(decoded);
    },
    /**
    * @summary Редьюсер для изменения стейта пользователя на авторизированного
    * @description Уздаляет из localStorage ключ email \
    * Выставляет необходимые флаги и очищает стейты user
    * @borrows localStorage[email]
    * @function
    * @returns None
    */
    clear: () => {
        user.state.username = null;
        user.state.email = null;
        user.state.accessToken = null;
        user.state.refreshToken = null;
        user.state.id = null;
    },
    state: {
        username: null,
        email: null,
        id: null,
        accessToken: null,
        refreshToken: null
    }
}
