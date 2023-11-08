export const API = {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    PRODUCT: {
        LIST: 'product/get_list',
        GET: (id) => `product/get/${id}`,
        POST: 'product/add',
        DELETE: (id) => `product/delete/${id}`,
    },
    USER: {
        PRODUCTS: 'product/get_list_of_saler',
        PROFILE: {
            GET: (id) => `profile/get/${id}`,
            PUT: 'profile/update',
            PATCH: 'profile/update',
        },
        ORDERS: 'user/orders',
        FAVS: 'user/favourites',
        ADD_TO_FAV: 'user/add-to-fav',
    },
    ORDER: {
        ADD: 'order/add',
        BUY_FULL_BASKET: 'order/buy_full_basket',
        GET_BASKET: 'order/get_basket',
        UPDATE_COUNT: 'order/update_count',
        UPDATE_STATUS: 'order/update_status',
        DELETE: 'order/delete/'
    },
    PROFILE: {
        GET: 'profile/get/',
    },
};
