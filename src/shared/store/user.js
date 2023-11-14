import { User } from '../api/user.js';
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
    init: async function() {
        const userID = jwtDecode(
            cookieParser(document.cookie).access_token
        ).userID;
        
        if (userID) {
            const res = await User.getProfile(userID);
            if (res.status === 200) {
                this.update(res.body);
            }
        }
    },
    isAuth: function() {
        return Boolean(this.state.fields)
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
        fields: null,
    },
};

export default user;