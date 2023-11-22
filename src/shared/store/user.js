import { User } from '../api/user.js';
import { cookieParser, deleteCookie } from '../utils/cookie.js';
import jwtDecode from '../utils/jwt-decode.js';

const user = {
    clear: function() {
        this.state.fields = null;
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
        const accessToken = cookieParser(document.cookie)?.access_token;
        if (!accessToken){
            return;
        }

        await this.fill(accessToken);
    },

    isAuth: function() {
        return this.state.fields !== null ? true : false;
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
    login: async function(accessToken) {
        this.clear();

        if (accessToken === undefined) {
            return;
        }

        await this.fill(accessToken);
    },

    fill: async function(accessToken) {
        const id = jwtDecode(accessToken).userID;

        if (id) {
            const res = await User.getProfile(id);
            switch (res.status){
                case 200:
                    this.update(res.body);
                    break;
                case 500:
                    deleteCookie('access_token');
                    break;
            }
        }
    },

    update: function(data) {
        if (data) {
            this.state.fields = {
                ...this.state.fields,
                ...data,
            };
        }
    },
    state: {
        fields: null,
    },
};

export default user;
