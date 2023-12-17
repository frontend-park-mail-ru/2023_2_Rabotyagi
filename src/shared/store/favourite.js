import { User } from '../api/user';
import { store } from './store';

export const favs = {
    init: async function() {
        if (store.user.isAuth()) {
            this.list = [];
            const res = await User.getFavs();

            res.body?.forEach((elem) => this.list = [...this.list, elem.id]);
        }
    },

    getById: function(id) {
        if (this.list) {
            return this.list.find((value) => value === id);
        }

        return undefined;
    },

    refresh: async function() {
        this.list = [];
        const res = await User.getFavs();

        res.body?.forEach((elem) => this.list = [...this.list, elem.id]);
    },
    list: null,
};
