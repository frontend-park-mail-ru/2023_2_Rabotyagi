import UserStore from './user';

export const Store = {

    init: async function () {
        this.user.init();
    },

    user: UserStore
};