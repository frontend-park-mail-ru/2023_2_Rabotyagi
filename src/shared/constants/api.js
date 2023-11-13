export const API = {
    SIGNUP: 'signup',
    SIGNIN: 'signin',
    PRODUCT: {
        LIST: 'product/get_list',
        GET: 'product/get',
        POST: 'product/add',
        DELETE: 'product/delete',
        PATCH: 'product/update',
        PUT: 'product/update',
    },
    USER: {
        PRODUCTS: {
            SAME: 'product/get_list_of_saler',
            ANOTHER: 'product/get_list_of_another_saler'
        },
        PROFILE: {
            GET: 'profile/get',
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
        DELETE: 'order/delete'
    },
    CATEGORY: {
        GET: 'category/get_full'
    },
    FILES: {
        IMAGES: 'img/upload'
    }
};
