import UserStore from './UserStore';

export const Store = {

    init: async function() {
        this.user.init();
    },

    user: UserStore,
};
