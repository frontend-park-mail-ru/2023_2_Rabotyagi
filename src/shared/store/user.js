import { User } from '../api/user.js';
import { cookieParser, deleteCookie } from '../utils/cookie.js';
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
        const access_token = cookieParser(document.cookie)?.access_token;
        if (!access_token){
            return;
        }
        
        this.fill(access_token);
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
    login: function({ access_token }) {
        this.clear();

        if (access_token === undefined) {
            return;
        }

        this.fill(access_token);
    },
    
    fill: async function(access_token) {
        const id = jwtDecode(access_token).userID;

        if (id) {
            const res = await User.getProfile(id);
            switch (res.status){
                case 200:
                    this.update(res.body);
                    break;
                case 222:
                    deleteCookie('access_token');
                    break;
            }
        }
    },

    update: function(data) {
        if (data) {
            if (data.avatar && typeof data.avatar !== 'string'){
            if (data.avatar.Valid) {
                data.avatar = data.avatar.String;
            }
            else {
                delete data.avatar;
            }
        }
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