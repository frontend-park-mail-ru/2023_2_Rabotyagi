import { cookieParser } from '../utils/cookie.js';
import jwtDecode from '../utils/jwt-decode.js';

const user = {
    clear: function() {
        this.state.fields = {};
        this.state.accessToken = null;
    },
    /**
     * @summary Редьюсер для инициализирования стейта пользователя
     * @description Забирает из localStorage ключ email \
     * Выставляет необходимые флаги и заполняет стейт user.email
     * @borrows localStorage[email]
     * @function
     * @returns None
     */
    init: function() {
        const cookie = cookieParser(document.cookie);
        if (cookie) {
            this.login(cookie);
        }
    },
    isAuth: function() {
        return Boolean(this.state.accessToken)
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
    login: function({ access_token }) {
        this.clear();
        if (access_token === undefined) {
            return;
        }
        
        this.state.accessToken = access_token;
        const decoded = jwtDecode(access_token);
        this.state.fields = { 
            ...this.state.fields, 
            ...decoded 
        }; 
    },
    update: function(data) {
        if (data) {
            this.state.fields = {
                ...this.state.fields,
                ...data
            }
        }
    },
    state: {
        fields: {},
        accessToken: null,
        // refreshToken:    null,
    },
};

export default user;